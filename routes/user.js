const express = require('express')
const router = express.Router()

const { createUser, removeUser, removeListUser, updateUser, getUserLists } = require('../controllers/user')

//----------------------------------------------------
router.get('/users', getUserLists)
router.post('/user', createUser)
router.patch('/user/:id', updateUser)
router.delete('/user/:id', removeUser)
router.post('/users/delete', removeListUser)

// {"ids":["640000199407072648","340000198805178530"]} for delete input in body

//----------------------------------------------------
module.exports = router