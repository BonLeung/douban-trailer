const Koa = require('koa')
const views = require('koa-views')
const mongoose = require('mongoose')
const { resolve } = require('path')
const { connect, initSchemas, initAdmin } = require('./database/init')
const router = require('./routes')

;(async () => {
  await connect()

  initSchemas()

  await initAdmin()

  // require('./tasks/movie')
  // require('./tasks/api')
  // require('./tasks/trailer')
  // require('./tasks/qiniu')

})()

const app = new Koa()

app
  .use(router.routes())
  .use(router.allowedMethods())

app.use(views(resolve(__dirname, './views'), {
  extension: 'pug'
}))

app.listen(9000, () => {
  console.log('app is running at localhost:9000')
})
