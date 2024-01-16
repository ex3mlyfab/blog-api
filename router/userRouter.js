const express = require('express');
const router = express.Router();
//get all users
router.get('/',(req,res,next)=>{
    res.status(200).json({
        message: "Get successful "
    });
});

module.exports = router;