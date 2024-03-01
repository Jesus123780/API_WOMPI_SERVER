import { type Request, type Response } from 'express'
import {
  CODE_BAD_REQUEST,
  CODE_INTERNAL_SERVER_ERROR,
  CODE_OK,
  LogDanger,
  LogInfo,
  LogSuccess,
  LogWarning,
  ResponseService,
  calculateLogLatHaversine
} from '../../utils'
import { findRandomDriver } from '../driver'
import Ride from '../orm/sequelize/models/Ride'
import { calculateTotalPrice } from './helpers'

interface RequestBody {
  latitude: number
  longitude: number
  endLongitude: number
  endLatitude: number
  idUserRider: number
}

export const createRide = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    LogInfo('[POST] /api/v1/rides/createRide')

    // Obtener los datos del cuerpo de la solicitud
    const {
      latitude,
      longitude,
      endLongitude,
      endLatitude,
      idUserRider
    }: RequestBody =
      req.body

    // Validar si se proporcionaron todos los datos requeridos
    if (
      latitude === undefined ||
      longitude === undefined ||
      idUserRider === undefined ||
      latitude === null ||
      longitude === null ||
      idUserRider === null
    ) {
      LogWarning('Missing required fields in request body')
      const response = await ResponseService(
        'Failure',
        CODE_BAD_REQUEST,
        'Missing required fields',
        ''
      )
      return res.status(CODE_BAD_REQUEST).send(response)
    }

    // Aquí iría la lógica para manejar la solicitud de viaje
    // Por ahora, solo se muestra la información recibida
    LogSuccess('Request ride data:')
    console.log('Latitude:', latitude)
    console.log('Longitude:', longitude)
    console.log('User ID Rider:', idUserRider)

    const randomDriver = await findRandomDriver()
    const idDriverRide = randomDriver
    console.log('Random Driver Ride ID:', idDriverRide)
    const newRide = await Ride.create({
      idUserRider: 1,
      idDriverRide: 1,
      startLatitude: latitude,
      startLongitude: longitude,
      endLatitude,
      endLongitude
    })
    const distanceKm = calculateLogLatHaversine(
      latitude,
      longitude,
      endLatitude,
      endLongitude
    )
    LogSuccess(`KM: ${distanceKm}`)

    const totalPrice = calculateTotalPrice(distanceKm)
    LogSuccess(`Total trip fare: ${totalPrice}`)

    const response = await ResponseService(
      'Success',
      CODE_OK,
      'Ride requested successfully',
      newRide
    )
    return res.status(CODE_OK).send(response)
  } catch (error) {
    LogDanger('Error handling ride request:')
    const response = await ResponseService(
      'Failure',
      CODE_INTERNAL_SERVER_ERROR,
      'Internal server error',
      error
    )
    return res.status(CODE_INTERNAL_SERVER_ERROR).send(response)
  }
}
