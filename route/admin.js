const express=require('express')
const route=express.Router()
const Admincont=require('../controller/admincont')


route.get('/admin/login',Admincont.Adminlogin)
route.post('/adminlogin_create',Admincont.admin_create)
route.get('/admin/logout',Admincont.adminlogout)
// route.get('/admin/register',Admincont.Adminregister)
// route.post('/admin/registration',Admincont.Adminregistration)
route.get('/admin/dashboard',Admincont.adminauth,Admincont.Admindashboard)

module.exports=route