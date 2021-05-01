require('dotenv').config()
const app = require('../../app')
const superTest = require('supertest')
const request = superTest(app)
const mongoose = require('mongoose')
const Product = require('../models/Product')

test('App is a module', () => {
    expect(app).toBeDefined()
})

describe('Product Routes test', () => {
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

    test('Get products route', async () => {
        const response = await request.get('/api')
        expect(response.status).toBe(200)
    })

    test('post product', async() => {
        const response = await request.post('/api')
            .send({
                title: 'wheel',
                categorie: 'cars'
            })
        expect(response.status).toBe(200)
    })

    test('Fail if title is missing in post product', async() => {
        const response = await request.post('/api')
            .send({
                categorie: 'cars'
            })
        expect(response.status).toBe(400)
    })
    
    test('Fail if categorie is missing in post product', async() => {
        const response = await request.post('/api')
            .send({
                title: 'wheel',
            })
        expect(response.status).toBe(400)
    })
    
    test('returns 404', async () => {
        const response = await request.post('/fail')
        expect(response.status).toBe(404)
    })

}, 30000)