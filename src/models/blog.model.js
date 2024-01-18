//Importing Libraries
const mongoose = require("mongoose");

//using monoose to create the product schema
const blogSchema = mongoose.Schema({
    blogId:{
        type:String
    },
    title:{
        type:String,
        required: [true, 'Field Title is Required'] 
    },
    content:{
        type:String,
        required: [true, 'Field content is Required'] 
    },
    author_id:{
        type:String, 
    }
},
{ timestamps: true })

module.exports = mongoose.model('Blog', blogSchema);