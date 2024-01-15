const express=require('express')
const authController=require('../controllers/authController')
const authMiddleware=require('../middlewares/authMiddleware')
const authmiddleware = require('../middlewares/authMiddleware')



const router=express.Router()

router.route('/signup').post(authController.createUser)
router.route('/login').post(authController.loginUser)
router.route('/logout').get(authController.logoutUser)
router.route('/dashboard').get(authmiddleware,authController.getDashboardPage)

module.exports=router