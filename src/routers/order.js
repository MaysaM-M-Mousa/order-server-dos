const express = require('express')
const request = require('request')

const Order = require('../models/order')
const checkBook = require('../utils/checkbook')
const purchaseBook = require('../utils/purchasebook')

const orderRouter = express.Router()

orderRouter.post('/purchase/:name', async (req, res) => {

    try {
        const { name, price, count } = await checkBook(req.params.name)

        if (count < 1) {
            return res.status(200).send({ msg: name + " is out of stock" })
        }

        const purchaseResponse = await purchaseBook(name, { price, count: count - 1 })

        if (purchaseResponse !== 'success') {
            return res.status(500).send()
        }

        const order = new Order({ name, price })
        const { name: order_name, price: price_name } = await order.save()

        res.status(200).send(order_name + " has been purchased with " + price_name + "$")
    } catch (e) {
        return res.status(404).send()
    }

})

module.exports = orderRouter