const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')

const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')

describe('when user logs in', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const initialUsers = helper.initialUser

    const passwordHashOne = await bcrypt.hash(initialUsers[0].password, 10)
    const newUser = new User({ email: initialUsers[0].email, passwordHash: passwordHashOne })
    await newUser.save()
  });

  test('succeds and gets a valid token', async () => {
    const req = await api
      .post('/api/login')
      .send({ email: helper.initialUser[0].email, password: helper.initialUser[0].password })
      .expect(200)
    
    expect(req.body.token).toBeDefined()

    const res = await api
      .get('/api/login')
      .set({'Authorization': `bearer ${req.body.token}`})
      .expect(201)
  })

  test('fails because of invalid email or password', async () => {
    const req = await api
      .post('/api/login')
      .send({ email: helper.initialUser[0].email, password: "wrongPassword" })
      .expect(401)
    
    expect(req.body.token).not.toBeDefined()

    const req2 = await api
      .post('/api/login')
      .send({ email: "wrongEmail", password: helper.initialUser[0].password })
      .expect(401)
    
    expect(req2.body.token).not.toBeDefined()
  })

  test('fails because of missing or invalid token', async () => {
    const req = await api
      .post('/api/login')
      .send({ email: helper.initialUser[0].email, password: helper.initialUser[0].password })
      .expect(200)

    const modifiedToken = req.body.token + "5"
    await api
      .get('/api/login')
      .set({'Authorization': `bearer ${modifiedToken}`})
      .expect(401)

    const emptyToken = ""
    await api
      .get('/api/login')
      .set({'Authorization': `bearer ${emptyToken}`})
      .expect(401)
  })
})

afterAll(() => {
  mongoose.connection.close()
})