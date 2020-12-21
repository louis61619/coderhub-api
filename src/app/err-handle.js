const errorTypes = require('../constents/error-types')

const errorHandle = (error, ctx) => {
  console.log(error.message)

  let status, message;

  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400; //錯誤請求
      message = "用戶名或者密碼不能為空"
      break
    case errorTypes.USER_ALREADY_IXISTS:
      status = 409; //錯誤請求 confilect
      message = "用戶名已經存在"
      break
    case errorTypes.USER_DOES_NOT_EXISTS:
      status = 400; //錯誤請求 confilect
      message = "用戶不存在"
      break
    case errorTypes.PASSWORD_IS_INCREMENT:
      status = 400; //錯誤請求 confilect
      message = "密碼不正確"
      break
    case errorTypes.UNAUTHORIZATION:
      status = 401;
      message = "無效的token~"
      break
    case errorTypes.UNPERMISSION:
      status = 401;
      message = "您不具備操作權限"
      break
    default:
      status = 404;
      message = "NOT FOUND"
  }

  ctx.status = status;
  ctx.body = message
}

module.exports = errorHandle

