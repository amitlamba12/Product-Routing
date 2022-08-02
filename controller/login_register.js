const User=require('../model/User')
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const register=(req,res)=>{
    User.find({email:req.body.email}).exec().then(user=>{
        if(user.length>=1){
            return res.status(409).json({message:'Mail Already Exists'})
        }
        else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                   return res.status(500).json({error:err})
                }
                else{
                    const user=new User({
                        _id:new mongoose.Types.ObjectId(),
                        email:req.body.email,
                        password:hash
                    })
    
                    user.save().then(result=>{
                        console.log(result)
                        res.status(201).json({message:'User Created',data:result})
                    })
                    .catch(err=>{
                        console.log(err)
                        res.status(500).json({error:err})
                    })
                }
            
            })            
        }
    })
}

const login=(req,res)=>{
    User.find({email:req.body.email}).exec().then(user=>{
        if(user.length<1){
            return res.status(401).json({message:'Auth Failed'})
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(err){
               return res.status(401).json({message:'Auth Failed'})
            }
            if(result){
                token= jwt.sign({
                    email:user[0].email,
                    user_id:user[0]._id
                },"MySecretKey",{
                    expiresIn:'1h'
                })
                
                return res.status(200).json({message:'Auth Successful',token:token,data:result})
             }
             res.status(401).json({message:'Auth Failed'})
        })
        }).catch(err=>{
            console.log(err)
            res.status(500).json({error:err})
        })
}

module.exports={register,login}