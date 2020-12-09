const service = require('../service/user.service')

class UserController {
  async create(ctx, context) {
    // 獲取用戶請求傳遞的參數
    const user = ctx.request.body;

    // 查詢數據庫
    const result = await service.create(user)
    console.log(result)

    // 返回數據
    ctx.body = result
  }
}

module.exports = new UserController()