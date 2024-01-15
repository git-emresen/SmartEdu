
module.exports= (req,res,next)=>{
    if(!(req.session.userID)){
        next()    
    }
    else{
        return res.redirect('/')
    }
    
}