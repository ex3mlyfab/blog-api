const express = require('express');
const cors = require('cors');

const app = express();
// /use middleware to form our contracts for incoming requests, JSON payloads Only!!
app.use(express.json());
//use middleware to encode url
app.use(express.urlencoded({ extended:true}));
//use middleware to handle cors
app.use(cors());
//health point or actuator
app.get('/', (req,res,next) => {
    res.status(200).json({message: "Service is Running"});
});
//router Links

//bad url or error  handle method with middleware
app.use((req, res, next)=>{
    const error = new Error('Not Found');
    error.status= 400;
    next(error);
});
app.use((error, req, res, next)=>{
    res.status(error.status || 500).json({
        error:{
        message: error.message,
        status: error.status
    }})
});

module.exports = app;

