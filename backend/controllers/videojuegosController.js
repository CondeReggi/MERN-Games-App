const { response } = require('express');
const Videojuego = require('../models/Videogame');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs'); // Viene en node

const agregarVideojuego = (req, res = response) => {

    let form = new formidable.IncomingForm();

    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {

        if (err) {
            return res.status(400).json({
                error: 'Imagen no ha podido subirse'
            })
        }

        const { name, descripcion, precio, categoria, cantidad } = fields;
        let videogame = new Videojuego(fields);

        if (files.foto) {
            if (files.foto.size > 1000000) {
                return res.status(400).json({
                    error: 'La imagen deberia ser de 1mb'
                })
            }

            videogame.foto.data = fs.readFileSync(files.foto.filepath)

            // console.log("HOLA CREANDO: " , files.foto)

            videogame.foto.contentType = files.foto.mimetype
        }

        // console.log(videogame.foto)

        videogame.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }

            res.status(201).json({
                result
            })
        })
    })

}

const listarVideojuegos = (req, res = response) => {

    let orden = req.query.orden ? req.query.orden : 'asc';
    let ordenarPor = req.query.ordenarPor ? req.query.ordenarPor : 'nombre' // Ordenar por nombre, puede ser por id

    Videojuego.find()
        .select('-foto')
        .populate('categoria')
        .sort([[ordenarPor, orden]])
        .exec((err, videogames) => {
            if (err) {
                return res.status(400).json({
                    error: 'Videogames not found'
                })
            }

            res.status(200).json({
                videogames
            })
        })
}

const eliminarVideojuego = async (req, res = response) => {

    const { id } = req.params;
    const existeVideojuego = await Videojuego.findById(id)

    if (!existeVideojuego) {
        return res.status(400).json({
            msg: `El juego con id: ${id} no existe`
        })
    }
    await Videojuego.findByIdAndRemove(id);

    res.status(200).json({
        msg: `Se ha eliminado correctamente el videojuego con id: ${id}`
    })

}

const obtenerFoto = async ( req, res = response ) => {

    const { id } = req.params;

    const videojuego = await Videojuego.findById( id ) // Obtengo el objeto en cuestion

    if ( !videojuego ) {
        return res.status(400).json({
            msg: `No se ha podido encontrar un videojuego con ese id`
        })
    }

    if ( videojuego.foto.data ) {
        res.set( 'Content-Type' , videojuego.foto.contentType );
        return res.send( videojuego.foto.data );
    }

    res.status(400).json({
        msg: 'No se ha encontrado ninguna foto'
    })
}

module.exports = {
    agregarVideojuego,
    listarVideojuegos,
    eliminarVideojuego,
    obtenerFoto
}