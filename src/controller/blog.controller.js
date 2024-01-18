//Importing express-async-handler
const asyncHandler = require("express-async-handler"); 

/*
  =============================================================================
 NB:express-async-handler is Simple middleware for handling exceptions 
 inside of async express routes and passing them to your express error handlers.
  =============================================================================
*/
//Imporing file system library 
const fs = require("fs");
//Importing the blog model to the controller 
const blogModel = require("../models/blog.model");

//Importing the UUIDv4 Library
const { v4: uuidv4 } = require('uuid')

//Get all blogs async function 
const get = asyncHandler(async (req, res) => {

    let page;
    let perPage = 30;
    if(req.query.perPage){
        perPage = parseInt(req.query.perPage);
    }
    if(req.query.page){
        page = parseInt(req.query.page);
    }
    else{
        page = 1;
    }

    // define limit per page
    const limit = perPage;
    const skip = (page - 1) * limit;

    const content = req.query.tags; //trying to sort the get all post by tags
    const title = req.query.title //trying to sort the get all post by title

    try {
        let blog;
        if(content){// I am throwing a condition that if the request has a query of author in it
            blog = await blogModel.find({ content:{ $regex: `${content}`, $options: 'i' }}).skip(skip).limit(limit);// every request has a value(like this /?author:john) which we will have to find the post made by the author: john
        }
        else if(title){
            blog = await blogModel.find({title:{ $regex: `${content}`, $options: 'i' }}.skip(skip).limit(limit)); // the curly braces in the bracket indicates that it's an object
        }
       else{ 
         blog = await blogModel.find({}).skip(skip).limit(limit);
        }
    //     blog.read_count += 1
    //    await blog.save()
   

    //Responding the data to any request made
    return res.status(200).json({
        success: true,
        data: blog
    })
    }catch(err){
        res.status(500).json(err)
    }
   
}
);

//Get Single blog
const show = asyncHandler(async (req, res) => {
    //Destructing id from req.params
    const { id } = req.params

    //Fetching single blog using the id in the req.params from the database and assigning it to blog
    const blog = await blogModel.find({ blogId: id });

    try {
        if (blog) {

            //Responding the data to any request made
            return res.status(200).json({
                success: true,
                data: blog
            })
        }
    } catch (error) {
        return res.status(412).send({
            success: false,
            message: error.message
        })
    }
}
);

const create = asyncHandler(async (req, res) => {
    //Destruct the data sent from req.body 
    const { title, content} = req.body

   

    try {

        if (req.method === 'POST') {

        
            //we use uuidv4 to generate a random and unique id for the blogs
            const blogId = uuidv4();
            const author_id= req.user.userId;

            //creating the blog
            const blog = await new blogModel({
                blogId: blogId,
                title: title,
                content: content,
                author_id: author_id               
            })

            blog.save()
            return res.status(201).json({
                success: true,
                message: "blog created sucessfully",
                data: blog
            })
        } else {
            return res.status(405).json({
                err: `${req.method} method not allowed`
            })
        }

    } catch (error) {
        return res.status(412).json({
            success: false,
            message: error
        })
    }

});

const update = asyncHandler(async (req, res) => {

    //Destructing the id from req.params
    const { id } = req.params
    //assigning the specfic blog to variable called blog
    const blog = await blogModel.findOne({ blogId: id });

    console.log("id", id)
    if (req.method !== 'PUT') {
        return res.status(405).json({
            err: `${req.method} method not allowed`
        })
    }

    try {

        if (!blog) {
            return res.status(400).json({
                success: false,
                message: "blog not found",
            })
        }

        blog.updateOne(req.body, { useFindAndModify: false }).then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update blog with id=${id}. Maybe blog was not found!`
                });
            } else return res.status(201).json({ message: "blog was updated successfully.", data: req.body });
        })

    } catch (error) {
        return res.status(412).send({
            success: false,
            message: error.message
        })
    }
});

//Delete a single blog
const deleteBlog = asyncHandler(async (req, res) => {
    //Destructing id from req.params
    const { id } = req.params

    try {

        //Fetching single blog using the id in the req.params from the database and assigning it to blog
        await blogModel.deleteOne({ blogId: id });

        //Since there is no data to be responde we simple send a message
        return res.status(410).json({
            success: true,
            message: "blog deleted sucessfully",
        })

    } catch (error) {
        return res.status(412).send({
            success: false,
            message: error.message
        })
    }

})



module.exports = {
    get,
    show,
    create,
    update,
    deleteBlog,
}