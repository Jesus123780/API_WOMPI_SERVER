import type { Express } from 'express'
import transactionRoutes from '../controller/transaction/index'
import userRoutes from '../controller/user'
import rideRoutes from '../controller/ride'
import driverRoutes from '../controller/driver'

const routers = (app: Express): void => {
  app.use('/api/v1/wompi', transactionRoutes)
  app.use('/api/v1/users', userRoutes)
  app.use('/api/v1/ride', rideRoutes)
  app.use('/api/v1/driver', driverRoutes)
}

export default routers
