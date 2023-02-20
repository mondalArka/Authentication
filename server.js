const express=require('express')
const ejs=require('ejs')
const mongoose=require('mongoose')
const cookie_parser=require('cookie-parser')
const flash=require('connect-flash')
const session=require('express-session')
const verify=require('./middleware/verify')


const app=express()



app.use(express.urlencoded({extended:true}))
app.use(flash())
app.use(session({
    cookie:{maxAge:6000},
    secret:"Arka",
    resave:false,
    saveUninitialized:false
}))
app.set('view engine','ejs')
app.set('views','views')
app.use(cookie_parser())

app.use(verify.verified)
const webroute=require('./route/web')
app.use(webroute)
let port=2345
const dbCon="mongodb+srv://Arka:rkAozOH726ywp06F@cluster0.zjvh01u.mongodb.net/home_authentication"
mongoose.connect(dbCon,({useNewUrlParser:true,useUnifiedTopology:true})).then(result=>{
    app.listen(port,()=>{
        console.log(`server started at http://localhost:${port}`);
    })  
}).catch(err=>{
    console.log(err);
})


