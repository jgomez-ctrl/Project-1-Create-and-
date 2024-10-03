//
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Book = require('./models/book');
const Transaction = require('./models/transaction');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/library', { useNewUrlParser: true, useUnifiedTopology: true });

// CRUD operations for books
// app.get('/api/books', async (req, res) => {
//     const books = await Book.find();
//     res.json(books);
// });


app.get('/api/books', async (req, res, next) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        next(err); // Passes error to the error-handling middleware
    }
});

app.post('/api/books', async (req, res) => {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
});

app.get('/api/books/:id', async (req, res) => {
    const book = await Book.findById(req.params.id);
    res.json(book);
});

app.put('/api/books/:id', async (req, res) => {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBook);
});

app.delete('/api/books/:id', async (req, res) => {
    await Book.findByIdAndDelete(req.params.id);
    res.status(204).end();
});

// Borrow and return endpoints
app.post('/api/borrow', async (req, res) => {
    const newTransaction = new Transaction({ ...req.body, borrowDate: new Date() });
    await newTransaction.save();
    res.status(201).json(newTransaction);
});

app.post('/api/return', async (req, res) => {
    const { transactionId } = req.body;
    const transaction = await Transaction.findById(transactionId);
    if (transaction) {
        transaction.returnDate = new Date();
        await transaction.save();
        res.json(transaction);
    } else {
        res.status(404).json({ error: 'Transaction not found' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
