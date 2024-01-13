const express = require('express');
const cors = require('cors');

const app = express();
// /use middleware to form our contracts for incoming requests, JSON payloads Only!!
app.use(express.json());
//use middleware to encode url
app.use(express.urlencoded({ extended:true}));
//use middleware to handle cors
app.use(cors());

app.get('/', (req,res,next) => {
    res.status(200).json({message: "Service is Running"});
});
//router Links

module.exports = app;

