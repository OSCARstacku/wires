'use strict'

const mongoose=require('mongoose');
const Schema=mongoose.Schema;

let MessageSchema=Schema({
    title_message_user:{type:String,required:true},
    body_message_user:{type:String,required:true},
    author_message:{type:Schema.ObjectId,ref:'user',required:true},
    createdAt:{type:Date,default:Date.now,required:true}
})

module.exports=mongoose.model('message',MessageSchema)