const jwt=require('jsonwebtoken')

exports.verified=(req,res,next)=>{
    if(req.cookies && req.cookies.userToken){
        jwt.verify(req.cookies.userToken,"Arka@12345678",(err,data)=>{
            console.log(err);
            req.user=data
            console.log(data);
            next()
        })
    }else{
        next()
    }
   
}