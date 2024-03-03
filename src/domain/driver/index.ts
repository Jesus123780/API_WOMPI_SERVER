import { type Request, type Response } from 'express'
import {
  LogWarning,
  ResponseService,
  CODE_BAD_REQUEST,
  CODE_INTERNAL_SERVER_ERROR,
  LogDanger,
  CODE_OK
} from '../../utils'
import DriverRideModel from '../orm/sequelize/models/driver'
import { fn } from 'sequelize'
/**
 * @swagger
 * tags:
 *   - name: Driver
 *     description: Operations related to driver creation
 *
 * /api/v1/driver/driver:
 *   post:
 *     summary: Create a new driver.
 *     description: Creates a new driver and stores it in the database.
 *     tags:
 *       - Driver
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ccDriver:
 *                 type: string
 *                 description: The driver's identification number.
 *               driverName:
 *                 type: string
 *                 description: The name of the driver.
 *     responses:
 *       '200':
 *         description: Driver created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 idDriverRide:
 *                   type: integer
 *                   description: The ID of the newly created driver.
 *                 driverName:
 *                   type: string
 *                   description: The name of the driver.
 *                 ccDriver:
 *                   type: string
 *                   description: The driver's identification number.
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The timestamp indicating when the driver was created.
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The timestamp indicating when the driver was last updated.
 *       '400':
 *         description: Bad request. Missing required fields in the request body.
 *       '500':
 *         description: Internal server error. Failed to create the driver.
 */
export const createDriver = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { ccDriver, driverName } = req.body

    // Verifica si los campos requeridos son undefined o null
    if (ccDriver === undefined || ccDriver === null || driverName === null) {
      LogWarning('Missing required fields in request body')
      const response = await ResponseService('Failure', CODE_BAD_REQUEST, 'Missing required fields', '')
      return res.status(CODE_BAD_REQUEST).send(response)
    }

    // Crea el conductor en la base de datos
    const createdDriver = await DriverRideModel.create({
      driverName,
      ccDriver
    })

    // Retorna la respuesta exitosa con el conductor creado
    return res.status(CODE_OK).send(createdDriver)
  } catch (error) {
    console.error('Error:', error)
    LogDanger('Error creating driver')
    const response = await ResponseService('Failure', 'CRASH_LOGIC', error, error)
    return res.status(CODE_INTERNAL_SERVER_ERROR).send(response)
  }
}

/**
 * Busca un conductor aleatorio en la base de datos.
 * @version 1.0.0
 * @async
 * @function findRandomDriver
 * @returns {Promise<number | null>} El ID del conductor aleatorio si se encuentra, o null si hay un error.
 * @throws {Error} Error si no se puede encontrar un conductor aleatorio.
 */
export const findRandomDriver = async (): Promise<number | null> => {
  try {
    const idDriverRide = 'idDriverRide'
    const randomDriver = await DriverRideModel.findOne({
      order: fn('RAND'),
      attributes: [idDriverRide]
    })
    const idRandomDriverRide = randomDriver?.get(idDriverRide) as number
    return idRandomDriverRide
  } catch (error) {
    LogDanger('Error finding random driver')
    return null
  }
}
