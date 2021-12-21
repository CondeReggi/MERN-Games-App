const { response } = require('express')
const Category = require('../models/Category')

const agregarCategoria = async ( req , res = response ) => {

    const data = req.body;
    const existeEnBD = await Category.find({ nombre: data.nombre })

    console.log(existeEnBD , data)

    if( existeEnBD.length !== 0 ) {
        return res.status(401).json({
            msg: `La categoria ${data.nombre} ya existe en la base de datos`
        })
    }

    const category = new Category( data )
    await category.save();

    res.status(201).json( {
        msg: 'Fue un exito',
        data
    })
}

const buscarCategorias = async ( req , res = response ) => {

    const categorias = await Category.find();

    if ( !categorias ) {
        return res.status(400).json({
            msg: 'No existen categorias aun'
        })
    }

    res.status(200).json({
        categorias
    })

}

const borrarCategoria = async ( req , res = response ) => {

    const id = req.params.id;
    const categoria = await Category.findById( id )
    
    if ( categoria ){

        const nombre = categoria.nombre
        await Category.findByIdAndDelete( id )

        return res.status(201).json({
            msg: `Se ha eliminado correctamente la categoria ${nombre}`
        })
    }

    res.status(400).json({
        msg: `No existe ninguna categoria`
    })

}

module.exports = {
    agregarCategoria,
    buscarCategorias,
    borrarCategoria
}