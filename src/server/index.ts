import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import cors from 'cors'
import routes from '../routes'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from '../../swagger'

const server = express()

server.use(helmet())
server.use(cors())
server.use(morgan('tiny'))
// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))

// parse application/json
server.use(bodyParser.json({ limit: '50mb' }))

// Swagger docs
server.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
)

routes(server)

export default server
