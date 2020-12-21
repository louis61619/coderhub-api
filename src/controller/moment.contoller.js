const fs = require('fs')

const fileService = require('../service/file.service')
const momentService = require('../service/moment.service')
const { PICTURE_PATH } = require('../constents/file-path')

class MomentConroller {
  async create(ctx, next) {
    // 1.獲取數據(user_id, content)
    const userId = ctx.user.id
    const content = ctx.request.body.content

    console.log(userId, content)
    // 2.將數據插入到數據庫
    const result = await momentService.create(userId, content)

    ctx.body = result
  }

  async detail(ctx, next) {
    // 1.獲取動態ID
    const momentId = ctx.params.momentId;

    // 2.通過資料庫查詢ID
    const result = await momentService.getMomentById(momentId)

    ctx.body = result
  }

  async list(ctx, next) {
    const {offset, size} = ctx.query

    // 2.通過資料庫查詢ID
    const result = await momentService.getMomentList(offset, size)

    ctx.body = result
  }

  async update(ctx, next) {
    const { momentId } = ctx.params
    const { content } = ctx.request.body

    const result = await momentService.update(content, momentId)

    ctx.body = result
  }

  async remove(ctx, next) {
    const { momentId } = ctx.params

    const result = await momentService.remove(momentId)

    ctx.body = result
  }

  async addLabels(ctx, next) {

    // 1.獲取標籤和動態id
    const {labels} = ctx
    const {momentId} = ctx.params
    
    // 2.添加所有的標籤
    for(let label of labels) {
      //2.判斷該動態是否有過該標籤
      const isExists = await momentService.hasLabel(momentId, label.id)
      if(!isExists) {
        await momentService.addLabel(momentId, label.id)
      }
    }
    ctx.body = "給動態添加標籤成功"
  }

  async fileInfo(ctx, next) {
    let { filename } = ctx.params
    const fileInfo = await fileService.getFileByname(filename)
    const { type } = ctx.query
    const types = ["small", "middle", "large"]

    if(types.some(item => item === type)) {
      filename = filename + '-' + type
    }

    ctx.response.set('content-type', fileInfo.mimetype)
    ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`)
  }
}

module.exports = new MomentConroller()