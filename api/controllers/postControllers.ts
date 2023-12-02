import { Request, Response } from 'express'
import { QueryTypes } from 'sequelize'

import Post from '../models/Post'

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
    const { search } = req.query ?? { search: '' }

    // if (!search) res.status(500).send('Missing search query')

    if (!Post.sequelize) {
      res.status(500).send('Something went wrong with the api server')
      return
    }

    // Check if the email exists
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
        p.title LIKE :search_text OR p.id IN (
          SELECT post_id
          FROM "Post_Tag"
          WHERE tag_id LIKE :search_text
        )
      GROUP BY
        p.id;
    `,
      { replacements: { search_text: `%${search}%` }, type: QueryTypes.SELECT }
    )

    return res.status(200).json(searchedPosts)
  } catch (err) {
    console.error(err)
    return res.status(500).send('Something went wrong while searching posts')
  }
}
