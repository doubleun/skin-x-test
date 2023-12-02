import { Request, Response } from 'express'
import { Op, QueryTypes, Sequelize } from 'sequelize'

import Post from '../models/Post'
import PostTag from '../models/PostTag'
import Tag from '../models/Tag'

/**
 * POST - create post
 * @description create new post
 */
export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, postedAt, postedBy, tags } = req.body

    if (!title || !content || !postedAt || !postedBy)
      res.status(500).send('Missing payload data')

    // Check if the email exists
    const createdPost = await Post.create({
      title,
      content,
      postedAt,
      postedBy,
    })

    if (Array.isArray(tags)) {
      createdPost.addTags(tags)
    }

    return res.status(200).send('Post created successful')
  } catch (err) {
    console.error(err)
    return res.status(500).send('Failed to create new post')
  }
}

/**
 * GET - search posts by keyword
 * @description get posts based on search keyword, if empty will get all posts
 */
export const searchPosts = async (req: Request, res: Response) => {
  try {
    const { search, sort, direction } = req.query ?? {
      search: '',
      sort: 'id',
      direction: 'ASC',
    }

    // if (!search) res.status(500).send('Missing search query')

    if (
      !Post.sequelize ||
      (direction as string) !== 'ASC' ||
      direction !== 'DESC'
    ) {
      res.status(500).send('Something went wrong with the api server')
      return
    }

    // const searchedPosts = await Post.findAll({
    //   attributes: ['id', 'title', 'content', 'postedAt', 'postedBy'],
    //   where: {
    //     id: ,
    //   },
    //   include: [
    //     {
    //       model: Tag,
    //       as: 'tags',
    //       required: false,
    //       attributes: [
    //         'key',
    //         // [Post.sequelize.fn('ARRAY_AGG', Post.sequelize.col('key')), 'tags'],
    //       ],
    //     },
    //   ],
    //   order: ['title'],
    //   group: [
    //     'Post.id',
    //     'tags.key',
    //     'tags->Post_Tag.post_id',
    //     'tags->Post_Tag.tag_id',
    //   ],
    // })

    const searchedPosts = await Post.sequelize.query(
      `
      SELECT
        p.id,
        p.title,
        p.content,
        p."postedAt",
        p."postedBy",
        ARRAY_REMOVE( ARRAY_AGG(pt.tag_id), NULL ) AS tags
      FROM
        public."Posts" p
      LEFT JOIN
        "Post_Tag" pt ON pt.post_id = p.id
      WHERE
        p.title LIKE $search_text OR p.id IN (
          SELECT post_id
          FROM "Post_Tag"
          WHERE tag_id LIKE $search_text
        )
      GROUP BY
        p.id
      ORDER BY
        ${Post.sequelize.literal(`p."${sort}" ${direction}`).val};
    `,
      {
        bind: { search_text: `%${search}%` },
        type: QueryTypes.SELECT,
      }
    )

    return res.status(200).json(searchedPosts)
  } catch (err) {
    console.error(err)
    return res.status(500).send('Something went wrong while searching posts')
  }
}
