const express = require('express');
const { check } = require('express-validator');
const { agregarCategoria, buscarCategorias, borrarCategoria } = require('../controllers/categoryController');
const { validarCampos } = require('../middlewares/validarCampos');
const router = express.Router();

// MVC => Model View Controller

router.post('/crear', agregarCategoria );

router.get('/categorias', buscarCategorias );

router.delete('/:id' , [
    check('id','Tiene que ser un id valido').isMongoId(),
    validarCampos
] , borrarCategoria )

module.exports = router;