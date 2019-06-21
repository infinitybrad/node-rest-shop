const express =require('express');
const router = express.Router();
const mongoose = require("mongoose");

const productModel = require("../models/product");

// data get
router.get('/',(req,res)=> {

    productModel
        .find()
        .exec()
        .then(docs =>{
            const response = {
                count:docs.length,
                products:docs.map(doc =>{
                    return {
                        name:doc.name,
                        price:doc.price,
                        _id:doc._id,
                        request:{
                            type:"GET",
                            url:"http://localhost:3000/products/"+doc._id
                        }
                    }
                })
                
            }
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                err:err
            });
        });

    // res.status(200).json({
    //     msg:'sucesss get products'
    // });

});

//detail data get
router.get('/:productID',(req,res) => {
    const id = req.params.productID;
    productModel
        .findById(id)
        .exec()
        .then(doc => {
            console.log("from database",doc);
            if(doc)
            {
                res.status(200).json({
                    product :doc,
                    request:{
                        type:"GET",
                        url:"http://localhost:3000/products"
                    }
                });
            }else{
                res.status(400).json({
                    msg:"no id "
                });

            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                err:err
            });
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
                createdProduct: result,
                request:{
                    type:"GET",
                    url:"http://localhost:3000/products/"
                }
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
router.patch('/:productID',(req,res)=>{

    const id = req.params.productID;
    
    const updateOps = {};

    for(const ops of req.body){
        updateOps[ops.proName] = ops.value;
    }

    productModel
        .update({_id:id},{$set:updateOps})
        .exec()
        .then(result =>{
            console.log(result);
            res.status(200).json({
                msg:"product updated",
                request:{
                    type:"GET",
                    url:"http://localhost:3000/products/"+id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                err:err
            });

        });

    // res.status(200).json({
    //     msg:'modify product'
    // });`
});

// data delete
router.delete('/:productID',(req,res)=>{

    const id  = req.params.productID;

    productModel
        .remove({_id:id})
        .exec()
        .then(result =>{
            res.status(200).json({
                msg:'product deleted',
                request:{
                    type:'POST',
                    url:'http://localhost:3000/products',
                    body:{name:'String',price:'String'}
                }
            });
        
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                err:err
            });
        });

    // res.status(200).json({
    //     msg:'delete product'
    // });
});



module.exports = router;