const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const errorHandler = require('./err-handle')
const useRoutes = require('../router')

const app = new Koa()

app.useRoutes = useRoutes

app.use(bodyParser())
// useRoutes(app)
app.useRoutes() //this 隱式綁定
app.on('error', errorHandler)

module.exports = app