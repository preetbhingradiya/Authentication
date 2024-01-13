const jwt=require('jsonwebtoken')
const User = require('../model/user.model')
const Auth=(req,res,next)=>{
    let {username,email,password}=req.body

    if(username && email && password){
        next()
    }
    else{
        res.status(400).json({success:false,message:"All filed are required"})
    }
}

const Verify=(req,res,next)=>{
    let {token}=req.cookies
    if(token){
        jwt.verify(token,"segeehtrtef")
        next()
    }
    else{
        res.status(400).json({success:false,message:"Plase Login first"})
    }
}

module.exports={Auth,Verify}