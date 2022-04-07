const express = require('express')
require('dotenv').config()

const app = express()

const router = require("./src/routes")

const port = 5000

app.use(express.json())

// app.get("/",(req,res)=>{
//     res.send("hello alvin")
// })  

app.use("/api/v1",router)

app.listen(port,()=>{console.log(`server listen on port ${port}`)})