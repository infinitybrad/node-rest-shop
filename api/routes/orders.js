const express =require('express');
const router = express.Router();
const mongoose = require("mongoose");

const orderModel = require("../models/order");
const productModel = require("../models/product");

// data get
router.get('/',(req,res)=> { // 장바구니 전체 데이터 불러오기 


    orderModel
        .find()
        .exec()
        .then(docs => {
            res.status(200).json({
                count:docs.length,
                orderList:docs
            });
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error:err
            })
        });


    // res.status(200).json({
    //     msg:'sucesss get orders'
    // });

});

// data create
router.post('/', (req,res) =>{ // 장바구니에 제품 담기


    productModel
        .findById(req.body.productId)
        .then(product => {
            if(!product) // 제품 아이디 존재 여부 체크 
            {
                return res.status(404).json({
                    msg:"product not found"
                });
            }
            const order = new orderModel({
                _id:mongoose.Types.ObjectId(),
                product:req.body.productId,
                quantity: req.body.quantity
            });
            return order.save();
        })
        .then(result => {
            console.log(result);
            //화면에 결과값 출력
            res.status(200).json({
                msg:"order stored",
                createdOrder:{
                    _id:result._id,
                    product:result.product,
                    quantity:result.quantity
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            })
        });

    // res.status(200).json({
    //     msg: 'create orders'
    // });





});

// data patch
router.patch('/',(req,res)=>{
    res.status(200).json({
        msg:'modify orders'
    });
});

// data delete
router.delete('/',(req,res)=>{
    res.status(200).json({
        msg:'delete orders'
    });
});


module.exports = router;