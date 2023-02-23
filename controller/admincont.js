const bcrypt=require('bcryptjs')
const adminModel=require('../model/admin')
const jwt=require('jsonwebtoken')

const Adminlogin=(req,res)=>{
    loginData = {}
        loginData.email = (req.cookies.email) ? req.cookies.email : undefined
        loginData.password = (req.cookies.password) ? req.cookies.password : undefined
        res.render('./admin/Adminlogin',{
            message: req.flash('message'),
           
            data:loginData
        })
    }
    
const Admindashboard=(req,res)=>{
    if (req.user) {
    adminModel.find({},function(err,userdetail){
        if (!err) {
           res.render('./admin/Admindashboard',{
            data:req.user,
            
           }) 
        } else {
            
            console.log(err);
        }
    })
}
}

const admin_create=(req,res)=>{
    adminModel.findOne({
        email:req.body.email
    }).exec((err,data)=>{
        if(data){
        const hashpassword=data.password
        if(bcrypt.compareSync(req.body.password,hashpassword)){
            const token=jwt.sign({
                id:data._id,
                name:data.name
            },"Arka@87654321",{expiresIn:"5h"})
            res.cookie('adminToken',token)
            if(req.body.adminrememberme){
                res.cookie('email',req.body.email)
                res.cookie('password',req.body.password)
            }
            
            res.redirect('/admin/dashboard')
        }else{
            req.flash("message","Invalid password")
            res.redirect('/admin/login')
        }
    }else{
        req.flash("message","Invalid email")
        res.redirect('/admin/login')
    }
    })
    }

    adminauth=(req,res,next)=>{
        if(req.user){
            console.log(req.user);
            next()
        }else{
            req.flash('message','Login first')
            res.redirect('/admin/login')
        }
    }
    const adminlogout=(req,res)=>{
        res.clearCookie('adminToken')
        res.redirect('/admin/login')
    }
   

    module.exports={admin_create,Adminlogin,
        Admindashboard,adminauth,
        Admindashboard,adminlogout
        }