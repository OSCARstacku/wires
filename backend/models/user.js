'use strict'

const mongoose=require('mongoose');
const Schema=mongoose.Schema;

let UserSchema=Schema({
    nickname_signup:{type:String,required:true},
    fullname_signup:{type:String,required:true},
    email_signup:{type:String,required:true},
    password_signup:{type:String,required:true},
    rol:{type:String,default:'appUserAvailable',required:true}
})

module.exports=mongoose.model('user',UserSchema)