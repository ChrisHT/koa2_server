const Koa = require('koa')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const koaRouter = require('koa-router')
//const session = require('koa-session')
const oauth = require('./routes/oauth')
const qrcode = require('./routes/qrcode')
const config = require('./config/config')

const router = new koaRouter()

const app = new Koa()

//初始化配置
require('./config/init')(app,mongoose)

app.use(bodyParser())

//app.keys = [config.cookieSecret]
//app.use(session(app))

router.use('/api',qrcode.routes())
router.use('/user',oauth.routes())
app.use(router.routes())

//错误处理
app.on('error',function(err,ctx){
  if(process.env.NODE_ENV != 'production'){
    ctx.body = '500 server error'
    console.error(err.message)
    console.error(err)
  }
})

//启动koa
app.listen(config.PORT)
console.log(`Koa server listen at port ${config.PORT}`)
