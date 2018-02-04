const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const { resolve } = require('path')

app.use(views(resolve(__dirname, './views'), {
  extension: 'pug'
}))

app.use(async (ctx, next) => {
  await ctx.render('index', {
    you: 'Luke',
    me: 'BonLeung'
  })
})

app.listen(9000, () => {
  console.log('app is running at localhost:9000')
})