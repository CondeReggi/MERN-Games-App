const { model , Schema } = require('mongoose');

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [ true, 'El nombre es obligatorio' ],
        unique: true,
        maxlength: 32,
    }
})

module.exports = model( 'Categoria' , CategoriaSchema )