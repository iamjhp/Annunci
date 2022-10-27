import axios from 'axios'
const baseUrl = '/api/items'
const serverUrl = 'http://localhost:3001'

const getAllImages = async () => {
  const updateUrl = baseUrl + `/images`
  const request = await axios.get(updateUrl)
  return request.data
}

const makeImageLink = (id) => {
  const updateUrl = serverUrl + baseUrl + `/images/${id}`
  return updateUrl
}

const getAllItems = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const createAd = async (newObj) => {
  const response = await axios.post(baseUrl, newObj, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
})
  return response.data
}

const adsService = {
  getAllImages,
  makeImageLink,
  getAllItems,
  createAd
}

export default adsService