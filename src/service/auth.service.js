const connection = require('../app/database')

class AusthService {
  async checkResource(tableName, momentId, userId) {
    const statement = `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?;`
    const [result] = await connection.execute(statement, [momentId, userId])
    console.log(result)
    return result.length === 0 ? false: true
  }
}

module.exports = new AusthService()