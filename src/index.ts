import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { UserModel,ContentModel } from "./db.js";
import { JWT_PASSWORD } from "./config.js";
import { userMiddleware } from "./middleware.js";

const app=express();

app.use(express.json());

app.post('/api/v1/signup',async (req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    try{
        await UserModel.create({
            username:username,
            password:password
        })
        res.json({
            message:"user signed up"
        })
    }catch(e){
        res.status(411).json({
            message:"user already exists"
        })
    }
    
})

app.post("/api/v1/signin",async (req, res) => {
    const username=req.body.username;
    const password=req.body.password;
    const existingUser=await UserModel.findOne({
        username,
        password
    })
    if(existingUser){
        const token =jwt.sign({
            id: existingUser._id
        },JWT_PASSWORD)
        res.json({
            token:token
        })
    }else{
        res.status(403).json({
            message:"Inncorrect credentials"
        })
    }
});

app.post("/api/v1/content",userMiddleware,async (req, res) => {
    const link=req.body.link;
    const type=req.body.type;

    // res.json({ message: "content endpoint" });

    await ContentModel.create({
        link,
        type,
        // title: req.body.title,
        //@ts-ignore
        userId: req.userId,
        tags: []
        
    })
    return res.json({
        message:"content added"
    })
});

app.get("/api/v1/content",userMiddleware,async (req, res) => {
    //@ts-ignore
    const userId=req.userId;
    const content=await ContentModel.find({
        userId:userId
    }).populate("userId","username")
    res.json({
        content
    })
});

app.delete("/api/v1/content",async (req, res) => {
    const contentId=req.body.contentId;
    await ContentModel.deleteMany({
        contentId,
        //@ts-ignore
        userId:req.userId
    })
    res.json({
        message:"Deleted"
    })
});

app.post("/api/v1/brain/share", (req, res) => {
    res.json({ message: "brain share endpoint" });
});

app.post("/api/v1/brain/:shareLink", (req, res) => {
    res.json({ message: "brain shareLink endpoint" });
});

app.listen(3000);