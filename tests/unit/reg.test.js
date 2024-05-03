const { MongoClient } = require('mongodb')

require('dotenv').config()

describe('insert', () => {
  let connection
  let db

  //   console.log(process.env.MONGO_JEST_URI)

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_JEST_URI)
    db = await connection.db()
  })

  afterAll(async () => {
    await connection.close()
  })

  it('should insert a doc into collection', async () => {
    const users = db.collection('users')

    const mockUser = { _id: 'some-user-id', name: 'John' }
    await users.insertOne(mockUser)

    const insertedUser = await users.findOne({ _id: 'some-user-id' })
    expect(insertedUser).toEqual(mockUser)
  })
})
