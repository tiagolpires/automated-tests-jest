require('dotenv').config()
const mongoose = require('mongoose')
const Product = require('../models/Product')

describe('productController functions', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.TEST_DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    })
    afterEach(async () => {
        await Product.deleteMany()
    })
    afterAll(async () => {
        await Product.drop()
        await mongoose.connection.close()
    })

    test('read function', async () => {
        const data = await read()
        expect(data.error).toBeUndefined()
    })

    test('store function', async () => {
        const body = {
            title: "wheel",
            categorie: "cars"
        }
        
        const data = await store(body)
        expect(data.title).toStrictEqual(body.title)
    })
}, 30000)


async function store(body) {
    try {
        const product = await Product.create(body)
        return product
    } catch(err) {
        return {err: err.message}
    }
}

async function read() {
    try {
        const products = await Product.find()
        return products
    } catch(err) {
       return {error: err.message}
    }
} 

// Helpful article https://zellwk.com/blog/jest-and-mongoose/ https://www.youtube.com/watch?v=ACzMbQEq_tw&ab_channel=FredrikChristenson