import type {
  Request,
  Response
} from 'express'
import {
  CODE_BAD_REQUEST,
  CODE_INTERNAL_SERVER_ERROR,
  FAILURE,
  CODE_OK,
  LogDanger,
  LogInfo,
  LogSuccess,
  LogWarning,
  ResponseService,
  calculateLogLatHaversine,
  SUCCESS
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
  getPresignedAcceptanceToken
} from '../transaction'
import { type RequestBody } from './types'
import { validateEmail } from '../../utils/validateEmail'
import { findOneUserRide } from '../userRider'
import { getOrCreateTokenizedCardId } from './helpers/tokenCard'

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
      idUserRider,
      email,
      type = 'CARD',
      currency = 'COP'
    }: RequestBody = req.body
    if (idUserRider === null || idUserRider === undefined) {
      LogWarning('Missing required fields in request body')
      const response = await ResponseService(
        FAILURE,
        CODE_BAD_REQUEST,
        'user not received',
        ''
      )
      return res.status(CODE_BAD_REQUEST).send(response)
    }
    if (
      latitude === undefined ||
      longitude === undefined ||
      latitude === null ||
      longitude === null
    ) {
      LogWarning('Missing required fields in request body')
      const response = await ResponseService(
        FAILURE,
        CODE_BAD_REQUEST,
        'Missing required fields',
        ''
      )
      return res.status(CODE_BAD_REQUEST).send(response)
    }
    const isValidEmail = validateEmail(email, { strict: true })

    if (!isValidEmail) {
      LogWarning('Missing required email in request body')
      const response = await ResponseService(
        FAILURE,
        CODE_BAD_REQUEST,
        'Missing required email',
        ''
      )
      return res.status(CODE_BAD_REQUEST).send(response)
    }
    const findUser = await findOneUserRide({ id: idUserRider })
    if (findUser === null) {
      LogWarning('User not found')
      const response = await ResponseService(
        FAILURE,
        CODE_BAD_REQUEST,
        'An error has occurred',
        ''
      )
      return res.status(CODE_BAD_REQUEST).send(response)
    }

    // Aquí iría la lógica para manejar la solicitud de viaje
    // Por ahora, solo se muestra la información recibida
    LogSuccess('Request ride data:')
    LogInfo(`Latitude: ${latitude}`)
    LogInfo(`Longitude: ${longitude} `)
    LogInfo(`User ID Rider: ${idUserRider}`)

    const randomDriver = await findRandomDriver()
    const idDriverRide = randomDriver
    console.log('Random Driver Ride ID:', idDriverRide)
    await Ride.create({
      idUserRider,
      idDriverRide,
      startLatitude: latitude,
      startLongitude: longitude,
      endLatitude,
      endLongitude
    })
    const publicKey = `${process.env.PUBLIC_KEY_WOMPI}`
    LogInfo('Create acceptance token for payment source')
    const [acceptanceToken, idTokenCard] = await Promise.all([
      getPresignedAcceptanceToken(publicKey),
      getOrCreateTokenizedCardId()
    ])
    if (idTokenCard === '') {
      LogDanger('Error tokenizing card')
      const response = await ResponseService(
        FAILURE,
        CODE_INTERNAL_SERVER_ERROR,
        'Error: tokenizing card',
        ''
      )
      return res.status(CODE_INTERNAL_SERVER_ERROR).send(response)
    }
    const paymentSourceData = {
      type,
      token: idTokenCard,
      customer_email: `${email}`,
      acceptance_token: acceptanceToken
    }
    const privateAccessKey = `${process.env.PRIVATE_KEY_WOMPI}`
    const paymentSource = await createPaymentSource(privateAccessKey, paymentSourceData)
    if (paymentSource.error === undefined) {
      const { id, customer_email: customerEmail } = paymentSource?.data ?? {
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
        currency,
        signature: integrityFirm,
        customer_email: customerEmail,
        recurrent: true,
        payment_method: {
          installments: 1
        },
        reference: codeReference,
        payment_source_id: id
      }
      const transaction = await createTransaction(transactionData)
      if (transaction.status !== SUCCESS) {
        LogDanger('Error creating payment source')
        const response = await ResponseService(
          FAILURE,
          CODE_INTERNAL_SERVER_ERROR,
          'Error: creating payment source',
          ''
        )
        return res.status(CODE_INTERNAL_SERVER_ERROR).send(response)
      }
      return res.status(CODE_OK).send(transaction)
    }
    return res.status(CODE_INTERNAL_SERVER_ERROR).send({})
  } catch (error) {
    LogDanger('Error handling ride request:')
    const response = await ResponseService(
      FAILURE,
      CODE_INTERNAL_SERVER_ERROR,
      'Internal server error',
      error
    )
    return res.status(CODE_INTERNAL_SERVER_ERROR).send(response)
  }
}
