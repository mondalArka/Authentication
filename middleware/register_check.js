const user=require('../model/user')

exports.check_duplicate=(req,res,next)=>{
    user.findOne({
        name:req.body.name
    }).exec((err,data)=>{
        if(data){
            console.log(err)
            req.flash('message','Name already exist')
            return res.redirect('/')
        }
        user.findOne({
            email:req.body.email
        }).exec((err,data)=>{
            if(data){
                req.flash('message','Email already exist')
                return res.redirect('/')
            }
            const password=req.body.password
            const confirm =req.body.confirm

            if(password!=confirm){
                req.flash('message','Password and Confirm password did not match')
                return res.redirect('/')
            }
            next()
        })
    })
}