const Login = require('../models/user')
const Item = require('../models/item')

const initialUser = [
  {
    email: "eins@test.ch",
    password: "test"
  },
  {
    email: "zwei@test.ch",
    password: "test"
  },
]

const initialItems = [
  {
    title: "test1",
    description: "description1",
    price: 10,
    offer: "biete"
  },
  {
    title: "test2",
    description: "description2",
    price: 20,
    offer: "biete"
  }
]

const ItemsInDB = async () => {
  const items = await Item.find({})
  return items.map(i => i.toJSON())
}

module.exports = {
  ItemsInDB,
  initialItems,
  initialUser
}