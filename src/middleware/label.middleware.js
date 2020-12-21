const service = require('../service/label.service')

const verifyLabelExists = async (ctx, next) => {
  // 1.取出要添加的所有標籤
  const { labels } = ctx.request.body

  // 2.判斷每一個標籤在資料表中是否存在
  let newLabels = []
  for(let name of labels) {
    const labelResult = await service.getLabelByName(name);
    const label = {name}
    if(!labelResult) {
      // 創建標籤數據
      const result = await service.create(name)
      label.id = result.insertId
    } else {
      label.id = labelResult.id
    }
    newLabels.push(label)
  }
  ctx.labels = newLabels
  await next()
}

module.exports = {
  verifyLabelExists
}