import { type Request, type Response } from 'express'
import { LogDanger, ResponseService } from '../../utils/magic'
import * as enum_ from '../../utils/enum'
import UserRiderModel from '../orm/sequelize/models/users'

export const getAllUserRider = async (req: Request, res: Response): Promise<Response> => {
  try {
    const statusCode = 200
    const status = 'Success'
    const errorCode = ''
    const message = ''
    const respOrm = await UserRiderModel.findAll({ raw: true })
    const response = await ResponseService(status, errorCode, message, respOrm)
    return res.status(statusCode).send(response)
  } catch (err) {
    console.log('err = ', err)
    const response = await ResponseService('Failure', enum_.CRASH_LOGIC, err, '')
    return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(response)
  }
}

export const createUserRider = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {
      username,
      email,
      password
    } = req.body

    // Validar si se proporcionaron todos los datos requeridos
    if (username === null || email === null || password === null) {
      LogDanger('Missing required fields in request body')
      const response = await ResponseService('Failure', enum_.CODE_BAD_REQUEST, 'Missing required fields', '')
      return res.status(enum_.CODE_BAD_REQUEST).json(response)
    }

    const newUserRider = await UserRiderModel.create({
      username,
      email,
      password
    })

    const response = await ResponseService('Success', enum_.CODE_CREATED, 'User rider created successfully', newUserRider)
    return res.status(enum_.CODE_CREATED).json(response)
  } catch (error) {
    const response = await ResponseService('Failure', enum_.CODE_INTERNAL_SERVER_ERROR, 'Internal server error', '')
    return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).json(response)
  }
}
