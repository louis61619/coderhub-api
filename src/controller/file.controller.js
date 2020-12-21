const fileService = require('../service/file.service')
const userService = require('../service/user.service')
const { AVATAR_PATH } = require('../constents/file-path')
const {APP_HOST, APP_PORT} = require('../app/config')

class FileController {
  async saveAvatarInfo(ctx, next) {
    // 1.獲取圖像相關的信息
    const {filename, mimetype, size} = ctx.req.file
    const {id} = ctx.user

    // 2.將圖像信息保存到數據庫中
    const result = await fileService.createAvatar(filename, mimetype, size, id)

    // 3.將圖片地址保存到user表中
    const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`
    await userService.updateAvatarUrlById(avatarUrl, id)

    // 4.返回結果
    ctx.body = "上傳頭像成功"
  }

  async savePictureInfo(ctx, next) {
    // 1.拿到文件信息
    const files = ctx.req.files;
    const {id} = ctx.user;
    const {momentId} = ctx.query

    // 2.將所有文件信息保存到數據庫中
    for(let file of files) {
      const {filename, mimetype, size} = file
      await fileService.createFile(filename, mimetype, size, id, momentId)
    }

    ctx.body = "上傳圖片成功"
  }
}

module.exports = new FileController()