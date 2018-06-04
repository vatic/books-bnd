const _ = require('koa-route')
const Koa = require('koa')

const {
    getAll,
    getById,
} = require('./src/db/dao/book')

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

const booksController = {
    list: async (ctx) => {
        const books = await getAll()
        ctx.type = 'application/json; charset=utf-8'
        ctx.body = books
    },

    show: async (ctx, id) => {
        const book = await getById(id)
        if (!book) return ctx.throw('cannot find that book', 404)
        ctx.type = 'application/json; charset=utf-8'
        ctx.body = book
    },
}

app.use(_.get('/books', booksController.list))
app.use(_.get('/books/:id', booksController.show))


app.listen(3000)
