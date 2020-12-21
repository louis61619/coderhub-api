const jwt = require('jsonwebtoken')

const errorTypes = require('../constents/error-types')
const userService = require('../service/user.service')
const authService = require('../service/auth.service')
const md5password = require('../utils/password-handle')
const { PUBLIC_KEY } = require('../app/config')

const verifyLogin = async (ctx, next) => {
  // 1.獲取用戶名和密碼
  const { name, password } = ctx.request.body;

  // 2.判斷用戶名不能為空
  if(!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)

    return ctx.app.emit('error', error, ctx)//事件類型、參數、參數
  }
  
  // 3.判斷該用戶名有沒有被註冊過
  const result = await userService.getUserName(name)
  const user = result[0]
  // console.log(user)
  if(!user) { //如果有拿到回傳值
    const error = new Error(errorTypes.USER_DOES_NOT_EXISTS)

    return ctx.app.emit('error', error, ctx)//事件類型、參數、參數
  }

  // 4.判斷用戶密碼是否一致
  if(md5password(password) !== user.password) {
    const error = new Error(errorTypes.PASSWORD_IS_INCREMENT)

    return ctx.app.emit('error', error, ctx)
  }

  ctx.user = user
  await next();
}

const verifyAuth = async (ctx, next) => {
  console.log("驗證授權的middleware~")
  // 獲取token
  const authorization = ctx.headers.authorization;
  if(!authorization) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    return ctx.app.emit('error', error, ctx)
  }
  const token = authorization.replace('Bearer ', '')
  
  // 驗證token(id/name/)
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    })
    ctx.user = result
    await next()
  } catch (err) {
    const error = new Error(errorTypes.UNAUTHORIZATION);;
    ctx.app.emit('error', error, ctx)
  }
}

/**
 * 1. 很多的內容都需要權限管理
 * 2. 如果是後台管理系統
 * 多對多 不同權限能做不同操作
 */

// const verifyPermission = (tableName) => {
//   return async (ctx, next) => {
//     console.log('驗證權限的middleware~')
  
//     //1.獲取參數
//     const { momentId } = ctx.params;
//     const { id } = ctx.user;
  
//     //2.查詢是否具備權限
//     try {
//       const isPermission = await authService.checkResource(tableName, momentId, id)
//       if(!isPermission) throw new Error()
//     } catch (err) {
//       const error = new Error(errorTypes.UNPERMISSION)
//       return ctx.app.emit('error', error, ctx)
//     }
  
//     await next()
//   }
// }

const verifyPermission = async (ctx, next) => {
  console.log('驗證權限的middleware~')

  //1.獲取參數
  const [resourceKey] = Object.keys(ctx.params)
  const tableName = resourceKey.replace('Id', '')
  const resourceId = ctx.params[resourceKey]
  const { id } = ctx.user;

  //2.查詢是否具備權限
  try {
    const isPermission = await authService.checkResource(tableName, resourceId, id)
    if(!isPermission) throw new Error()
  } catch (err) {
    const error = new Error(errorTypes.UNPERMISSION)
    return ctx.app.emit('error', error, ctx)
  }

  await next()
}

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission
}