// require mongoose for databasing
const mongoose = require('mongoose');

//schema for title, autor, and isbn 
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    ISBN: String,
});

module.exports = mongoose.model('Book', bookSchema);
