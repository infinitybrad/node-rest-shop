const express =require('express');
const router = express.Router();

const orderController = require("../controller/order");
const checkAuth = require("../middleware/check-auth");


// data get
router.get('/',checkAuth,orderController.orders_get_all);

//get detail data
router.get('/:orderID',checkAuth,orderController.orders_get_detail);

// data create
router.post('/',checkAuth,orderController.orders_post_order);

// data patch
router.patch('/',(req,res)=>{
    res.status(200).json({
        msg:'modify orders'
    });
});

// detail data delete
router.delete('/:orderID',checkAuth,orderController.orders_delete_order);


module.exports = router;