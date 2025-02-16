import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import path from 'path';
import { fileURLToPath } from 'url';

import bodyParser from 'body-parser'

import cookieParser from 'cookie-parser'

//initialization
const app = express();
dotenv.config();

// settings
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Static files
// app.use(express.static(path.join(__dirname, '../public')))
// app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
//app.use(express.static('public'));

// Middlewares
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser());


// Rutas
app.get('/', (req, res) => {
    // const user = req.session
    // res.render('login', { user })
    res.status(200).send("Cargo correctametne")
})


// Mensaje por defecto si no existe
app.use((req, res) => {
    res.status(404).send('¡El recurso no existe!')
})


export { app }
