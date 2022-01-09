const { model , Schema } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [ true, 'El nombre es obligatorio' ],
        unique: true,
        maxlength: 32
    },
    email: {
        type: String,
        required: [ true , 'El email es obligatorio' ]
    },
    password: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

module.exports = model( 'Usuario' , UsuarioSchema )