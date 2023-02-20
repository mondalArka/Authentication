let userModel=require('../model/user')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const home=(req,res)=>{
    res.render('home',{
        data:userModel.find()
    })
}

const dashboard=(req,res)=>{
    if (req.user) {
    userModel.find({},function(err,userdetail){
        if (!err) {
           res.render('dashboard',{
            data:req.user,
            details:userdetail
           }) 
        } else {
            
            console.log(err);
        }
    })
}
}



const register=(req,res)=>{
    res.render('register',{
        message:req.flash('message'),
        message1:req.flash('message1'),
        data:userModel.find(),
        
    })
    console.log(data);
}

const registration=(req,res)=>{
    const data= new userModel({
        name:req.body.name,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10))
    })
    const datasave=data.save().then(result=>{
        req.flash('message1',"Registration successful")
        res.redirect('/register')
    })
}

const login_create=(req,res)=>{
userModel.findOne({
    email:req.body.email
}).exec((err,data)=>{
    if(data){
    const hashpassword=data.password
    if(bcrypt.compareSync(req.body.password,hashpassword)){
        const token=jwt.sign({
            id:data._id,
            name:data.name
        },"Arka@12345678",{expiresIn:"5s"})
        res.cookie('userToken',token)
        if(req.body.rememberme){
            res.cookie('email',req.body.email)
            res.cookie('password',req.body.password)
        }
        
        res.redirect('/dashboard')
    }else{
        req.flash("message","Invalid password")
        res.redirect('/login')
    }
}else{
    req.flash("message","Invalid email")
    res.redirect('/login')
}
})
}
authenticate=(req,res,next)=>{
if(req.user){
    console.log(req.user);
    next()

}else{
    req.flash("message","login first")
    res.redirect('/login')
}
}



    const login=(req,res)=>{
        loginData = {}
        loginData.email = (req.cookies.email) ? req.cookies.email : undefined
        loginData.password = (req.cookies.password) ? req.cookies.password : undefined
        res.render('login',{
            message: req.flash('message'),
           
            data:loginData
        })
    }
    
const logout=(req,res)=>{
    res.clearCookie("userToken")
    res.redirect('/login')
}
module.exports={
    register,
    login,
    registration,
    login_create,
    dashboard,
    authenticate,
    logout,
    home
}