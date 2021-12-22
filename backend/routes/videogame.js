const express = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const router = express.Router();
const { agregarVideojuego, listarVideojuegos, eliminarVideojuego, obtenerFoto, videogameById } = require('../controllers/videojuegosController')

router.get('/videogames', listarVideojuegos );

router.get('/foto/:id', [
    check('id','Tiene que ser un id valido').isMongoId(),
    validarCampos
] , obtenerFoto )

router.post('/crear', agregarVideojuego );

router.delete('/:id' , [
    check('id','Tiene que ser un id valido').isMongoId(),
    validarCampos
] , eliminarVideojuego  )

module.exports = router;