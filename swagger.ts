import swaggerJSDoc from 'swagger-jsdoc'
import path from 'path'

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API_TRANSACTION_WOMPI',
      version: '1.0.0'
    }

  },
  swaggerDefinition: {
    info: {
      title: 'API TRANSACTION WOMPI',
      version: '1.0.0'
    }
  },
  apis: [
    path.join(__dirname, './src/domain/**/*.ts'),
    path.join(__dirname, './src/domain/**/*.js')
  ]
}

const swaggerSpec = swaggerJSDoc(options)

export default swaggerSpec
