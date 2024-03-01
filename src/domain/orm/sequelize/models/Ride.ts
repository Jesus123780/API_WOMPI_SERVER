import { INTEGER, FLOAT } from 'sequelize'
import sequelizeConnection from '../../../repositories/repositories_sequelize'
import UserRiderModel from './users'
import DriverRideModel from './driver'

// Travel Model
const Ride = sequelizeConnection.define('Ride', {
  idRide: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  idUserRider: {
    type: INTEGER,
    allowNull: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: UserRiderModel,
      key: 'idUserRider'
    }
  },
  idDriverRide: {
    type: INTEGER,
    allowNull: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: DriverRideModel,
      key: 'idDriverRide'
    }
  },
  startLatitude: {
    type: FLOAT,
    allowNull: false
  },
  startLongitude: {
    type: FLOAT,
    allowNull: false
  },
  endLatitude: {
    type: FLOAT,
    allowNull: false
  },
  endLongitude: {
    type: FLOAT,
    allowNull: false
  }
})

export default Ride
