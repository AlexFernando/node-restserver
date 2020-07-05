const express = require('express');

const fs = require('fs');

const path = require('path');

const { verificaTokenImg } = require('../middlewares/autenticacion')

let app = express();

app.get('/imagen/:tipo/:img', verificaTokenImg, (req, res) => {

    let tipo = req.params.tipo;
    let img = req.params.img;
    
    let pathImagen = path.resolve(__dirname, `../../uploads/${ tipo }/${ img }` );
        // para hacer publico esta imagen, que previamente alguien debe pedir

    if( fs.existsSync( pathImagen ) ) {
        res.sendFile( pathImagen );
    } else {
        
        //path absoluto para pedir img
        let noImagePath = path.resolve(__dirname, '../assets/no-image.jpg')

        //file con mayuscula
        res.sendFile(noImagePath);
    }




});

module.exports = app;