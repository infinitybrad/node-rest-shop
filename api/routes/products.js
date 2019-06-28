const express =require('express');
const router = express.Router();

const checkAuth =  require("../middleware/check-auth");

const userController =  require("../controller/product");

// data get
// access public
router.get('/', userController.products_get_all);

//detail data get
router.get('/:productID', userController.products_get_product);

// data create
// access private
router.post('/', checkAuth, userController.products_create_product);

// data patch
router.patch('/:productID',checkAuth,userController.products_patch_product);

// data delete
router.delete('/:productID',checkAuth,userController.products_delete_product);



module.exports = router;