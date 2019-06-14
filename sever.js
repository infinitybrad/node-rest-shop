const http = require('http');
const express = require('express');
const app  =  express();
const morgan = require('morgan');


const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');

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

