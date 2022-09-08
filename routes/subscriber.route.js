const express = require('express');
const router = express.Router();
const {
    addNewSubscriber,
    getAllSubscribers,
    getSubscriberById,
    UpdateSubscriber,
    deleteSubscriber
} = require('../controllers/subscriber.controller');

router.route('/')
.get(getAllSubscribers)
.post(addNewSubscriber);

router.route('/:id')
.get(getSubscriberById)
.patch(UpdateSubscriber)
.delete(deleteSubscriber);

module.exports = router;