
const connection = require('../app/database')

class UserService {
  async create(user) {
    const {name, password} = user

    const statement = `INSERT INTO users (name, password) VALUES(?, ?)`
    const result = await connection.execute(statement, [name, password]);
    // 將user儲存到數據庫中

    return result[0];
  }

  async getUserName(name) {
    const statement = `SELECT * FROM users WHERE name = ?;`
    const result = await connection.execute(statement, [name]);

    return result[0];
  }
}

module.exports = new UserService()