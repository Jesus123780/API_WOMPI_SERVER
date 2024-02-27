import request from 'supertest'
import app from '../server'

describe('Post Endpoints', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .get('/api/v1/users/')
    expect(res.statusCode).toEqual(200)
    expect(res.body.status).toEqual('Success')
  })
})
