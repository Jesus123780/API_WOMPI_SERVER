import type {
  NextFunction,
  Request,
  Response
} from 'express'
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
import {
  calculateTotalPrice,
  createIntegrityFirm,
  generateRandomCode
} from './helpers'
import {
  createPaymentSource,
  createTransaction,
  getPresignedAcceptanceToken,
  tokensCards
} from '../transaction'
import type { typeCard } from '../transaction/types'

interface RequestBody {
  latitude: number
  longitude: number
  endLongitude: number
  endLatitude: number
  idUserRider: number
  type: typeCard
}

export const createRide = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    LogInfo('[POST] /api/v1/rides/createRide')

    // Obtener los datos del cuerpo de la solicitud
    const {
      latitude,
      longitude,
      endLongitude,
      endLatitude,
      idUserRider,
      type = 'CARD'
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
    const publicKey = `${process.env.PUBLIC_KEY_WOMPI}`
    LogInfo('Create acceptance token for payment source')
    const acceptanceToken = await getPresignedAcceptanceToken(publicKey)
    const tokenizedCard = await tokensCards()
    const idTokenCard = tokenizedCard?.response?.data.data.id ?? ''
    if (tokenizedCard.response?.data?.data.id === '') {
      LogDanger('Error tokenizing card')
      const response = await ResponseService(
        'Failure',
        CODE_INTERNAL_SERVER_ERROR,
        'Error: tokenizing card',
        ''
      )
      return res.status(CODE_INTERNAL_SERVER_ERROR).send(response)
    }
    const paymentSourceData = {
      type,
      token: idTokenCard,
      customer_email: 'pepito_perez@example.com',
      acceptance_token: acceptanceToken
    }
    const privateAccessKey = `${process.env.PRIVATE_KEY_WOMPI}`
    const paymentSource = await createPaymentSource(privateAccessKey, paymentSourceData)
    console.log(paymentSource.data)
    const { id, customer_email: customerEmail } = paymentSource.data ?? {
      public_data: {
      },
      id: ''
    }
    const distanceKm = calculateLogLatHaversine(
      latitude,
      longitude,
      endLatitude,
      endLongitude
    )
    LogSuccess(`KM: ${distanceKm}`)

    const { totalPrice } = calculateTotalPrice(distanceKm)
    LogSuccess(`Total trip fare: $ ${totalPrice}`)
    const codeReference = generateRandomCode(10, 'uuid')
    const integrityFirm = await createIntegrityFirm(codeReference, totalPrice)
    const transactionData = {
      amount_in_cents: totalPrice,
      currency: 'COP',
      signature: integrityFirm,
      customer_email: customerEmail,
      payment_method: {
        installments: 1
      },
      reference: codeReference, // Referencia única de pago
      payment_source_id: id
    }
    // const payRide = await createTransaction(transactionData)
    await createTransaction(transactionData)
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
