import axios from 'axios'
const baseUrl = '/api/items'

const getAllImages = async () => {
  const updateUrl = baseUrl + `/images`
  const request = await axios.get(updateUrl)
  return request.data
}

const makeImageLinkes = async (id) => {
  const updateUrl = baseUrl + `/images/${id}`
  console.log(updateUrl)
  const request = await axios.get(updateUrl)
  return request.data
}

const adsService = {
  getAllImages,
  makeImageLinkes
}

export default adsService