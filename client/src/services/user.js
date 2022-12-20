import axios from 'axios'
const baseUrl = '/api/login'
let token = null

const STORAGE_KEY = 'loggedAnnunciUser'

// Set header with token authorization
let config = (userToken) => {
  return {
    headers: {
      Authorization: `bearer ${userToken}`
    },
  }
}

// Return the logged in user
const getUser = () => {
  const loggedUserJSON = window.localStorage.getItem(STORAGE_KEY)
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    token = user.token

    return user
  }

  return null
}

/**
 * GET: /api/login/loggedUserId
 * Check the validity of the user's credential
 * Return the userId if the user's credential is valid
 */
const getUserID = async () => {
  const user = getUser()
  const updatedUrl = baseUrl + '/loggedUserId'
  const req = await axios.get(updatedUrl, config(user.token))
  return req.data
}

// Save the received token in the storage
const setUser = (response) => {
  if (response.data.token) {
    window.localStorage.setItem(
      STORAGE_KEY, JSON.stringify(response.data)
    )

    token = response.data.token
  }
}

/**
 * GET: /api/login
 * Check if the user's token is valid 
 */
const checkUser = async () => {
  const req = await axios.get(baseUrl)
  return req
}

const getToken = () => token
const clearToken = () => token = null

const userService = {
  getUser,
  setUser,
  checkUser,
  getToken,
  clearToken,
  getUserID
}

export default userService