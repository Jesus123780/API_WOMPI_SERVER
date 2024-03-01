// import { Get, Route } from "tsoa"
import type { Request, Response } from 'express'
import { CODE_INTERNAL_SERVER_ERROR, CODE_OK, CODE_UNAUTHORIZED, CRASH_LOGIC, LogDanger, ResponseService } from '../../utils'
import { addMinutesToCurrentDate } from './helpers'

// @Route("ping")
export const createTransaction = async (req: Request, res: Response): Promise<Response> => {
// Get("/")
  try {
    const INVALID_ACCESS_TOKEN = /'INVALID_ACCESS_TOKEN'i/
    const errorMessage = 'Error: Payment link could not be generated'

    const status = 'Success'
    const errorCode = CRASH_LOGIC
    const message = ''
    const headers = {
      Authorization: `Bearer ${process.env.PRIVATE_KEY_WOMPI}`
    }
    const minutesToAdd: number = 60
    const expirationDate: string = addMinutesToCurrentDate(minutesToAdd)

    const postData = {
      name: 'Pago de arriendo edificio Lombardía - AP 505', // Nombre del link de pago
      description: 'Arriendo mensual', // Descripción del pago
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
      customer_data: { // Campos personalizados (máximo 2) que quieras recolectar de tu cliente antes de realizar la transacción. Algunos ejemplos a continuación
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
        const response = await ResponseService('Failure', CODE_UNAUTHORIZED, errorMessage, '')
        return res.status(CODE_INTERNAL_SERVER_ERROR).send(response)
      }
    }
    const idPayment = responseData?.data?.id ?? null
    if (idPayment === null || idPayment === undefined || idPayment === '') {
      const response = await ResponseService('Failure', errorCode, errorMessage, '')
      return res.status(CODE_INTERNAL_SERVER_ERROR).send(response)
    }
    const urlPayment = `${process.env.URL_API_WOMPI_PAYMENT_CLIENT}${idPayment}`
    const response = await ResponseService(status, errorCode, message, urlPayment)
    return res.status(CODE_OK).send(response)
  } catch (error) {
    console.log('error = ', error)
    LogDanger('[TRANSACTION] = /transaction/')
    const response = await ResponseService('Failure', 'CRASH_LOGIC', error, error)
    return res.status(500).send(response)
  }
}
