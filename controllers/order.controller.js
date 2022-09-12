const Orders = require('../models/order.model');
const { JSONResponse } = require('../lib/helper');


exports.getOrders = async(req, res) => {
    try {
        const orders = await Orders.find().populate('cartItems');
        JSONResponse.success(res, 'Orders Retreived Successfully.', orders, 200);
    } catch (err) {
        JSONResponse.error(res, "Failure retreiving Orders from Database.", error, 500);
    }
};

exports. getOrderById = async (req, res) => {
    try {
        const order = await Orders.findById({ _id: req.params.id }).populate('cartItems');
        JSONResponse.success(res, 'Order Retreived Successfully.', order, 200);
    } catch (error) {
        JSONResponse.error(res, "Failure retreiving Order from Database.", error, 500);
    }
};

exports.createOrder = async (req, res) => {
    try{
        const order = await Orders.create(req.body);
        JSONResponse.success(res, 'Order Created Successfully.', order, 200);
    } catch(error) {
        JSONResponse.error(res, "Failure adding Order to Database.", error, 500);
    }
};

exports.updateOrder = async (req, res) => {
    try{
        const order = await Orders.findByIdAndUpdate({_id: req.params.id}, req.body);
        JSONResponse.success(res, 'Order Updated Successfully.', order, 200);
    } catch(error){
        JSONResponse.error(res, "Failure saving order Update to Database.", error, 500);

    }
};


exports.deleteOrder = async (req, res) => {
    try{
        const order = await Orders.findByIdAndRemove({_id: req.params.id});
        JSONResponse.success(res, 'Order Deleted from Database.', order, 200);
    } catch(error){
        JSONResponse.error(res, "Failure deleting Order from Database.", error, 500);

    }
};