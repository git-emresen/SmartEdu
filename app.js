const express = require('express')
const mongoose = require('mongoose')
const ejs = require('ejs')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const methodOverride = require('method-override')
const flash = require('connect-flash');
const controllers = require('./controllers/pageController')
const userRoute = require('./routes/userRoutes')
const pageRoute = require('./routes/pageRoutes')
const courseRoute = require('./routes/courseRoutes')
const categoryRoute = require('./routes/categoryRoutes')

const app = express()


mongoose.connect('mongodb+srv://mailemresen:<password>@cluster0.bdkg5t8.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('Db Connected!'));

//global variable
global.userIN = null
//template engine
app.set("view engine", "ejs")
//middlewares
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: 'my-keyboard-cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/smartedu-db' })
}))
app.use(flash())
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash()
  next()
})
app.use(methodOverride('_method', {
  methods: ['POST', 'GET']
}))

//routes
app.use('*', (req, res, next) => {
  userIN = req.session.userID
  next()
})
app.use('/', pageRoute)
app.use('/courses', courseRoute)
app.use('/categories', categoryRoute)
app.use('/users', userRoute)


const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`the app is started running on port ${port}`)
})