import express from 'express'
import { createPost, searchPosts } from '../controllers/postControllers'
const router = express.Router()

router.route('/').post(createPost).get(searchPosts)

export default router
