const Router = require('koa-router')

const momentRouter = new Router({prefix: '/moment'})

const {
  create,
  detail,
  list,
  update,
  remove,
  addLabels,
  fileInfo
} = require('../controller/moment.contoller.js')

const {
  verifyLabelExists
} = require('../middleware/label.middleware')

const {
  verifyAuth,
  verifyPermission
} = require('../middleware/auth.middleware')

momentRouter.post('/', verifyAuth, create)
momentRouter.get('/', list)
momentRouter.get('/:momentId', detail)

//1.用戶是否登入 2.用戶是否具備權限
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update)
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, remove)

// 給動態添加標籤
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission, verifyLabelExists, addLabels)

// 請求動態配圖
momentRouter.get('/images/:filename', fileInfo)

module.exports = momentRouter