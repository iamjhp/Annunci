const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const path = require('path')

const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Item = require('../models/item')
const User = require('../models/user')
const ImageFile = require('../models/imageFiles')
const ImageChunk = require('../models/imageChunks')

describe('when there are some items in database', () => {
  beforeEach(async () => {
    await Item.deleteMany({})
    await Item.insertMany(helper.initialItems)

    await ImageFile.deleteMany({})
    await ImageChunk.deleteMany({})
  })

  test('those are returned as json', async () => {
    const res = await api
      .get('/api/items')
      .expect(200)
      .expect('Content-Type', /application\/json/)

      expect(res.body).toHaveLength(helper.initialItems.length)
  })

  test('those are identified by id', async () => {
    const res = await api
      .get('/api/items')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(res.body[0].id).toBeDefined()
    expect(res.body[1].id).toBeDefined()
  })

  test('those contains a title', async () => {
    const res = await api
      .get('/api/items')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(res.body[0].title).toBeDefined()
  })
})

describe('addtion of a item', () => {
  let token
  const filePath = path.resolve(__dirname, './test.jpg')
  const email = 'test@test.com'

  beforeEach(async () => {
    await Item.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secretpassword', 10)
    const user = new User({ email: email, passwordHash })

    await user.save()

    const response = await api
      .post('/api/login')
      .send({ email:  'test@test.com', password: 'secretpassword' })

    token = response.body.token
  })

  test('succeeds if content valid', async () => {
    const newItem = {
      title: "test1",
      description: "description1",
      price: 10,
      offer: "biete",
      owner: email
    }

    await api
      .post('/api/items')
      .send(newItem)
      .set('Authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const itemsInDB = await helper.ItemsInDB()
    expect(itemsInDB).toHaveLength(1)
  })

  test('contains the attached file', async () => {
    const newItem = {
      title: "test1",
      description: "description1",
      price: 10,
      offer: "biete",
      owner: email
    }

    await api
    .post('/api/items')
    .field(newItem)
    .set('Authorization', `bearer ${token}`)
    .attach('file', filePath)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const itemsInDB = await helper.ItemsInDB()
    expect(itemsInDB[0].fileId).toBeDefined 
  })

  test('fails if title is missing', async () => {
    const newItem = {
      description: "description1",
      price: 10,
      offer: "biete",
      owner: email
    }

    await api
      .post('/api/items')
      .field(newItem)
      .set('Authorization', `bearer ${token}`)
      .attach('file', filePath)
      .expect(400)

    const itemsInDB = await helper.ItemsInDB()
    expect(itemsInDB).toHaveLength(0)
  })
})

afterAll(() => {
  mongoose.connection.close()
})