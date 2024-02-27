import crypto from 'crypto'

const SECRET_KEY: string = process.env.SECRET_KEY ?? ''

export const enCode = (value: string): string => {
  try {
    if (value !== null) {
      // eslint-disable-next-line n/no-deprecated-api
      const cipher = crypto.createCipher('aes-256-cbc', Buffer.from(SECRET_KEY, 'hex'))
      let encrypted = cipher.update(value.toString(), 'utf-8', 'hex')
      encrypted += cipher.final('hex')

      const uuid = [
        encrypted.substr(0, 8),
        encrypted.substr(8, 4),
        encrypted.substr(12, 4),
        encrypted.substr(16, 4),
        encrypted.substr(20)
      ].join('-')

      return uuid
    }
    return ''
  } catch (error) {
    return ''
  }
}

export const deCode = (uuidValue: string): number | string => {
  try {
    if (uuidValue === null || uuidValue === '') return ''

    const encryptedHex = uuidValue.replace(/-/g, '')
    // eslint-disable-next-line n/no-deprecated-api
    const decipher = crypto.createDecipher('aes-256-cbc', Buffer.from(SECRET_KEY, 'hex'))
    let decrypted = decipher.update(encryptedHex, 'hex', 'utf-8')
    decrypted += decipher.final('utf-8')

    return parseInt(decrypted, 10)
  } catch (error) {
    return ''
  }
}
