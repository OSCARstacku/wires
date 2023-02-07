'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'oscarrendon';

//Protección de Urls mediante validación de token
exports.auth = function(req,res,next){
    if(!req.headers.authorization){
        return res.status(403).send({ message:'Error: sin encabezados' });
    }

    let token = req.headers.authorization.replace(/['"]+/g,'');
    let segment = token.split('.');

    if(segment.length !=3){
        return res.status(403).send({ message:'Token inválido' });
    }else{
        try {
            var payload = jwt.decode(token,secret);
            if(payload.exp <= moment().unix()){
                return res.status(403).send({ message:'Token expirado' });
            }
        } catch (error) {
            return res.status(403).send({ message:'Token inválido' });
        }
    }
    req.user = payload;
    next();
}
