const jwt=require('jsonwebtoken')
require("dotenv").config()
const checkToken=(req,res,next)=>{
//get token from req obj header
let tokenWithBearer=req.headers.authorization;
let token=undefined;
if(tokenWithBearer===undefined){
    return res.send({message:"Unauthorized access"})
}
//existed,verify
else{
    token=tokenWithBearer.split(" ")[1];
    jwt.verify(token,process.env.SECRET,(err,decoded)=>{
if(err){
    return res.send({message:"Session Expired....login to continue"})
}else{
    next()
}
    })
}
}


module.exports=checkToken;