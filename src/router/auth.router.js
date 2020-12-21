const Router = require('koa-router')

const authRouter = new Router()

const {
  success,
  login
} = require('../controller/auth.controller.js')
const {
  verifyLogin,
  verifyAuth
} = require('../middleware/auth.middleware')

authRouter.post('/login', verifyLogin, login)
authRouter.get('/test', verifyAuth, success)

module.exports = authRouter