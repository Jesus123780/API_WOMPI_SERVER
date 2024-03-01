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
      title: 'API',
      version: '1.0.0'
    }
  },
  apis: [path.join(__dirname, './src/routes/*'), path.join(__dirname, './src/controller/*.ts'), path.join(__dirname, './src/models/*.ts')]
}

const swaggerSpec = swaggerJSDoc(options)

export default swaggerSpec
