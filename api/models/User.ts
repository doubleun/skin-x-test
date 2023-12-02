import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/db'

class User extends Model {
  declare id: number
  declare username: string
  declare password: string
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    createdAt: false,
    updatedAt: false,
  }
)

export default User
