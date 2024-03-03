import request from 'supertest'
import app from '../server'
import { CODE_BAD_REQUEST } from '../utils'

jest.setTimeout(1000000)
describe('Post Endpoint create Ride ', () => {
  it('should create a new ride and pay transaction successfully', async () => {
    // Arrange
    const rideData = {
      latitude: 4.793315895432347,
      longitude: -75.73768527482514,
      idUserRider: 1,
      email: 'juvinaojesusd@gmail.com',
      endLatitude: 4.831870662263195,
      endLongitude: -75.68060921521975,
      type: 'CARD',
      currency: 'COP'
    }
    // Act
    const response = await request(app)
      .post('/api/v1/ride/createRide')
      .send(rideData)
      .expect('Content-Type', /json/)
      .expect(200)
    // Assert
    expect(response.body.status).toBe('success')
    expect(response.body.response.data.data.customer_email).toBe(rideData.email)
    expect(response.body.response.data.data.payment_method_type).toBe(rideData.type)
    expect(response.body.response.data.data.currency).toBe(rideData.currency)
    expect(response.body.response.data.data.status).toBe('PENDING')
    expect(response.body.response.data.data.amount_in_cents).toEqual(1419646)
  })
  it('should return a 400 bad request missing email ', async () => {
    // Arrange
    const rideData = {
      latitude: 4.793315895432347,
      longitude: -75.73768527482514,
      idUserRider: 1,
      email: '',
      endLatitude: 4.831870662263195,
      endLongitude: -75.68060921521975,
      type: 'CARD',
      currency: 'COP'
    }
    // Act
    const response = await request(app)
      .post('/api/v1/ride/createRide')
      .send(rideData)
      .expect('Content-Type', /json/)
      .expect(400)

    // Assert
    expect(response.body.status).toBe('Failure')
    expect(response.body.response.code).toEqual(CODE_BAD_REQUEST)
    expect(response.body.response.message).toBe('Missing required email')
  })
  it('should return a 400 bad request when user is not found', async () => {
    // Arrange
    const rideData = {
      latitude: 4.793315895432347,
      longitude: -75.73768527482514,
      idUserRider: null,
      email: 'juvinaojesusd@gmail.com',
      endLatitude: 4.831870662263195,
      endLongitude: -75.68060921521975,
      type: 'CARD',
      currency: 'COP'
    }
    // Act
    const response = await request(app)
      .post('/api/v1/ride/createRide')
      .send(rideData)
      .expect('Content-Type', /json/)

    // Assert
    expect(response.body.status).toBe('Failure')
    expect(response.body.response.code).toEqual(CODE_BAD_REQUEST)
    expect(response.body.response.message).toBe('user not received')
  })

  it('should respond with Swagger documentation', async () => {
    // Act
    const response = await request(app
    ).get('/docs')
    expect(response.type).toEqual('text/html')
  })

  it('should return a 400 bad request when latitude or longitude is missing', async () => {
    // Arrange
    const rideData = {
      idUserRider: 1,
      email: 'juvinaojesusd@gmail.com',
      endLatitude: 4.831870662263195,
      endLongitude: -75.68060921521975,
      type: 'CARD',
      currency: 'COP'
    }
    // Act
    const response = await request(app)
      .post('/api/v1/ride/createRide')
      .send(rideData)
      .expect('Content-Type', /json/)
      .expect(400)
    // Assert
    expect(response.body.status).toBe('Failure')
    expect(response.body.response.code).toEqual(CODE_BAD_REQUEST)
    expect(response.body.response.message).toBe('Missing required fields')
  })
})
