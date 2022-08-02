const express=require('express')
const mongoose=require('mongoose')
const url='mongodb://localhost/emp'
const app=express()
mongoose.connect(url,{useNewUrlParser:true})
const con=mongoose.connection
con.on('open',()=>{
    console.log('connected')
})
const http=require('http')
const app=require('./main')
const port=(process.env.PORT||3000);
const server=http.createServer(app)
server.listen(port)