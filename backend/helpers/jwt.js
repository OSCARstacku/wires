'use strict'

const jwt=require('jwt-simple');
const moment=require('moment');
const secret='oscarrendon';

exports.createToken = function(user){
    let payload={
        sub:user._id,
        nickname:user.nickname_signup,
        fullname:user.fullname_signup,
        email:user.email_signup,
        role:user.rol,
        iat:moment().unix(),
        exp:moment().add(1,'days').unix,
    }
    console.log(payload,secret)
    return jwt.encode(payload,secret);
}