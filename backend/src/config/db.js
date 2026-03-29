const express = require("express")
const mongoose = require("mongoose")


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB Connected Successfully")
    } catch (error) {
        console.log("Error connecting to mongoDB ",error)
        process.exit(1) // exit with failure
    }
}

module.exports=connectDB