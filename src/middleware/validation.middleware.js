const validator = require("../utils/validate")
const blogSchema = async (req, res, next) => {
    const validateRule = {
        "title": "required|string", 
        "content": "required|string", 
    }

    await validator(req.body, validateRule, {}, (err, status) =>{
        if (!status){
            res.status(412)
            .send({
                success: false,
                    message: 'Validation failed',
                    data: err
            })
        
        } else {
            next();
        }
    }).catch(err => console.log(err))
}

module.exports = {
    blogSchema
}