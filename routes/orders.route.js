const express = require('express');
const router = express.Router();
const{
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
} = require('../controllers/order.controller');


router.route('/')
.get(getOrders)
.post(createOrder);

router.route('/:id')
.get(getOrderById)
.patch(updateOrder)
.delete(deleteOrder);

module.exports = router;