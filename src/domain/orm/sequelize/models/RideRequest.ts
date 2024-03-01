import sequelizeConnection from '../../../repositories/repositories_sequelize'
import { INTEGER, FLOAT } from 'sequelize'

const RideRequestModel = sequelizeConnection.define('rideRequest', {
  idRideRequest: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: INTEGER,
    allowNull: false
  },
  latitude: {
    type: FLOAT,
    allowNull: false
  },
  longitude: {
    type: FLOAT,
    allowNull: false
  }
})

export default RideRequestModel
