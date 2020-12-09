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
    default:
      status = 404;
      message = "NOTFOUND"
  }

  ctx.status = status;
  ctx.body = message
}

module.exports = errorHandle

