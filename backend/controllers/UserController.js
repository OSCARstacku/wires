'use strict'

const User=require('../models/user');
const bcrypt=require('bcrypt-nodejs');
const jwt=require('../helpers/jwt');

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
                    } else {
                        res.status(200).send({ message: 'Error de servidor', data: undefined });
                    }
                })
            } else {
                res.status(200).send({ message: 'No ha ingresado ninguna contraseña', data: undefined });
            }
        } else {
            res.status(200).send({ message: 'El usuario ya se encuentra registrado', data: undefined });
        }
    } catch (error) {
        // console.error(`Error de servidor: ${error}`);
    }
}

async function start_user_session(req, res){
    try {
        const data = req.body;
        let user_arr = [];

        user_arr = await User.find({ email_signup: data.email_signin });
        if(user_arr.length == 0){
            res.status(200).send({ message: 'Credenciales incorrectas', data: undefined });
        } else {
            let user = user_arr[0];
            bcrypt.compare(data.password_signin,user.password_signup,async function(error, check){
                if(check){
                    res.status(200).send({
                        data: user,
                        token: jwt.createToken(user)
                    })
                } else {
                    res.status(200).send({ message: 'Credenciales incorrectas', data: undefined });
                }
            })
        }
    } catch (error) {
        res.status(200).send({ message: 'Credenciales incorrectas', data: undefined });
    }
}

module.exports={
    create_user,
    start_user_session
}