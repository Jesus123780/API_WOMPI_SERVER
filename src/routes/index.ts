import { type Express } from 'express'
import apiServices from '../controller/index'

const routers = (app: Express): void => {
  app.use('/api/v1', apiServices)
}

export default routers
