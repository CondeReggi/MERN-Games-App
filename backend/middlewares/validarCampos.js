const { validationResult } = require('express-validator');

const validarCampos = (  req , res , next  ) => {
    const errors = validationResult( req ); //Obtengo todos los check

    if ( !errors.isEmpty() ) {
        return res.status(400).json(errors)
    }

    next();
}

module.exports = {
    validarCampos
}
