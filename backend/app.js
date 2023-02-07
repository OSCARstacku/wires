'use strict'

const express=require('express');
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const app=express();

let port=process.env.PORT || 4299;

// Para socket.io
const server=require('http').createServer(app);
const io=require('socket.io')(server,{
    cors: {origin: '*'}
});
io.on('connection', function(socket){
    socket.on('socket-messages', function(data){
        io.emit('new-messages');
    });
})

// Verificación conexión a DB
mongoose.connect('mongodb://localhost:27017/test',(err,res)=>{
    if(err){
        //console.log(err);
    }else{
        // app.listen.. se cambia por server.listen en socket.io
        server.listen(port,function(){
            // console.log('Servidor corriendo en el puerto '+port);
        })
    }
})

// Rutas
let user_route=require('./routes/user');


// Parsear (analizar cuerpos o estructuras), configurar DATA
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json({limit:'50mb',extended:true}));

// Sincronizar conexión backend con Frontend en diferentes Droplets
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});

// Definición de APIs(rutas) a usar
app.use('/api',user_route);


module.exports=app;