import express from 'express'
import {
  createPost,
  getPostById,
  searchPosts,
} from '../controllers/postControllers'
import authorization from '../middleware/auth'
const router = express.Router()

router
  .route('/')
  .post(authorization, createPost)
  .get(authorization, searchPosts)
router.route('/detail').get(getPostById)

export default router
