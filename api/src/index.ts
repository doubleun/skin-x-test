import express, { Express } from 'express'
import dotenv from 'dotenv'
import sequelize from '../config/db'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import userRoutes from '../routes/userRoutes'
import Post from '../models/Post'
import Tag from '../models/Tag'
import postRoutes from '../routes/postRoutes'

dotenv.config()

const isProd = process.env.environment === 'production'

// connect sequelize
if (isProd) {
  sequelize
    .sync()
    .then(() => {
      console.log('Synced db.')
    })
    .catch((err) => {
      console.log('Failed to sync db: ' + err.message)
    })
} else {
  // in development use `force` true to drop existing tables and re-sync the database
  // sequelize.sync({ force: true }).then(() => {
  //   console.log('Drop and re-sync db.')
  // })
  sequelize.sync().then(() => {
    console.log('Sync db.')
  })
}

Post.belongsToMany(Tag, {
  through: 'Post_Tag',
  as: 'tags',
  foreignKey: 'post_id',
})

Tag.belongsToMany(Post, {
  through: 'Post_Tag',
  as: 'posts',
  foreignKey: 'tag_id',
})

const app: Express = express()

app.use(cors())

// parse http-only cookie for authorization (JWT)
app.use(cookieParser())

// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

app.get('/api/ping', (req, res) => res.status(200).send('pong'))

app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)

const port = process.env.PORT || 3003
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
