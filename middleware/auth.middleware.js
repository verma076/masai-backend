const jwt = require("jsonwebtoken")

const auth = (req,res,next)=>{
const token = req.headers.authorization

if(token){
   
    jwt.verify(token,"mock",(err,decoded)=>{
        if(decoded){

        req.body.userID=decoded.userID

        req.body.name=decoded.name

            next()
           
        }else{
            res.send({"error":err})
        }

    })

}else
{
    res.send({"msg":"You are not authorised"})
}
}
module.exports={
    auth
}