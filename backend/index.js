// Importar librerias

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors'); // Dar un buen visto del pasaje de info del front al backend;
require('dotenv').config();

// Utilizar metodos de librerias 
const app = express();



// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

// Database Setup
mongoose.connect( process.env.DATABASE , {
    useNewUrlParser: true,
    useUnifiedTopology: true
} ).then( () => { console.log("Coneccion a la base de datos exitosa ") })

// Rutes SetUp 
app.use( '/api/category' , require('./routes/category') )
app.use( '/api/videojuegos' , require('./routes/videogame') )

// Listen to Port
const port = process.env.PORT;
app.listen( port , () => { console.log(` Servidor escuchando en puerto : ${port} `) } )
