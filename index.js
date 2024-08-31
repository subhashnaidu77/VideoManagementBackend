import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from "./routes/users.js"
import videoRoutes from "./routes/videos.js"
import commentRoutes from "./routes/comments.js"
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors"
const app = express()
// var cors = require("cors");
dotenv.config()
const connect  =()=>{
    mongoose.connect(process.env.MONGO).then(()=>{
        console.log("first connect to db")
    }).catch((err)=>{
        throw err;
    })

}
const port = process.env.PORT || 8800;
const corsOptions = {
    origin: 'https://frontend-ttvu.onrender.com', // Update to your actual frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use("/api/users",userRoutes);
app.use("/api/auth", authRoutes)
app.use("/api/videos",videoRoutes);
app.use("/api/comments",commentRoutes);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
      success: false,
      status,
      message,
    });
  });

app.listen(port, () => {
    connect()
    console.log("Connected to Server yes");
  });
