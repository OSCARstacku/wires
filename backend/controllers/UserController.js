'use strict'

const User=require('../models/user');
const bcrypt=require('bcrypt-nodejs');

//Create user
async function create_user(req, res){
    try {
        const data = req.body;
        let user_arr = [];
        user_arr = await User.find({ email_signup: data.email_signup });

        if(user_arr.length == 0){
            if(data.password_signup){
                bcrypt.hash(data.password_signup,null,null,async function(err, hash){
                    if(hash){
                        data.password_signup = hash;
                        try {
                            const reg = await User.create(data);
                            res.status(200).send({ message: 'Usuario creado' });
                        } catch (error) {
                            // console.error(`Error de servidor: ${error}`);
                        }
                    }else {
                        res.status(200).send({ message: 'Error de servidor', data: undefined });
                    }
                })
            }
            else {
                res.status(200).send({ message: 'No ha ingresado ninguna contraseña', data: undefined });
            }
        }else {
            res.status(200).send({ message: 'El usuario ya se encuentra registrado', data: undefined });
        }
    } catch (error) {
        // console.error(`Error de servidor: ${error}`);
    }
}