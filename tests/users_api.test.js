const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')

const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const User = require('../models/user')

describe('when there are some users in database', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const initialUsers = helper.initialUser

    const passwordHashOne = await bcrypt.hash(initialUsers[0].password, 10)
    const newUserOne = new User({ email: initialUsers[0].email, passwordHashOne })

    const passwordHashTwo = await bcrypt.hash(initialUsers[1].password, 10)
    const newUserTwo = new User({ email: initialUsers[1].email, passwordHashTwo })

    await newUserOne.save()
    await newUserTwo.save()
  });

  test('those are return as json', async () => {
    const res = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('should return all users', async () => {
    const res = await api
        .get('/api/users')
        .expect(200)
    
    expect(res.body).toHaveLength(helper.initialUser.length)
  })

  test('those contains an email', async () => {
    const res = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    expect(res.body[0].email).toBeDefined()
    expect(res.body[1].email).toBeDefined()
  })

  test('those do not return passwordHash', async () => {
    const res = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    expect(res.body[0].passwordHash).not.toBeDefined()
    expect(res.body[1].passwordHash).not.toBeDefined()
  })
})

describe('addtion of a user', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })
  
  test('succeeds', async () => {
    await api
      .post('/api/users')
      .send({ email: 'test@test.test', password: 'testest'})
      .expect(201)

    const res = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(res.body).toHaveLength(1)
  })

  test('fails because of existing email in DB', async () => {
    await api
      .post('/api/users')
      .send({ email: 'test@test.test', password: 'testest'})
      .expect(201)
    
    await api
      .post('/api/users')
      .send({ email: 'test@test.test', password: 'testest2'})
      .expect(400)

    const res = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(res.body).toHaveLength(1)
  })

  test('fails because of invalid pasword', async () => {
    await api
      .post('/api/users')
      .send({ email: 'test@test.test', password: ''})
      .expect(400)
    
    await api
      .post('/api/users')
      .send({ email: 'test@test.test', password: 'ab'})
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})