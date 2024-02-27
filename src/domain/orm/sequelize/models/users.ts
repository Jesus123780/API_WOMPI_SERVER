import {
  INTEGER,
  STRING
} from 'sequelize'
import sequelizeConnection from '../../../repositories/repositories_sequelize'
import { enCode } from '../../../../utils/enCrypt'

const UserModel = sequelizeConnection.define('User', {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    get (this: any) { return enCode(this.getDataValue('uId' as string)) }
  },
  username: {
    type: STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: STRING,
    allowNull: false
  }
})

export default UserModel
