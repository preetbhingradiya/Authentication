const express=require('express')
const connect = require('./config/db')
const user = require('./routes/user.routes')
const cookie=require('cookie-parser')

const app=express()

app.use(express.json())
app.use(cookie())

app.use('/api/user',user)

app.listen(7000,()=>{
    console.log("Searve is Running")
    connect()
})