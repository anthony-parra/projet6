const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true }, //Unique permet à l'utilisateur d'utiliser qu'une seule fois la même adresse mail
    password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator); //Application de uniqueValidator sur le schema
module.exports = mongoose.model('User', userSchema);