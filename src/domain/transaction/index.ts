import type { Request, Response } from 'express'
import { ResponseService } from '../../utils'

export const createTransaction = async (req: Request, res: Response): Promise<Response> => {
  try {
    const statusCode = 200
    const status = 'Success'
    const errorCode = ''
    const message = ''
    const headers = {
      Authorization: `Bearer ${process.env.PRIVATE_KEY_WOMPI}`
    }
    const postData = {
      name: 'Pago de arriendo edificio Lombardía - AP 505', // Nombre del link de pago
      description: 'Arriendo mensual', // Descripción del pago
      single_use: false, // `false` current caso de que el link de pago pueda recibir múltiples transacciones APROBADAS o `true` si debe dejar de aceptar transacciones después del primer pago APROBADO
      collect_shipping: false, // Si deseas que el cliente inserte su información de envío current el checkout, o no
      currency: 'COP'
    }
    const url = `${process.env.URL_API_WOMPI}/payment_links`

    const data = await fetch(`${url}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(postData)
    })
    const responseData = await data.json()
    const response = await ResponseService(status, errorCode, message, responseData)
    return res.status(statusCode).send(response)
  } catch (error) {
    console.log('error = ', error)
    const response = await ResponseService('Failure', 'CRASH_LOGIC', error, '')
    return res.status(500).send(response)
  }
}
