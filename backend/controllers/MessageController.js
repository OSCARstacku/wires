'use strict'

const Message=require('../models/message');
const User=require('../models/user');

async function list_messages_users(req, res){
    try {
        const reg = await Message.find();
        res.status(200).send({ data: reg });
    } catch (error) {
        // console.error(`Error de servidor: ${error}`);
    }
}

async function create_message_user(req, res){
    try {
        if(req.user){
            if(req.user.role == 'appUserAvailable'){
                const data = req.body;
                const regUser = await User.findById({ _id:data.idUser });

                const message = new Message;
                message.title_message_user  = data['title_message_user'];
                message.body_message_user = data['body_message_user'];
                message.author_message = regUser;

                try {
                    const saveMessage = await message.save();
                } catch (error) {
                    // console.log(error)
                }
                res.status(200).send({ message: 'Se creo un nuevo mensaje' });
            } else {
                res.status(500).send({ message: 'No tiene acceso para ejecutar esta función' });
            }
        } else {
            res.status(500).send({ message: 'No tiene acceso para ejecutar esta función' });
        }
    } catch (error) {
        // console.error(`Error de servidor: ${error}`);
    }

}

module.exports={
    list_messages_users,
    create_message_user,
}