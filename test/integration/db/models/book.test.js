/* eslint-env mocha */
process.env.NODE_ENV = 'test'

const chalk = require('chalk')
const { assert } = require('chai')
const log = require('winston')

const {
    getAll,
    getById,
} = require('../../../../src/db/dao/book')

describe('Integration - Db', () => {
    log.info(chalk.bold.magenta('Start tests'))
    describe('getAll books', async () => {
        it('should return valid books', async () => {
            const books = (await getAll())
            assert.isArray(books)
            console.dir(books)
            assert.property(books[0], 'id')
        })
    })
    describe('getById book', async () => {
        it('should return valid book with valid id', async () => {
            const id = 30
            const book = (await getById(id))
            assert.isObject(book)
            console.dir(book)
            assert.property(book, 'id')
        })
    })
})
