const express = require('express');
const router = express.Router();

const { check } = require('express-validator');
const { singUp, singIn } = require('../controllers/authController');
const { validarCampos } = require('../middlewares/validarCampos');

// Post Registro / Login

router.post('/singup', singUp );

router.post('/singin', singIn );

module.exports = router;