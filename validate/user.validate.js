module.exports.postCreate = function(req,res,next){
    
    let errors = [];

    let values = req.body

    if(!req.body.name){
        errors.push("Name is required")
    }

    if(!req.body.phone){
        errors.push("Phone is required")
    }

    if(errors.length){
        res.render('users/create',{
            errors: errors,
            values: values
        });
        return;
    }
    //truyen bien trong middleware
    res.local.success = true;
    next();
}