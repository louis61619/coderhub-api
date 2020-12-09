const errorTypes = require('../constents/error-types')
const service = require('../service/user.service')

const verifyUser = async (ctx, next) => {
  // 1.獲取用戶名和密碼
  const { name, password } = ctx.request.body;

  // 2.判斷用戶名不能為空
  if(!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)

    return ctx.app.emit('error', error, ctx)//事件類型、參數、參數
  }

  // 3.判斷該用戶明有沒有被註冊過
  const result = await service.getUserName(name)
  console.log(result)
  if(result.length) { //如果有拿到回傳值
    const error = new Error(errorTypes.USER_ALREADY_IXISTS)

    return ctx.app.emit('error', error, ctx)//事件類型、參數、參數
  }

  await next();
}

module.exports = {
  verifyUser
}