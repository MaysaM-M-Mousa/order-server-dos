const express = require('express')
const request = require('request')

const Order = require('../models/order')
const checkBook = require('../utils/checkbook')
const purchaseBook = require('../utils/purchasebook')

const orderRouter = express.Router()

orderRouter.post('/purchase/:ISBN', async (req, res) => {

    try {
        const { ISBN, name, price, count } = await checkBook(req.params.ISBN)

        if (count < 1) {
            return res.status(200).send({ msg: name + " is out of stock" })
        }

        const purchaseResponse = await purchaseBook(ISBN, { price, count: count - 1 })

        if (purchaseResponse !== 'success') {
            return res.status(500).send()
        }

        const order = new Order({ ISBN, name, price })
        const { name: order_name, price: price_name } = await order.save()

        res.status(200).send(order_name + " has been purchased with " + price_name + "$")
    } catch (e) {
        return res.status(404).send()
    }

})

orderRouter.get('/history', async (req, res) => {
    const allOrders = await Order.find({})
    res.status(200).send(allOrders)
})

module.exports = orderRouter