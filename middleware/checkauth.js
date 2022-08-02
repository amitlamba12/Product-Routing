const jwt=require('jsonwebtoken')
module.exports=(req,res,next)=>{
 try{
    const token=req.headers.authorization
    const decoded= jwt.verify(token,"MySecretKey")
    req.userdata=decoded
    next()
 }
 catch(error){
    return res.status(401).json({
        message:'Auth Failed'
    })
 }
}