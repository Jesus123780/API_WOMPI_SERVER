import request from 'supertest'
import app from '../../server'
import { CODE_BAD_REQUEST, FAILURE } from '../../utils'

describe('POST Endpoint createUserRider', () => {
  it('should create a new user rider ERROR, USER EXISTING ', async () => {
    // Arrange
    const body = {
      username: 'test_user',
      email: 'email@example.com',
      password: 'password'
    }
    // Act
    const response = await request(app)
      .post('/api/v1/users/user')
      .send(body)
      .expect('Content-Type', /json/)
      .expect(400)
    // Assert
    expect(response.body.status).toBe(FAILURE)
    expect(response.body.response.message).toBe('Username already exists')
  })

  it('should return a 400 bad request for missing body', async () => {
    // Act
    const response = await request(app)
      .post('/api/v1/users/user')
      .expect('Content-Type', /json/)
      .expect(400)

    // Assert
    expect(response.body.status).toBe('Failure')
    expect(response.body.response.code).toEqual(CODE_BAD_REQUEST)
    expect(response.body.response.message).toBe('Missing required fields: username, email, password')
  })

  it('should return a 400 bad request for missing username', async () => {
    // Arrange
    const email = ''
    const password = 'password'

    // Act
    const response = await request(app)
      .post('/api/v1/users/user')
      .send({ email, password })
      .expect('Content-Type', /json/)
      .expect(400)

    // Assert
    expect(response.body.status).toBe('Failure')
    expect(response.body.response.code).toEqual(CODE_BAD_REQUEST)
    expect(response.body.response.message).toBe('Missing required fields: username')
  })

  it('should return a 400 bad request for missing email', async () => {
    // Arrange
    const username = 'test_user'
    const password = 'password'

    // Act
    const response = await request(app)
      .post('/api/v1/users/user')
      .send({ username, password })
      .expect('Content-Type', /json/)
      .expect(400)

    // Assert
    expect(response.body.status).toBe('Failure')
    expect(response.body.response.code).toEqual(CODE_BAD_REQUEST)
    expect(response.body.response.message).toBe('Missing required fields: email')
  })

  it('should return a 400 bad request for missing password', async () => {
    // Arrange
    const username = 'test_user'
    const email = '[email address removed]'

    // Act
    const response = await request(app)
      .post('/api/v1/users/user')
      .send({ username, email })
      .expect('Content-Type', /json/)
      .expect(400)

    // Assert
    expect(response.body.status).toBe('Failure')
    expect(response.body.response.code).toEqual(CODE_BAD_REQUEST)
    expect(response.body.response.message).toBe('Missing required fields: password')
  })
})
