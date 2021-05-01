require('dotenv').config()
const mongoose = require('mongoose')
const Product = require('../models/Product')

describe('ProductController Functions', () => {
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

    test('Get Products', async () => {
        const data = await index()
        expect(data.error).toBeUndefined()
    })

    test('Create Product', async () => {
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

async function index() {
    try {
        const products = await Product.find()
        return products
    } catch(err) {
       return {error: err.message}
    }
} 

// Helpful article https://zellwk.com/blog/jest-and-mongoose/ https://www.youtube.com/watch?v=ACzMbQEq_tw&ab_channel=FredrikChristenson