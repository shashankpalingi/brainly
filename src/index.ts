import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { UserModel } from "./db.js";
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

app.post("/api/v1/signin", (req, res) => {
    res.json({ message: "signin endpoint" });
});

app.post("/api/v1/content", (req, res) => {
    res.json({ message: "content endpoint" });
});

app.get("/api/v1/content", (req, res) => {
    res.json({ message: "get content endpoint" });
});

app.delete("/api/v1/content", (req, res) => {
    res.json({ message: "delete content endpoint" });
});

app.post("/api/v1/brain/share", (req, res) => {
    res.json({ message: "brain share endpoint" });
});

app.post("/api/v1/brain/:shareLink", (req, res) => {
    res.json({ message: "brain shareLink endpoint" });
});

app.listen(3000);