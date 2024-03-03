import request from 'supertest'
import app from '../../server'
import { CODE_BAD_REQUEST } from '../../utils'

describe('POST /api/v1/driver/driver', () => {
  it('should create a new user rider successfully', async () => {
    const userData = { ccDriver: '1047214581', driverName: 'Jesus Juvinao' }

    const response = await request(app)
      .post('/api/v1/driver/driver')
      .send(userData)
      .expect('Content-Type', /json/)
      .expect(200)
    expect(response.body.driverName).toBe(userData.driverName)
  })
  describe('POST /api/v1/driver/driver', () => {
    it('should return a 400 bad request when request body is missing', async () => {
      const response = await request(app)
        .post('/api/v1/driver/driver')
        .expect('Content-Type', /json/)
        .expect(400)
      expect(response.body.status).toBe('Failure')
      expect(response.body.response.code).toEqual(CODE_BAD_REQUEST)
      expect(response.body.response.message).toBe('Missing required fields')
    })
  })
})
