import axios from 'axios'
import userService from './user'
const baseUrl = '/api/login'

let config = () => {
  return {
    headers: {
      Authorization: `bearer ${userService.getToken()}`
    },
  }
}

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)

  userService.setUser(response)
  
  return response.data
}

const logout = () => {
  localStorage.clear()
  config = {
    headers: {
      Authorization: 'empty'
    }
  }
}

const verifyLoggedInUser = async () => {
  try { 
    const res = await axios.get(baseUrl, config())
    return res.status
  } catch (e) {
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { login, logout, verifyLoggedInUser }