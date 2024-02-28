import type { Express } from 'express'
import transactionRoutes from '../controller/transaction/index'
import userRoutes from '../controller/user'

const routers = (app: Express): void => {
  app.use('/api/v1/wompi', transactionRoutes)
  app.use('/api/v1/users', userRoutes)
}

export default routers
