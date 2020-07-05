const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/usuario')
const { verificaToken , verificaAdminRole} = require('../middlewares/autenticacion')

const app = express()

app.get('/usuario', verificaToken, (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({estado: true}, 'nombre email role estado google img')// solo de estado true, quiero estos campos
            .skip(desde)
            .limit(limite)
            .exec( (err, usuarios) => {
                if( err ) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                Usuario.count({estado: true}, (err, conteo) => {
                    res.json({
                        ok: true,
                        usuarios,
                        cuantos: conteo
                    })
                })
            })
})
  
app.post('/usuario', [verificaToken, verificaAdminRole], function (req, res) {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,
    })

    usuario.save( (err, usuarioDB) => {// Por que un usuarioDB? Al parecer usuarioDB tiene la data de usuario

        if( err ) {
            return res.status(400).json({
                ok: false,
                err
            });
        }


        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });
})

app.put('/usuario/:id', [verificaToken, verificaAdminRole], function (req, res) {

    let id = req.params.id; // este params.id es el id de la url, tiene que ser el mismo nombre
//pick es funcion de la liberia underscore.js, pick filtra solo los campos que quiero, 2 param. son las prop. validas
    let body = _.pick( req.body, ['nombre', 'email', 'img', 'role', 'estado'] );

    Usuario.findByIdAndUpdate( id, body, {new: true, runValidators: true}, (err, usuarioDB) => {
        //new te regresa el nuevo registrado acutalizado en postman
        //run validators corre todas las validaciones definidas en el esquemas
        if( err ) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })
})

app.delete('/usuario/:id', [verificaToken, verificaAdminRole], function (req, res) {
    
    let id = req.params.id;

    //Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    let cambiaEstado = {
        estado: false
    }
    
    Usuario.findByIdAndUpdate(id, cambiaEstado, {new: true},  (err, usuarioBorrado) => {
        if( err ) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if( !usuarioBorrado ) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        };

        res.json({
            ok: true,
            usuario: usuarioBorrado
        })

    })
})


module.exports = app;