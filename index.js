const methods = require('methods')
const _ = require('koa-route')
const Koa = require('koa')

const app = new Koa()

// x-response-time

app.use(async (ctx, next) => {
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    ctx.set('X-Response-Time', `${ms}ms`)
})

// logger

app.use(async (ctx, next) => {
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}`)
})

const db = {
    tobi: { name: 'tobi', species: 'ferret' },
    loki: { name: 'loki', species: 'ferret' },
    jane: { name: 'jane', species: 'ferret' },
}

const pets = {
    list: (ctx) => {
        ctx.type = 'application/json; charset=utf-8'
        ctx.body = db
    },

    show: (ctx, name) => {
        const pet = db[name]
        if (!pet) return ctx.throw('cannot find that pet', 404)
        ctx.type = 'application/json; charset=utf-8'
        ctx.body = pet
    },
}

app.use(_.get('/pets', pets.list))
app.use(_.get('/pets/:name', pets.show))
app.use(_.get('/methods', methods))


app.use(async (ctx) => {
    ctx.type = 'application/json; charset=utf-8'
    ctx.body = { msg: 'Hello world' }
})

app.listen(3000)
