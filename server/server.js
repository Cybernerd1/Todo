const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');

require("dotenv").config()

const authRoutes = require("./routes/auth");
const todoRoutes= require("./routes/todos");
const {authMiddleware} = require("./routes/auth");

const app= express();

app.use(cors());
app.use(express.json())

app.use("/api/auth",authRoutes);
app.use("api/todos",authMiddleware);

const PORT = process.env.PORT|| 5000;

mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("MongoDB connected");
        app.listen(PORT,()=>console.log(`Server running on ${PORT}`));
    })
    .catch((err)=>console.log(err));