//Importing Libraries
const express = require("express")
require("dotenv").config()
const cors = require("cors") 
const path = require("path")


//Initalizing the express app
const app = express();
//Import the connectToDB function to the index.js file as it is the main entry to the project 
const connectToDB = require("./src/config/db_config");
//Importing the auth routes module
const auth = require("./src/routes/auth.routes");

//Importing the blog routes module
const blog = require("./src/routes/blog.routes");

//Adding express middlewares
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({ limit:"50mb", extended: true}));
app.use(cors());




app.use("/api/blog", blog)
//using the auth route 
app.use("/api/auth", auth)

//calling the function or running the function
connectToDB();
//Run Node APP
module.exports = app