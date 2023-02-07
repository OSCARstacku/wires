'use strict'

const express=require('express');
const userController=require('../controllers/UserController');
const api=express.Router();

api.post('/create_user',userController.create_user);

module.exports=api;