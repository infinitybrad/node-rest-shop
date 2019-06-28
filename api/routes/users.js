const express = require("express");
const router = express.Router();
const userController = require("../controller/user");




router.post('/signup',userController.user_register);

router.post('/login',userController.user_login);

module.exports = router;