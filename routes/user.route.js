const express = require('express')
const router = express.Router()
// const authentication = require('../middleware/authentication')
const {signup, login, logout} = require('../controllers/user.controller') 

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

module.exports = router