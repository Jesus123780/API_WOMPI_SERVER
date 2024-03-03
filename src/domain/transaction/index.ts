import type { Request, Response } from 'express'
import {
  CODE_INTERNAL_SERVER_ERROR,
  CODE_OK,
  CODE_UNAUTHORIZED,
  CRASH_LOGIC,
  FAILURE,
  LogDanger,
  ResponseService,
  SUCCESS
} from '../../utils'
import { addMinutesToCurrentDate } from './helpers'
import type {
  PaymentSourceDataData,
  PaymentSourceDataResponse,
  TransactionData,
  WompiMerchantResponse,
  WompiTokenResponse
} from './types'
/**
 * @swagger
 * tags:
 *   - name: Transaction
 *     description: Operaciones relacionadas con transacciones de pago
 *
 * /transaction:
 *   post:
 *     tags:
 *       - Transaction
 *     summary: Crea un enlace de pago.
 *     description: Crea un enlace de pago utilizando la API de Wompi.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del enlace de pago.
 *               description:
 *                 type: string
 *                 description: Descripción del pago.
 *               single_use:
 *                 type: boolean
 *                 description: Indica si el enlace de pago será de un solo uso.
 *               collect_shipping:
 *                 type: boolean
 *                 description: Indica si se debe recolectar la información de envío.
 *               currency:
 *                 type: string
 *                 description: Moneda del pago (COP para pesos colombianos).
 *               amount_in_cents:
 *                 type: number
 *                 description: Monto del pago en centavos.
 *               expires_at:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha de expiración del enlace de pago (ISO 8601).
 *               customer_data:
 *                 type: object
 *                 properties:
 *                   customer_references:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         label:
 *                           type: string
 *                           description: Nombre del campo personalizado.
 *                         is_required:
 *                           type: boolean
 *                           description: Indica si el campo es obligatorio.
 *     responses:
 *       '200':
 *         description: Enlace de pago generado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Estado de la operación.
 *                 code:
 *                   type: string
 *                   description: Código de la operación.
 *                 message:
 *                   type: string
 *                   description: Mensaje de la operación.
 *                 urlPayment:
 *                   type: string
 *                   description: URL del enlace de pago generado.
 *       '400':
 *         description: Error en la solicitud.
 *       '401':
 *         description: Error de autenticación.
 *       '500':
 *         description: Error interno del servidor.
 */
export const createTransactionLink = async (
  req: Request,
  res: Response
): Promise<Response> => {
  console.log('createTransactionLink')
  try {
    const INVALID_ACCESS_TOKEN = /'INVALID_ACCESS_TOKEN'i/
    const errorMessage = 'Error: Payment link could not be generated'

    const status = 'Success'
    const code = CRASH_LOGIC
    const message = ''
    const headers = {
      Authorization: `Bearer ${process.env.PRIVATE_KEY_WOMPI}`
    }
    const minutesToAdd: number = 60
    const expirationDate: string = addMinutesToCurrentDate(minutesToAdd)

    const postData = {
      name: 'Pay Ride',
      description: 'Pay Ride',
      single_use: false, // `false` current caso de que el link de pago pueda recibir múltiples transacciones APROBADAS o `true` si debe dejar de aceptar transacciones después del primer pago APROBADO
      collect_shipping: false, // Si deseas que el cliente inserte su información de envío current el checkout, o no
      currency: 'COP', // Únicamente está disponible pesos colombianos (COP) current el momento. En el futuro soportaremos mas monedas
      // --------------------------------------------
      // --- Los siguientes campos son OPCIONALES ---
      // --------------------------------------------
      amount_in_cents: 500000, // Si el pago current por un monto específico, si no lo incluyes el pagador podrá elegir el valor a pagar
      expires_at: expirationDate, // Fecha current formato ISO 8601 con huso horario UTC (+5 horas que el horario colombiano) a partir de la cual el link de pago dejará de funcionar.
      redirect_url: null, // URL donde será redirigido el cliente una vez termine el proceso de pago
      image_url: null, // Dirección de la imagen que quieras presentar current el link de pago
      sku: null, // Identificador interno del producto current tu comercio. Máximo 36 caracteres
      customer_data: {
        // Campos personalizados (máximo 2) que quieras recolectar de tu cliente antes de realizar la transacción. Algunos ejemplos a continuación
        customer_references: [
          {
            label: 'Número de Apartamento', // Nombre del campo. Máximo 24 caracteres
            is_required: true // Si el campo a llenar current obligatorio por parte del pagador para poder realizar el pago
          },
          {
            label: 'Documento de identidad',
            is_required: true
          }
        ]
      }
    }
    const url = `${process.env.URL_API_WOMPI}/payment_links`

    const data = await fetch(`${url}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(postData)
    })
    const responseData = await data.json()
    if (responseData?.error?.type !== null && responseData?.data?.id === null) {
      const { type } = responseData.error
      if (type === INVALID_ACCESS_TOKEN) {
        const response = await ResponseService(
          FAILURE,
          CODE_UNAUTHORIZED,
          errorMessage,
          ''
        )
        return res.status(CODE_INTERNAL_SERVER_ERROR).send(response)
      }
    }
    const idPayment = responseData?.data?.id ?? null
    if (idPayment === null || idPayment === undefined || idPayment === '') {
      const response = await ResponseService(
        FAILURE,
        code,
        errorMessage,
        ''
      )
      return res.status(CODE_INTERNAL_SERVER_ERROR).send(response)
    }
    const urlPayment = `${process.env.URL_API_WOMPI_PAYMENT_CLIENT}${idPayment}`
    const response = await ResponseService(
      status,
      code,
      message,
      urlPayment
    )
    return res.status(CODE_OK).send(response)
  } catch (error) {
    console.log('error = ', error)
    LogDanger('[TRANSACTION] = /transaction/')
    const response = await ResponseService(
      FAILURE,
      'CRASH_LOGIC',
      error,
      error
    )
    return res.status(CODE_INTERNAL_SERVER_ERROR).send(response)
  }
}

/**
 * Creates a transaction using the Wompi API and returns a response object.
 *
 * @param {TransactionData} transactionData Transaction data object.
 * @returns {Promise<Response>} A promise that resolves to a response object containing information about the created transaction, or a response object indicating failure in case of errors.
 *
 * @version 1.3
 *
 * @throws {Error} If an error occurs during the request.
 *
 * @example
 * ```javascript
 * const transactionData = {
 *   // ... transaction data properties
 * };
 *
 * createTransaction(transactionData)
 *   .then((response) => {
 *     if (response.status === 'Success') {
 *       console.log('Transaction created successfully:', response.urlPayment);
 *     } else {
 *       console.error('Error creating transaction:', response.message);
 *     }
 *   })
 *   .catch((error) => {
 *     console.error('Unexpected error:', error);
 *   });
 * ```
 */
interface TransactionResponse {
  status: string
  code: string
  message: string
}

export const createTransaction = async (
  transactionData: TransactionData
): Promise<TransactionResponse> => {
  try {
    const errorMessage = 'Error: Payment for the trip could not be made.'

    const status = SUCCESS
    const code = CRASH_LOGIC
    const message = ''
    const headers = {
      Authorization: `Bearer ${process.env.PRIVATE_KEY_WOMPI}`
    }
    const url = `${process.env.URL_API_WOMPI}/transactions`

    const data = await fetch(`${url}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(transactionData)
    })
    const responseData = await data.json()
    const error = responseData?.error
    const errorType = error?.type
    const errorMessages = error?.messages?.valid_amount_in_cents
    const existError = error !== undefined && error !== null
    if (existError && errorType === 'INPUT_VALIDATION_ERROR' && errorMessages !== '') {
      const errorMessage = errorMessages.join('\n')

      const response = await ResponseService(
        FAILURE,
        code,
        errorMessage,
        ''
      )
      return response
    }
    if (existError) {
      const response = await ResponseService(
        FAILURE,
        code,
        errorMessage,
        ''
      )
      return response
    }
    console.log(responseData)
    const response = await ResponseService(
      status,
      code,
      message,
      responseData
    )
    return response
  } catch (error) {
    LogDanger('[createTransaction] = ERROR')
    const response = await ResponseService(
      FAILURE,
      'CRASH_LOGIC',
      error,
      error
    )
    return response
  }
}

export const tokensCards = async (): Promise<WompiTokenResponse> => {
  try {
    const postData = {
      number: '4242424242424242',
      exp_month: '06',
      exp_year: '29',
      cvc: '123',
      card_holder: 'Pedro Pérez'
    }
    const headers = {
      Authorization: `Bearer ${process.env.PUBLIC_KEY_WOMPI}`
    }
    const url = `${process.env.URL_API_WOMPI}/tokens/cards`

    const data = await fetch(`${url}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(postData)
    })
    const responseData = await data.json()
    console.log(responseData)
    if (responseData.message === 'Forbidden') {
      const response = await ResponseService(
        FAILURE,
        CODE_UNAUTHORIZED,
        responseData.message,
        ''
      )
      return response
    }
    const response = await ResponseService(
      'Success',
      CODE_OK,
      '',
      responseData
    )
    return response
  } catch (error) {
    LogDanger('[TRANSACTION] = /api/v1/wompi/transaction/tokens/cards')
    const response = await ResponseService(
      FAILURE,
      'CRASH_LOGIC',
      'error.message',
      'error.message'
    )
    return response
  }
}
/**
 * Creates a payment source using the Wompi API.
 *
 * @param {string} privateKey The merchant's private key for API access.
 * @param {PaymentSourceDataData} paymentSourceData Payment source data object.
 * @returns {Promise<PaymentSourceDataResponse>} A promise that resolves to the API response object containing the created payment source details, or a response object indicating failure in case of errors.
 *
 * @version 1.2
 *
 * @throws {Error} If an error occurs during the request.
 *
 * @example
 * ```javascript
 * const privateKey = 'your_private_key';
 * const paymentSourceData = {
 *   // ... payment source data properties
 * };
 *
 * createPaymentSource(privateKey, paymentSourceData)
 *   .then((response) => {
 *     console.log('Payment source created:', response);
 *   })
 *   .catch((error) => {
 *     console.error('Error creating payment source:', error);
 *   });
 * ```
 */
export const createPaymentSource = async (
  privateKey: string,
  paymentSourceData: PaymentSourceDataData
): Promise<PaymentSourceDataResponse> => {
  try {
    const headers = {
      Authorization: `Bearer ${privateKey}`
    }
    const url = `${process.env.URL_API_WOMPI}/payment_sources`

    const data = await fetch(`${url}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(paymentSourceData)
    })
    const responseData = (await data.json()) as PaymentSourceDataResponse
    return responseData
  } catch (error: any) {
    LogDanger(`[createPaymentSource] = [ERROR] ${error.message}`)
    const response = await ResponseService(
      FAILURE,
      'CRASH_LOGIC',
      error,
      error
    )
    return response
  }
}

/**
 * Fetches and returns a presigned acceptance token from the Wompi API.
 *
 * @param {string} publicKey The public key of the merchant.
 * @returns {Promise<string>} A promise that resolves to the presigned acceptance token or an empty string if an error occurs.
 *
 * @version 1.1
 *
 * @throws {Error} If an error occurs during the request.
 *
 * @example
 * ```javascript
 * const publicKey = 'your_public_key';
 *
 * getPresignedAcceptanceToken(publicKey)
 *   .then((acceptanceToken) => {
 *     console.log('Presigned acceptance token:', acceptanceToken);
 *   })
 *   .catch((error) => {
 *     console.error('Error fetching token:', error);
 *   });
 * ```
 */
export const getPresignedAcceptanceToken = async (
  publicKey: string
): Promise<string> => {
  try {
    const url = `${process.env.URL_API_WOMPI}/merchants/${publicKey}`

    const response = await fetch(url)
    const responseData: WompiMerchantResponse = await response.json()

    const { acceptance_token: acceptanceToken } =
      responseData.data.presigned_acceptance
    return acceptanceToken
  } catch (error: any) {
    LogDanger(`[getPresignedAcceptanceToken] = [ERROR] ${error.message}`)
    return ''
  }
}
