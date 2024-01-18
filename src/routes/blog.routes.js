const express = require("express");

//Importing express router
const router = express.Router();

//Importing the blog controller 
const { create, update, get, show, deleteBlog} =  require("../controller/blog.controller");

//Importing the blog validation function from validation.middleware
const { blogSchema } = require("../middleware/validation.middleware");

//Importing the JWT verifyer from auth middleware 
const verifyToken = require("../middleware/auth.middleware")


router.post("/create", verifyToken,blogSchema, create)

//Route to update a specfic blog
router.put("/update/:id", verifyToken, blogSchema, update);

//route to get all blogs
router.get("/get",  get);

//route to get or show only a specfic blog
router.get("/show/:id", show);

//route to delete a specfic blog
router.delete("/delete/:id", verifyToken, deleteBlog); 

//Exporting the routes 
module.exports = router;