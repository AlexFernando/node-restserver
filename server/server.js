require('./config/config');

const express = require('express')
const mongoose = require('mongoose');
const path = require('path')

const app = express()

app.use(express.urlencoded({ extended: true })) // serializar url, enviar la info de mis request a mi server 

// habilitar la carpeta public 
app.use( express.static(path.resolve( __dirname, '../public' )));

//Configuracion global de rutas
app.use(require('./routes/index'))

mongoose.connect(process.env.URLDB, (err, res) => {

    if (err) throw err;

    console.log('Base de datos ONLINE')

});
 
app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT)
})

