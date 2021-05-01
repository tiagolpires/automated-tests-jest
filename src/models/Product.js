  
const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    categorie: {
        type: String,
        required: true
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Product', ProductSchema)