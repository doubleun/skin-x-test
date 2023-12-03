import { DataTypes, Model } from 'sequelize'
import sequelize from '../../config/db'
import Post from './Post'

class Tag extends Model {
  declare key: string
}

Tag.init(
  {
    key: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: 'Tag',
    createdAt: false,
    updatedAt: false,
  }
)

export default Tag
