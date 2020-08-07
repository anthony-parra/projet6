const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require("express-rate-limit");

const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/stuff');
const config = require('./config/config');


//Connexion à la BDD MongoDB
mongoose.connect('mongodb+srv://' + config.user + ':' + config.password + '@' + config.db + '?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express(); //Variable d'utilisation d'Express

//Autorisation à tout le monde d'avoir accès à la BDD et de mettre en place le CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // Limite à 100 requête !
});

//NE RIEN MODIFIER AU DESSUS

app.use(bodyParser.json()); //Permet de transformer les requêtes en JSON

app.use(limiter);
app.use(xss());
app.use(helmet());
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;