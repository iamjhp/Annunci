const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

/**
 * GET: /users
 * Return all users
 */
userRouter.get('/', async (req, res) => {
  const users = await User
    .find({})
    .populate('ads', { id: 1, title: 1, createdAt: 1 })
  
  res.json(users)
})

/**
 * POST: /users
 * Create a new user
 * First, it checks whether the email is not already taken
 * Then, the password is hashed with bcrypt and salt before
 * it will store in the database and return 201
 * If it is not successful, return 400
 */
userRouter.post('/', async (req, res) => {
  const { email, password } = req.body
  if (!password || password.length < 3) {
    return res.status(400).json({
      error: 'invalid password'
    })
  }

  const existingEmail = await User.findOne({ email })
  if (existingEmail) {
    return res.status(400).json({
      error: 'email already exists'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = new User({
    email,
    passwordHash
  })

  const createdUser = await newUser.save()

  res.status(201).json(createdUser)
})

module.exports = userRouter