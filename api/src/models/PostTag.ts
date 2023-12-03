import { DataTypes, Deferrable, Model } from 'sequelize'
import sequelize from '../../config/db'

class PostTag extends Model {
  declare post_id: number
  declare tag_id: number
}

PostTag.init(
  {
    post_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    tag_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: 'Post_Tag',
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
  }
)

export default PostTag
