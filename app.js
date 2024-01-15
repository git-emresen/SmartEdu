const express = require('express')
const mongoose=require('mongoose')
const ejs=require('ejs')
const session=require('express-session')
const MongoStore=require('connect-mongo')
const controllers=require('./controllers/pageController')
const userRoute=require('./routes/userRoutes')
const pageRoute=require('./routes/pageRoutes')
const courseRoute=require('./routes/courseRoutes')
const categoryRoute=require('./routes/categoryRoutes')

const app=express()


mongoose.connect('mongodb://127.0.0.1:27017/smartedu-db')
  .then(() => console.log('Db Connected!'));

//global variable
global.userIN=null
//template engine
app.set("view engine","ejs")
//middlewares
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(session({
  secret: 'my-keyboard-cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/smartedu-db' })
}))

//routes
app.use('*',(req,res,next)=>{
  userIN=req.session.userID
  next()
})
app.use('/', pageRoute)
app.use('/courses',courseRoute)
app.use('/category',categoryRoute)
app.use('/users',userRoute)


const port=3000
app.listen(port,()=>{
 console.log(`the app is started running on port ${port}`)
})