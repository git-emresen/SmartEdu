const User=require('../models/User')

module.exports= (req,res,next)=>{
 if(!(req.session.userID)){
    return res.redirect('/login')
 }
 next()
}