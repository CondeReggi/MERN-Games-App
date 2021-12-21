const express = require('express');
const { agregarCategoria } = require('../controllers/categoryController');
const router = express.Router();

// MVC => Model View Controller

router.post('/', agregarCategoria )

module.exports = router;