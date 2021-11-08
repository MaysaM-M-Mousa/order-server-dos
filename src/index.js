const express = require('express')
require('./db/mongoose')
const orderRouter = require('./routers/order')

const app = express()
const PORT = 3001

app.use(express.json())
app.use(orderRouter)

app.listen(PORT, () => {
    console.log("Order server is running on PORT " + PORT)
})