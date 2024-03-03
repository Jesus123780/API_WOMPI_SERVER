import type { Request, Response } from 'express'
import { LogDanger, ResponseService } from '../../utils/magic'
import * as enum_ from '../../utils/enum'
import UserRiderModel from '../orm/sequelize/models/users'
import { checkRequiredFields } from '../../utils/checkRequiredFields'
/**
 * @swagger
 * tags:
 *   - name: User Rider
 *     description: Operations related to user riders
 *
 * /api/v1/users/users:
 *   get:
 *     summary: Get all user riders.
 *     description: Retrieves a list of all user riders.
 *     tags:
 *       - User Rider
 *     responses:
 *       '200':
 *         description: Successful operation. Returns a list of user riders.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the response.
 *                 response:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: string
 *                       description: Error code.
 *                     message:
 *                       type: string
 *                       description: Error message.
 *                     data:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           idUserRider:
 *                             type: integer
 *                             description: The ID of the user rider.
 *                           username:
 *                             type: string
 *                             description: The username of the user rider.
 *                           email:
 *                             type: string
 *                             description: The email of the user rider.
 *                           password:
 *                             type: string
 *                             description: The password of the user rider.
 *       '500':
 *         description: Internal server error. Failed to retrieve user riders.
 */
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

/**
 * @swagger
 * tags:
 *   - name: User Rider
 *     description: Operations related to user riders
 *
 * /api/v1/users/createUserRider:
 *   post:
 *     summary: Create a new user rider.
 *     description: Creates a new user rider with the provided username, email, and password.
 *     tags:
 *       - User Rider
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the new user rider.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the new user rider.
 *               password:
 *                 type: string
 *                 description: The password of the new user rider.
 *     responses:
 *       '201':
 *         description: User rider created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the response.
 *                 response:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: string
 *                       description: Error code.
 *                     message:
 *                       type: string
 *                       description: Error message.
 *                     data:
 *                       type: object
 *                       properties:
 *                         idUserRider:
 *                           type: integer
 *                           description: The ID of the newly created user rider.
 *                         username:
 *                           type: string
 *                           description: The username of the newly created user rider.
 *                         email:
 *                           type: string
 *                           description: The email of the newly created user rider.
 *       '400':
 *         description: Bad request. Missing required fields in the request body.
 *       '500':
 *         description: Internal server error. Failed to create user rider.
 */
export const createUserRider = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {
      username,
      email,
      password
    } = req.body
    const requiredFields = ['username', 'email', 'password']
    const requiredFieldsResult = checkRequiredFields(req.body, requiredFields)

    if (requiredFieldsResult.error) {
      const missingFieldsMessage = `Missing required fields: ${requiredFieldsResult.fields.join(', ')}`
      LogDanger(missingFieldsMessage)
      const response = await ResponseService('Failure', enum_.CODE_BAD_REQUEST, missingFieldsMessage, '')
      return res.status(enum_.CODE_BAD_REQUEST).json(response)
    }

    const userRiderExists = await UserRiderModel.findOne({ where: { username } })
    if (userRiderExists != null) {
      const response = await ResponseService('Failure', enum_.CODE_BAD_REQUEST, 'Username already exists', '')
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
    console.log(error)
    const response = await ResponseService('Failure', enum_.CODE_INTERNAL_SERVER_ERROR, 'Internal server error', '')
    return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).json(response)
  }
}

export const findOneUserRide = async (args: any): Promise<Response> => {
  try {
    const { id } = args ?? {
      id: null
    }
    const respOrm = await UserRiderModel.findOne({ where: { idUserRider: id } })
    const response = await ResponseService('Success', '', '', respOrm)
    return response
  } catch (err) {
    const response = await ResponseService('Failure', enum_.CRASH_LOGIC, err, '')
    return response
  }
}
