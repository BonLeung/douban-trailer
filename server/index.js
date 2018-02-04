const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
    ctx.body = '电影首页'
})

app.listen(9000, () => {
    console.log('app is running at localhost:9000')
})