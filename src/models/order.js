const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    ISBN: {
        type: Number,
        required: true,
        unique: true,
        validate(val) {
            if (val < 0 || val.toString().length !== 10) {
                throw new Error("Please! \"ISBN\" must be of length 10 and a positive number")
            }
        }
    },
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    price: {
        type: Number,
        required: true,
        validate(val) {
            if (val < 0) {
                throw new Error("Please! \"price\" must be a positive number")
            }
        }
    }
}, {
    timestamps: true
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order