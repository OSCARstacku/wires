'use strict'

const express=require('express');
const userController=require('../controllers/UserController');
const api=express.Router();
const auth=require('../middlewares/authenticate');

api.post('/start_user_session',userController.start_user_session);
api.post('/create_user',userController.create_user);

module.exports=api;