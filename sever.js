const http = require('http');
const express = require('express');
const app  =  express();
const PORT =3000;

app.use('/', (req,res) => {
    res.status(200).json({
        message:'It works'
    });
});


const server = http.createServer(app);



server.listen(PORT, console.log(`sever started...`));

