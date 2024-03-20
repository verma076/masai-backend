const mongoose = require("mongoose");

const orderSchema=mongoose.Schema({
    _id: ObjectId,
    user : { type: ObjectId, ref: 'User' },
    books : [{ type: ObjectId, ref: 'Book' }],
    totalAmount: Number
},{
    versionKey:false
})

const OrderModel=mongoose.model("order",orderSchema);

module.exports={
    OrderModel
}