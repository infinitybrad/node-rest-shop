const mongoose = require("mongoose");

const userSchma = mongoose.Schema({

    _id:mongoose.Schema.Types.ObjectId,
    username:{
        type:String,
        required:true

    },
    email:{
        type:String,
        required:true,
        unique:true, //유일한 이메일인지 확인
        // 이메일 형식인지 확인 
        match: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ 

    },
    password:{
        type:String,
        required:true
    }

  
});

module.exports = mongoose.model("user",userSchma);