const {
  create,
  update,
  getUsers,
  getUser,
  remove,
  removeList
} = require('../models/User.js')

const createUser = async (req, res) => {
  return await create(req, res);
}

const updateUser = async (req, res) => {
  return await update(req, res);
}

const getUserLists = async (req, res) => {
  return await getUsers(req, res);
}

const getOneUser = async (req, res) => {
  return await getUser(req, res);
}

const removeUser = async (req, res) => {
  return await remove(req, res)
}

const removeListUser = async (req, res) => {
  return await removeList(req, res);
}

module.exports = {
  createUser,
  updateUser,
  getUserLists,
  removeUser,
  removeListUser,
  getOneUser
}