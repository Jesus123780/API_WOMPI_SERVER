import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import cors from 'cors'
import routes from '../routes'

const server = express()

server.use(helmet())
server.use(cors())

// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))

// parse application/json
server.use(bodyParser.json({ limit: '50mb' }))

routes(server)

export default server
