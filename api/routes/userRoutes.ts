import express from 'express'
import {
  refreshToken,
  registerUser,
  signInUser,
  signOutUser,
} from '../controllers/userControllers'
const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(signInUser)
router.route('/logout').get(signOutUser)
router.route('/refresh').post(refreshToken)

export default router
