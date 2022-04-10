const express = require('express')
require('dotenv').config()

const cors = require('cors')

const app = express()

const router = require("./src/routes")

const port = 5000

app.use(express.json())

// app.get("/",(req,res)=>{
//     res.send("hello alvin")
// })  

app.use(cors())
app.use("/api/v1",router)

app.use("/uploads",express.static("uploads"))
app.listen(port,()=>{console.log(`server listen on port ${port}`)})