import { DataTypes, Deferrable, Model } from 'sequelize'
import sequelize from '../config/db'
import Tag from './Tag'

class Post extends Model {
  declare addTags: any
  declare id: number
  declare title: string
  declare content: string
  declare postedAt: string
  declare postedBy: string
  declare tags: Record<any, any>[] | string[]
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    postedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    postedBy: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Post',
    createdAt: false,
    updatedAt: false,
  }
)

export default Post

export interface SearchedPosts {
  id: number
  title: string
  content: string
  postedAt: string
  postedBy: string
  total: number
}
