const { JSONResponse } = require('../lib/helper');
const Subscriber = require('../models/subscriber.model');

//ADD A NEW SUBSCRIBER "C"
exports.addNewSubscriber = async (req, res) => {
    try {
        const subscriber = await Subscriber.create(req.body);
        JSONResponse.success(res, 'Subscriber added Successfully.', subscriber, 201);
    } catch(error) {
        JSONResponse.error(res, "Failure Adding Subscriber to Database.", error, 500);
    }
};

//GET ALL SUBSCRIBERS "R"
exports.getAllSubscribers = async(req, res) => {
    try{
        const subscribers = await Subscriber.find();
        JSONResponse.success(res, 'Subscribers Retreived Successfully.', subscribers, 200);
    }
    catch (error) {
        JSONResponse.error(res, "Failure retreiving Subscribers from Database.", error, 500);
    }
};

//GET A Subscriber BY ID "R"
exports.getSubscriberById = async (req, res) => {
    try{
        const subscriber = await Subscriber.findById({_id: req.params.id});
        JSONResponse.success(res, "Subscriber retreived Successfully.", subscriber, 200 );
    } catch(error){
        JSONResponse.error(res, "Failure retreiving this Brand.", error, 500);
    }
};

//EDIT AND UPDATE A SUBSCRIBER "U"
exports.UpdateSubscriber = async (req, res) => {
    try{
        const subscriber = await Subscriber.findByIdAndUpdate({_id: req.params.id}, req.body);
        JSONResponse.success(res, "subscriber Updated successfully.", {subscriber, new: req.body}, 200);
    } catch(error){
        JSONResponse.error(res, "Failure Updating this subscriber.", error, 500);
    }
};

//DELETE A SUBSCRIBER "D"
exports.deleteSubscriber = async (req, res) => {
    try{
        const subscriber = await Subscriber.findByIdAndRemove({_id: req.params.id});
        JSONResponse.success(res, "Subxscriber successfully Deleted.", subscriber, 204);
    } catch(error){
        JSONResponse.error(res, "Error Deleting this Subxscriber.", error, 500);
    }
}