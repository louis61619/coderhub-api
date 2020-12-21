const Router = require('koa-router')

const { 
  verifyAuth,
  verifyPermission
} = require('../middleware/auth.middleware')
const {
  create,
  reply,
  update,
  remove,
  list
} = require('../controller/comment.controller.js')

const commentRouter = new Router({prefix: '/comment'})

commentRouter.post('/', verifyAuth, create)
commentRouter.post('/:commentId/reply', verifyAuth, reply)

// 修改評論
commentRouter.patch('/:commentId', verifyAuth, verifyPermission, update)
// 刪除評論
commentRouter.delete('/:commentId', verifyAuth, verifyPermission, remove)

// 獲取評論列表
commentRouter.get('/', list)

module.exports = commentRouter