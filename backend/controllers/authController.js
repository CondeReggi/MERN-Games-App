const { response } = require('express');
const { Mongoose } = require('mongoose');
const crypto = require('crypto');
const Users = require('../models/Users');

// const FunctionTest = ( req , res = response ) => {
//     res.json({
//         msg: "hola"
//     })
// }

const singUp = async ( req , res = response ) => {
    const { nombre , email , password } = req.body; 

    const existeEmail = await Users.findOne({ email })

    if ( existeEmail ) {
        return res.status(400).json({
            msg: 'El email ya esta validado en la base de datos. por favor ingrese otro'
        })
    }

    const data = {
        nombre,
        email,
        password
    }

    const usuario = new Users( data );
    await usuario.save();

    res.status(401).json({
        data
    })
}

module.exports = {
    singUp
}