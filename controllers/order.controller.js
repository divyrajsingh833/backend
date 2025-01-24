const {orderModel, validateOrder} = require('../models/order.model');

module.exports.createOrder = async (req, res) => {
  try {
  const {liters} = req.body
  const userId = req.user.id
  const price = liters*298
  const error  = validateOrder({liters, price, userId})
  if (error) return res.status(400).send(error)
  
  const order = await orderModel.create({ liters, price, userId })

    res.status(201).send(order)
  } 
  catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

module.exports.getAllOrder = async (req, res) => {
  try {
    const orders = await orderModel.find().populate('userId')
    res.status(200).send(orders)
  }
   catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

module.exports.getLoggedInUserOrders = async (req, res) => {
  try {
   const userId =  req.user.id
    const orders = await orderModel.find({userId})
    if(!orders.length) return res.status(404).send("No orders found")

    res.status(200).send(orders)
  }
   catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}



module.exports.changeOrderStatus = async (req, res) => {
  try {
    
    const {status} = req.body
    console.log(status);
    
    const id = req.params.id
    const order = await orderModel.findByIdAndUpdate( id, {status : status}, { new: true })
    if(!order)return res.status(404).send("No order found with this order id")
      
    res.status(200).send(order)
  }
   catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

