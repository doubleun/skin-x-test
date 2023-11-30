import express, { Express } from 'express'
import dotenv from 'dotenv'
// import productRoutes from '../routes/productRoutes'
// import cashRoutes from '../routes/cashRoutes'
import sequelize from '../config/db'
import cors from 'cors'
import userRoutes from '../routes/userRoutes'

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
  sequelize.sync({ force: true }).then(() => {
    console.log('Drop and re-sync db.')
  })
}

const app: Express = express()

app.use(cors())

// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

app.get('/api/ping', (req, res) => res.status(200).send('pong'))

app.use('/api/user', userRoutes)
// app.use('/api/products', productRoutes)

const port = process.env.PORT || 3003
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
