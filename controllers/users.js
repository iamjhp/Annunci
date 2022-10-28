const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.get('/', async (req, res) => {
  const users = await User
    .find({})
  
  res.json(users)
})

userRouter.post('/', async (req, res) => {
  const { email, password } = req.body
  console.log(req.body)
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