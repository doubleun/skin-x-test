import express from 'express'
import {
  createPost,
  getPostById,
  searchPosts,
} from '../controllers/postControllers'
const router = express.Router()

router.route('/').post(createPost).get(searchPosts)
router.route('/detail').get(getPostById)

export default router
