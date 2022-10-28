const loginRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

loginRouter.get('/', (req, res) => {
  console.log(req.user)
  console.log("--------------")
  if (!req.user) {
    return res.status(401).json({ error: 'token missing or invalid'})
  }

  return res.status(201).end()
})

loginRouter.post('/', async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid email or password'
    })
  }

  const userForToken = {
    email: user.email,
    id: user._id
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  res
    .status(200)
    .send({ token, email: user.email })
})

module.exports = loginRouter