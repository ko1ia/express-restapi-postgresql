const Router = require('express')
const router = new Router()
const AuthController = require('../controller/auth.controller')

router.post('/login', AuthController.login)


module.exports = router