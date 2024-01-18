// Importing the development support form utils/development.js 
const { printConsole } = require("../utils/development");
//import dotenv
require('dotenv').config();
//Importing the mongoose library to make the mongodb connection
const mongoose = require("mongoose")

//Importing the mongodb atlas link 
const MONGO_DB_URI = process.env.MONGO_REMOTE_URL; 

//creating a function called connectToDB that handles the database connectio 
const connectToDB = async () => {
    try {
      printConsole(
        { data: "Connecting to MongoDB ......" },
        { printLocation: "db_config.js:11" },
        { textColor: "yellow" }
      );

      //creating the mongodb database connection by using MONOG_DB_URI
      const DBConnection = await mongoose.connect(MONGO_DB_URI);
  
      printConsole(
        
        { data: `Database Connected : ${DBConnection.connection.host}` },
        { printLocation: "db_config.js:21" },
        {
          textColor: "green",
        }
      );
    } catch (error) {
      printConsole(error);
  
      process.exit(1);
    }
  };

// EXPORTING THE connectToDB function 
module.exports = connectToDB;