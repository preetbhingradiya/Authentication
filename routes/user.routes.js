const express=require('express')
const {Register, Login, Profile, ForgotPassword} = require('../controllers/user.controler')
const {Auth, Verify} = require('../middleware/Auth')

const user=express()

user.post('/register',Auth,Register)
user.post('/login',Login)
user.get('/my/:otp',Verify,Profile)
user.patch('/forgot/password',Verify,ForgotPassword)

module.exports=user