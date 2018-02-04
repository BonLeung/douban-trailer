const Koa = require('koa')
const serve = require('koa-static')
const { resolve } = require('path')

const app = new Koa()

app.use(serve(resolve(__dirname, './dist/')))

app.listen(9001, function(err) {
  if (!err) console.log('app is running at localhost:9001')
})
