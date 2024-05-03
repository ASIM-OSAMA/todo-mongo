// test DB Connection

const app = require('../../app')
const supertest = require('supertest')
const request = supertest(app)

const { MongoClient } = require('mongodb')

// console.log("Test started")

describe('insert', () => {
  let connection
  let db
  let URI = process.env.MONGO_JEST_URI
  // console.log('Inside describe')

  beforeAll(async () => {
    // console.log('Inside beforeall', URI)

    connection = await MongoClient.connect(URI)
    // console.log('after connection')

    db = await connection.db(globalThis.jestTestDB)

    // console.log('after db')
  })

  afterAll(async () => {
    await connection.close()
  })

  it('should insert a doc into collection', async () => {
    const users = db.collection('users')

    const mockUser = { name: 'John2' }
    await users.insertOne(mockUser)

    const insertedUser = await users.findOne({ name: 'John2' })
    expect(insertedUser._id).toEqual(mockUser._id)
  })
})
