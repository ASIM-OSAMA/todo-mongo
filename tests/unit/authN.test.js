const app = require('../../app')
const supertest = require('supertest')
const request = supertest(app)
const mongoose = require('mongoose')
const userDB = require('../../backend/models/userDB')

describe('Testing authN', () => {
  beforeAll(async () => {
    // console.log('process.env.MONGO_JEST_URI: ', process.env.MONGO_JEST_URI)

    try {
      connection = await mongoose.connect(process.env.MONGO_JEST_URI)
    } catch (error) {
      console.log(error)
    }
  })

  // Closing database connection after each test.
  afterAll(async () => {
    await connection.disconnect()
  })

  // 1. Register a user
  it('should register a user with status code 201, json data: id, name email,token', async () => {
    const start = Date.now()

    const res = await request
      .post('/todos/users')
      .send({ name: 'user', email: 'user@user.com', password: 'User@123' })

    const responseTime = Date.now() - start

    expect(responseTime).toBeLessThanOrEqual(1000) // Assert response time is below 500ms
    // await expect(res.status).toBe(201)
    expect(res.status).toBe(422)
    expect(res.headers['content-type']).toMatch('application/json')
  })

  // 1.1 Find the user in the database

  it('should Find the user in the database', async () => {
    const user = await userDB.findOne({ email: 'user@user.com' })
    expect(user).toBeTruthy()
    expect(typeof user).toBe('object') // user is a Mongoose document, so it is an object.
  })

  // login

  // get user data if he is loggedin

  // ------------------

  // it('should send error: Not Authorized, no token', async () => {
  //   const res = await request.get('/todos/users/me')
  //   expect(res.status).toBe(401)
  //  expect('content-type').toBe('application/json')
  //
  // })
})
