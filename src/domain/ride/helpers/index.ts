import crypto from 'crypto'

const calculateMinutesForKm = (distanceKm: number): number => {
  const averageSpeedKmPerHour = 30 // km/h
  const minutes = (distanceKm / averageSpeedKmPerHour) * 60
  return minutes
}

export const calculateTotalPrice = (distanceKm: number): {
  totalPrice: number
  formattedPrice: string
} => {
  const pricePerKm = 1000
  const pricePerMinute = 200
  const durationMinutes = calculateMinutesForKm(distanceKm)
  const price = distanceKm * pricePerKm + durationMinutes * pricePerMinute

  const roundedPrice = Math.round(price)
  const totalPrice = price?.toFixed(2).replace('.', '')

  const formattedPrice = roundedPrice.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })

  return {
    totalPrice: Number(totalPrice),
    formattedPrice
  }
}

export function formatCOP (str: number): number {
  const numberFormat = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })

  const parsedNumber = numberFormat.format(Number(str))
  return Math.floor(Number(parsedNumber))
}

export function removeCharacters (
  input: string | number,
  charactersToRemove: string[] = ['.', ',']
): string {
  // Handle potential errors during input conversion
  try {
    const inputString = typeof input === 'string' ? input : input.toString()

    const regex = new RegExp(`[${charactersToRemove.join('')}]`, 'g')

    return inputString.replace(regex, '')
  } catch (error) {
    console.error('Error converting input to string:', error)
    return ''
  }
}

export const createIntegrityFirm = async (reference: string, amount: number): Promise<string> => {
  const secretKey = process.env.INTEGRITY_FIRM
  const integrityFirm = `${reference}${amount}COP${secretKey}`
  const enCodeText = new TextEncoder().encode(integrityFirm)
  const hashBuffer = await crypto.subtle.digest('SHA-256', enCodeText)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  return hashHex
}

export const generateRandomCode = (longitud: number, tipo?: string): string => {
  // Definir caracteres válidos
  let caracteresValidos = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_'

  // Si se especifica un tipo, agregar caracteres adicionales
  if (tipo === 'alfanumérico') {
    caracteresValidos += '.'
  }

  // Generar cadena aleatoria
  let referencia = ''
  for (let i = 0; i < longitud; i++) {
    referencia += caracteresValidos[Math.floor(Math.random() * caracteresValidos.length)]
  }

  // Formatear referencia según el tipo
  if (tipo === 'uuid') {
    referencia = referencia.replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5')
  } else if (tipo === 'codigoPostal') {
    referencia = referencia.replace(/(.{3})(.{3})/, '$1-$2')
  }

  // Devolver la referencia
  return referencia
}
