const express =require('express');
const router = express.Router();



// data get
router.get('/',(req,res)=> {
    res.status(200).json({
        msg:'sucesss get orders'
    });

});

// data create
router.post('/', (req,res) =>{
    res.status(200).json({
        msg: 'create orders'
    });
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