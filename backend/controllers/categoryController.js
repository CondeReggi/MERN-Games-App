const { response } = require('express')
const Category = require('../models/Category')

const agregarCategoria = async ( req , res = response ) => {


    const data = req.body;

    console.log(data)

    const category = new Category( data )

    await category.save();

    res.status(201).json( {
        msg: 'Fue un exito',
        data
    })
}

module.exports = {
    agregarCategoria
}