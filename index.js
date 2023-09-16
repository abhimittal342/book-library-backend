const express=require('express');
const bodyParser = require('body-parser');
const app=express();
const bookRouter=require('./book')
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())
app.use('/books',bookRouter)
app.get("/",(req,res)=>res.send("hii"))

app.listen(8000,()=>console.log("Server Listen at 8000 port"))