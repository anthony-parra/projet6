const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: String, required: true },
    mainpepperIngredient: { type: String, required: true },
    heat: { type: Number, required: true },

});

module.exports = mongoose.model('sauce', sauceSchema);