const { model , Schema } = require('mongoose');
const { ObjectId } = Schema;

const videoGameSchema = Schema({
    nombre: {
        type: String,
        required: [ true, 'El nombre es obligatorio' ],
        maxlength: 32,
        trim: true,
    },
    descripcion: {
        type: String,
        trim: true,
        require: [ true , 'La descripcion es obligatoria' ]
    },
    precio: {
        type: Number,
        trim: true,
        require: true,
        maxlength: 32
    },
    categoria: {
        type: ObjectId,
        ref: 'Categoria',
        require: true
    },
    cantidad: {
        type: Number
    },
    foto: {
        data: Buffer, // Serie de numeros para guardar la imagen
        contentType: String
    }
},{
    timestamp: true // Se agrega la hora actual
})

module.exports = model( 'Videojuego' , videoGameSchema )