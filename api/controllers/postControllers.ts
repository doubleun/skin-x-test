import { Request, Response } from 'express'
import { Op, QueryTypes, Sequelize } from 'sequelize'

import Post from '../models/Post'
import PostTag from '../models/PostTag'
import Tag from '../models/Tag'
import { isValidSortBy, isValidSortDirection } from '../utils/post.util'

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
    const { search = '', sort = 'title', direction = 'ASC' } = req.query

    if (!Post.sequelize) {
      res.status(500).send('Something went wrong with the api server')
      return
    }

    // protect sql injection, check if sortBy and direction is NOT valid
    if (
      !isValidSortBy(sort as string) ||
      !isValidSortDirection(direction as string)
    ) {
      res.status(500).send('Something is wrong with the request')
      return
    }

    // cleaned order by query
    const orderByQuery = Post.sequelize.literal(`p."${sort}" ${direction}`).val

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
        ${orderByQuery};
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
