const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    bookID: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    userID: String,
    borrowDate: Date,
    returnDate: Date,
});

module.exports = mongoose.model('Transaction', transactionSchema);
