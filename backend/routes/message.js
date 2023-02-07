'use strict'

const express=require('express');
const messageController=require('../controllers/MessageController');
const api=express.Router();
const auth=require('../middlewares/authenticate');

api.get('/list_messages_users',auth.auth,messageController.list_messages_users)
api.post('/create_message_user',auth.auth,messageController.create_message_user);

module.exports=api;