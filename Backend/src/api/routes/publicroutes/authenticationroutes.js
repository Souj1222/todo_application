const express = require('express')
const router = express.Router()
const todocontroller = require('../../controllers/todocontroller')




//declare the auth endpints related to authentication or the user login and registration

router.post('/register', todocontroller.register) //user registration route
router.post('/login', todocontroller.login) //user login route



module.exports = router