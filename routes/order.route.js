const express = require('express');
const router = express.Router();
const { createOrder, getAllOrder,changeOrderStatus, getLoggedInUserOrders } = require('../controllers/order.controller');
const authtication = require('../Middlewares/authentication')
const checkOwner = require('../Middlewares/checkOwner')

router.post('/',authtication, createOrder);
router.get('/', checkOwner, getAllOrder);
router.get('/loggedinuser', authtication, getLoggedInUserOrders );
router.patch('/status/:id', checkOwner, changeOrderStatus);

module.exports = router;
