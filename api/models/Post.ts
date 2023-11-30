import { DataTypes, Deferrable, Model } from 'sequelize'
import sequelize from '../config/db'
import Tag from './Tag'

class Post extends Model {
  declare id: number
  declare title: string
  declare content: string
  declare postedAt: string
  declare postedBy: string
  declare tags: (typeof Tag)['primaryKeyAttribute'][]
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    postedBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // todo: check if tags table is needed (one to many), or should just put in as array of string
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      references: {
        // This is a reference to another model
        model: Tag,
        // This is the column name of the referenced model
        key: 'key',
      },
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
)

export default Post
