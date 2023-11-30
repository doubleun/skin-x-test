import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const DB_URI = process.env.DB_URI

if (!DB_URI) throw new Error('DB_URI is not found')

// Passing a connection URI
const sequelize = new Sequelize(DB_URI, {
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
})

export default sequelize
