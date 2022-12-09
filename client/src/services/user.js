import axios from 'axios'
const baseUrl = '/api/login'
let token = null

const STORAGE_KEY = 'loggedAnnunciUser'

let config = (userToken) => {
  return {
    headers: {
      Authorization: `bearer ${userToken}`
    },
  }
}

const getUser = () => {
  const loggedUserJSON = window.localStorage.getItem(STORAGE_KEY)
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    token = user.token

    return user
  }

  return null
}

const getUserID = async () => {
  const user = getUser()
  const updatedUrl = baseUrl + '/loggedUserId'
  const req = await axios.get(updatedUrl, config(user.token))
  return req.data
}

const setUser = (response) => {
  if (response.data.token) {
    window.localStorage.setItem(
      STORAGE_KEY, JSON.stringify(response.data)
    )

    token = response.data.token
  }
}

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