const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let orderSchema = new Schema({
    orderId: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    
    orderTotal: {
        type: Number,
        required: true
    },
    cartItems: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
},
{
    timestamps: true,
}
);

module.exports = mongoose.model('Order', orderSchema);