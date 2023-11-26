const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app =  require("./app");

app.use(express.json());

const node_env = process.env.NODE_ENV;
const mongo_url = process.env.MONGO_URI;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }



mongoose.connect(`${mongo_url}`,options).then(()=>{
    console.log("Connected to Database at", mongo_url)
}).catch(()=>{
    console.log("Failed to connect");
})

app.listen(`${node_env}`, ()=>{
    console.log("Listening on port", `${node_env}`);
})