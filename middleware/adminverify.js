const jwt=require('jsonwebtoken')

exports.adminverified=(req,res,next)=>{
    if(req.cookies && req.cookies.adminToken){
        jwt.verify(req.cookies.adminToken,"Arka@87654321",(err,data)=>{
            console.log(err);
            req.user=data
            console.log(data);
            next()
        })
    }else{
        next()
    }
   
}