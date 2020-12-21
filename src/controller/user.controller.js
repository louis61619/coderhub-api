const fs = require('fs')


const userService = require('../service/user.service')

const fileService = require('../service/file.service')
const { AVATAR_PATH } = require('../constents/file-path')


class UserController {
  async create(ctx, context) {
    // 獲取用戶請求傳遞的參數
    const user = ctx.request.body;

    // 查詢數據庫
    const result = await userService .create(user)
    console.log(result)

    // 返回數據
    ctx.body = result
  }

  async avatarInfo(ctx, next) {
    const {userId} = ctx.params
    const avatarInfo = await fileService.getAvatarByUserId(userId)

    // 提供頭像 設置header
    ctx.response.set('content-type', avatarInfo.mimetype)
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`)
  }
}

module.exports = new UserController()