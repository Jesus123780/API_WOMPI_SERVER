import { type Request, type Response } from 'express'
import userModel from '../orm/sequelize/models/users'
import { ResponseService } from '../../utils/magic'
import * as enum_ from '../../utils/enum'

export const getAll = async (req: Request, res: Response): Promise<Response> => {
  try {
    const statusCode = 200
    const status = 'Success'
    const errorCode = ''
    const message = ''
    const respOrm = await userModel.findAll({ raw: true })
    const response = await ResponseService(status, errorCode, message, respOrm)
    return res.status(statusCode).send(response)
  } catch (err) {
    console.log('err = ', err)
    const response = await ResponseService('Failure', enum_.CRASH_LOGIC, err, '')
    return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(response)
  }
}
