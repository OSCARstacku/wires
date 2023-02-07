'use strict'

const Message=require('../models/message');
const User=require('../models/user');



async function create_message_user(req, res){
    try {
        if(req.user){
            if(req.user.role == 'appUserAvailable'){
                const idx = req.params['id'];
                const data = req.body;
                const regUser = await User.findById({ _id:idx });
            }
        }
    } catch (error) {

    }

}

module.exports={
    create_message_user,
}