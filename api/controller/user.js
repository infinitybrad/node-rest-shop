const mongoose =require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userModel=  require("../models/user");


exports.user_register = (req,res)=>{

    bcrypt.hash(req.body.password, 10 ,(err,hash) =>{

        if(err){
            return res.status(500).json({
                error:err
            });
        }
        const user = new userModel({
            _id:new mongoose.Types.ObjectId(),
            username:req.body.username,
            email:req.body.email,
            password:hash
        });
        user
            .save()
            .then(result =>{
                res.status(200).json({
                    msg:"user created",
                    userinfo:result
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error:err
                });
            });
    })

    // const user = new userModel({
    //     _id:new mongoose.Types.ObjectId(),
    //     username:req.body.username,
    //     email:req.body.email,
    //     password:req.body.password
    // });
    // user
    //     .save()
    //     .then(result =>{
    //         res.status(200).json({
    //             msg:"user created",
    //             userinfo:result
    //         });
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         res.status(500).json({
    //             error:err
    //         });
    //     });


};

exports.user_login = (req,res)=>{

    userModel
        .find({email:req.body.email})
        .exec()
        .then(user => {
            if(user.length <1){
                return res.status(401).json({
                    msg: "no user acount"
                });
            }
            bcrypt.compare(req.body.password, user[0].password,(err,result) => {

                if(err){
                    return res.status(401).json({
                        msg: "password incorrect"
                    });
                }
                const token = jwt.sign({
                    email:user[0].email,
                    userId:user[0]._id
                },
                "secret",{ expiresIn:"1h" }
                );
                return res.status(200).json({
                    msg : "Auth successful",
                    tokenInfo : "bearer " + token
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });

};