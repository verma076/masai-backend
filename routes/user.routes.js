const express = require("express");
const bcrypt=require("bcrypt");
const {UserModel}=require("../model/user.model");
const jwt=require("jsonwebtoken");

const userRouter=express.Router();

userRouter.post("/register",async(req,res)=>{
   const {name,email,password,isAdmin}= req.body
   try {
    bcrypt.hash(password,5,async(err,hash)=>{
        const user= new UserModel({name,email,password:hash,isAdmin})
        await user.save()
        res.status(201).send({"msg":"A new user has been registered"})
    })
   } catch (error) {
    res.status(400).send({"error":error})
   }
})

userRouter.post("/login",async(req,res)=>{
  const {email,password}=req.body
const user=await UserModel.findOne({email})
try {
    bcrypt.compare(password,user.password,async(err,result)=>{
        if(result){
            const token=jwt.sign({userID:user._id,username:user.name},"mock",{ expiresIn: "7d" })
            res.status(201).send({"msg":"Login Succesfully","token":token})
        }
        else{
            res.status(201).send({"msg":"wrong details"})
        }
    })
} catch (error) {
    res.status(400).send({"error":error})
}
})

module.exports={
    userRouter
}

