const Router = require('koa-router')

const {
  verifyAuth
} = require('../middleware/auth.middleware')

const {
  create,
  list
} = require('../controller/label.controller')

const labelRouter = new Router({prefix: '/label'});

labelRouter.post('/',verifyAuth, create)

// 獲取標籤
labelRouter.get('/list', list)

module.exports = labelRouter