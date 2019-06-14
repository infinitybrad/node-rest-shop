const express =require('express');
const router = express.Router();
const mongoose = require("mongoose");

const productModel = require("../models/product");

// data get
router.get('/',(req,res)=> {
    res.status(200).json({
        msg:'sucesss get products'
    });

});

// data create
router.post('/', (req, res) => {

    const product = new productModel({
        _id:new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price

    });

    product
        .save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                msg:'suceess post ',
                createdProduct:result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });


    // res.status(201).json({
    //     msg: 'create product',
    //     productInfo: product
    // });
});

// data patch
router.patch('/',(req,res)=>{
    res.status(200).json({
        msg:'modify product'
    });
});

// data delete
router.delete('/',(req,res)=>{
    res.status(200).json({
        msg:'delete product'
    });
});



module.exports = router;