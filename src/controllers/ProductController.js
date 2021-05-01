const Product = require('../models/Product')

module.exports = {
    async index(req, res){
        try {
            const products = await Product.find()
            return res.status(200).json(products)
        } catch(err) {
            console.log(err.message)
            res.status(400).send({error: err.message})
        }
    },

    async store(req, res) {
        try {
            const product = await Product.create(req.body)
            res.status(200).json(product)   
        } catch(err) {
            res.status(400).json({error: err.message})
        }
    }
}