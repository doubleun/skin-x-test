import { Request, Response } from 'express'
import { Op, QueryTypes, Sequelize } from 'sequelize'

import Post, { SearchedPosts } from '../models/Post'
import PostTag from '../models/PostTag'
import Tag from '../models/Tag'
import {
  handlePagination,
  isValidSortBy,
  isValidSortDirection,
} from '../utils/post.util'

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
    const {
      search = '',
      sort = 'title',
      direction = 'ASC',
      page = 1,
    } = req.query

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

    const searchedPosts = (await Post.sequelize.query(
      `
      SELECT
        p.id,
        p.title,
        p.content,
        p."postedAt",
        p."postedBy",
        ARRAY_REMOVE( ARRAY_AGG(pt.tag_id), NULL ) AS tags,
        COUNT(p.id) OVER () AS total
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
        ${orderByQuery}
      ${handlePagination(Number(page))};
    `,
      {
        bind: { search_text: `%${search}%` },
        type: QueryTypes.SELECT,
      }
    )) as SearchedPosts[]

    return res.status(200).json({
      posts: searchedPosts,
      totalPage:
        searchedPosts?.length > 1 ? Math.ceil(searchedPosts[0].total / 10) : 1,
    })
  } catch (err) {
    console.error(err)
    return res.status(500).send('Something went wrong while searching posts')
  }
}

/**
 * GET - get post by id
 * @description get post detail using post id
 */
export const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.query
    const post = await Post.findOne({
      where: {
        id,
      },
      include: {
        model: Tag,
        as: 'tags',
        required: false,
      },
    })

    if (!post) {
      return res.status(200).json({})
    }

    // tags will return as array of object, so we'll clean it before sending back
    const postCleanTags = post.tags.map((tag) => {
      if (typeof tag !== 'string') {
        return tag.key
      }
      return tag
    })

    return res.status(200).json({ ...post.dataValues, tags: postCleanTags })
  } catch (err) {
    console.error(err)
    return res
      .status(500)
      .send('Something went wrong while getting post detail')
  }
}
