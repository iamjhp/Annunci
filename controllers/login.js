const loginRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Isolate the token from the authorization header and return the token
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

/**
 * GET: /login
 * Check the validity of the user's token with jwt.verify
 * if the token is valid, return 201
 * otherwise return the status code 401
 */
loginRouter.get('/', (req, res) => {
  const token = getTokenFrom(req)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid'})
  }
  return res.status(201).end()
})

/**
 * GET: /login/loggedUserId
 * Check the validity of the user's token with jwt.verify
 * Return the userId which the token was based on
 * If ther is no (valid) token, it will return a error with 401
 */
loginRouter.get('/loggedUserId', (req, res) => {
  const token = getTokenFrom(req)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid'})
  }
  return res.json(decodedToken.id)
})

/**
 * POST: /login
 * Verfy that the email and pasword match
 * and create a 1h valid token for this credential
 * If the credential is worng, it will return 401
 */
loginRouter.post('/', async (req, res) => {
  const { email, password } = req.body
  const query = { email: email.toString()}
  
  const user = await User.findOne(query)

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

  // token expires in 1 hour
  const token = jwt.sign(
    userForToken, 
    process.env.SECRET,
    { expiresIn: 60 * 60}
  )

  res
    .status(200)
    .send({ token, email: user.email })
})

module.exports = loginRouter