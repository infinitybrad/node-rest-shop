const mongoose = require("mongoose");
//장바구니 
const orderScheme = mongoose.Schema({

    _id:mongoose.Schema.ObjectId,
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product',
        require:true
    },
    quantity:{
        type:Number,
        default:1
    }

});


module.exports = mongoose.model("order",orderScheme);