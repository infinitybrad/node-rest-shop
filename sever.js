const http = require('http');
const express = require('express');
const app  =  express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose =require('mongoose');


const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');

const db = 'mongodb+srv://teddy:1234@cluster0-4ahzv.mongodb.net/test?retryWrites=true&w=majority';



mongoose.connect(db, {useNewUrlParser:true})
    .then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(morgan('dev'));

app.use('/products',productRoutes);
app.use('/orders', ordersRoutes);

// app.use('/', (req,res) => {
//     res.status(200).json({
//         message:'It works'
//     });
// });


const PORT =3000;
const server = http.createServer(app);



server.listen(PORT, console.log(`sever started...`));

