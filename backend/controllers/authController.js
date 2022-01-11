const { response } = require('express');
const Users = require('../models/Users');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt')


// const FunctionTest = ( req , res = response ) => {
//     res.json({
//         msg: "hola"
//     })
// }

// const singUp = async ( req , res = response ) => {
//     const { nombre , email , password } = req.body; 

//     const existeEmail = await Users.findOne({ email })

//     if ( existeEmail ) {
//         return res.status(400).json({
//             msg: 'El email ya esta validado en la base de datos. por favor ingrese otro'
//         })
//     }

//     const data = {
//         nombre,
//         email,
//         password
//     }

//     const usuario = new Users( data );
//     await usuario.save();

//     res.status(401).json({
//         data
//     })
// }

const singUp = async (req, res = response) => {
    console.log('body: ', req.body);

    const user = new Users(req.body);

    try {

        await user.save();

        user.salt = undefined;
        user.hashed_password = undefined;

        res.status(401).json({
            user
        })

    } catch (error) {
        res.status(400).json({
            msg: "Por favor chequea las filas, hubo un error",
            error
        })
    }
}

const singIn = async ( req, res = response ) => {
    const { email , password } = req.body;

    const usuario = await Users.findOne( { email: email } ) // Busco un usuario

    if ( !usuario ) {
        return res.status(400).json({
            msg: "User con ese mail no existe"
        })
    }

    if ( !usuario.authentitcate( password ) ) {
        return res.status(401).json({
            msg: "Email y contraseña no coinciden"
        })
    }

    //En caso exitoso
    const { _id , name  , role } = usuario;
    const token = jwt.sign( {_id: _id }, process.env.JWT_SECRET );

    res.cookie('t', token , {expire: new Date() + 9999})

    return res.status(200).json({
        token, 
        user: {
            _id,
            email,
            name,
            role
        }
    })

}

// const isAdmin = ( req, res = response , next ) => {
//     let user = req.profile && req.auth && req.profile._id == req.auth._id;
//     if ( !user ) {
//         return res.status(403).json({
//             msg: "Acceso denegado, no eres administrador"
//         })
//     }
//     next()
// }

module.exports = {
    singUp,
    singIn
}