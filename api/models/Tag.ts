import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/db'

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
  }
)

export default Tag
