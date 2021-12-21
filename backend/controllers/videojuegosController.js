const { response } = require('express');
const Videojuego = require('../models/Videogame');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs'); // Viene en node

const agregarVideojuego = async ( req , res = response ) => {

    let form = new formidable.IncomingForm();

    form.keepExtensions = true;

    form.parse( req , ( err , fields , files ) => {

        if ( err ) {
            return res.status(400).json({
                error: 'Imagen no ha podido subirse'
            })
        }

        const { name , descripcion , precio , categoria , cantidad } = fields;
        let videogame = new Videojuego( fields );

        if ( files.foto ) {
            if ( files.foto.size > 1000000 ) {
                return res.status(400).json({
                    error: 'La imagen deberia ser de 1mb'
                })
            }

            videogame.foto.data = fs.readFileSync( files.foto.filepath )
            videogame.foto.contentType = files.foto.type
        }

        videogame.save( (err , result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }

            res.status(201).json({
                result
            })
        } )
    } )

}

const listarVideojuegos = async ( req , res = response ) => {
    
    let orden = req.query.orden ? req.query.orden : 'asc';
    let ordenarPor = req.query.ordenarPor ? req.query.ordenarPor : 'nombre' // Ordenar por nombre, puede ser por id

    Videojuego.find()
        .select('-foto')
        .populate('categoria')
        .sort([[ordenarPor , orden]])
        .exec( (err , videogames) => {
            if ( err ) {
                return res.status(400).json({
                    error: 'Videogames not found'
                })
            }

            res.status(200).json({
                videogames
            })
        } )
}

const eliminarVideojuego = async ( req , res = response ) => {
    console.log("eliminar")
}

module.exports = {
    agregarVideojuego,
    listarVideojuegos,
    eliminarVideojuego
}