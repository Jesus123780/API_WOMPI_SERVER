import { INTEGER, STRING } from 'sequelize'
import sequelizeConnection from '../../../repositories/repositories_sequelize'

// Travel Model
const DriverRideModel = sequelizeConnection.define('driver', {
  idDriverRide: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  driverName: {
    type: STRING,
    allowNull: false
  },
  ccDriver: {
    type: INTEGER,
    allowNull: false
  }
})

export default DriverRideModel
