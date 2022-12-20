import axios from 'axios'
import userService from './user'
const baseUrl = '/api/login'

// Set header with token authorization
let config = () => {
  return {
    headers: {
      Authorization: `bearer ${userService.getToken()}`
    },
  }
}

/**
 * POST: /api/login
 * Log in with the received credential
 */
const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)

  userService.setUser(response)
  return response.data
}

// Log out and delete token
const logout = () => {
  localStorage.clear()
  config = {
    headers: {
      Authorization: 'empty'
    }
  }
}

/**
 * GET: /api/login
 * Check if the token of the user to be logged in is valid
 */
const verifyLoggedInUser = async () => {
  try {
    const res = await axios.get(baseUrl, config())
    return res.status
  } catch (e) {
    console.log(e)
  }
}

const authService = {
  login,
  logout,
  verifyLoggedInUser,
}

export default authService
