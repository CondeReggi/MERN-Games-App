const { model , Schema } = require('mongoose');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

const UsuarioSchema = Schema({
    name: {
        type: String,
        required: [ true, 'El nombre es obligatorio' ],
        maxlength: 32
    },
    email: {
        type: String,
        required: [ true , 'El email es obligatorio' ]
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: String, // Salt es: ademas del hash se le agrega el salt a la password (Es un nivel arriba de seguirdad )
    role: {
        type: Number,
        default: 0
    },
    inventory: {
        type: Array,
        default: []
    }
},{
    timestamps: true
})

// Virtual field for password hash

UsuarioSchema.virtual('password').set(
    function( password ) {
        this._password = password;
        this.salt = uuidv4();
        this.hashed_password = this.encryptPassword( password )
    }
)
.get(
    function(){
        return this._password;
    }
); 

UsuarioSchema.methods = {
    authentitcate: function( plainText ){
        return this.encryptPassword( plainText ) === this.hashed_password;
    },
    encryptPassword: function( password ) {
        if( !password ) {
            return ""
        }
        try {
            return crypto.createHmac( 'sha1' , this.salt )
            .update( password )
            .digest( 'hex' )
        } catch (error) {
            return ""
        }
    }
}

module.exports = model( 'Usuario' , UsuarioSchema )