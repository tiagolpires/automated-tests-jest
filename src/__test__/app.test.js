require('dotenv').config()
const app = require('../../app')
const superTest = require('supertest')
const request = superTest(app)
const mongoose = require('mongoose')
const Product = require('../models/Product')

test('app is a module', () => {
    expect(app).toBeDefined()
})

describe('product routes test', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.TEST2_DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        app.listen(3001)
    })
    afterEach(async () => {
        await Product.deleteMany()
    })
    afterAll(async () => {
        await Product.drop()
        await mongoose.connection.close()
    })

    test('get on products route', async () => {
        const response = await request.get('/api/products')
        expect(response.status).toBe(200)
    })

    test('post on products route', async() => {
        const response = await request.post('/api/products')
            .send({
                title: 'wheel',
                categorie: 'cars'
            })
        expect(response.status).toBe(200)
    })

    test('fail if title is missing in post request', async() => {
        const response = await request.post('/api/products')
            .send({
                categorie: 'cars'
            })
        expect(response.status).toBe(400)
    })
    
    test('fail if categorie is missing in post request', async() => {
        const response = await request.post('/api/products')
            .send({
                title: 'wheel',
            })
        expect(response.status).toBe(400)
    })
    
    test('returns 404 if route doesnt exist', async () => {
        const response = await request.post('/fail')
        expect(response.status).toBe(404)
    })
}, 30000)