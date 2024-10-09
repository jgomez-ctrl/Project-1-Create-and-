// Function to fetch all books
function fetchBooks() {
    fetch('http://localhost:5000/api/books')
        .then(response => response.json())
        .then(books => {
            const bookList = document.getElementById('book-list');
            bookList.innerHTML = '';  // Clear previous entries
            books.forEach(book => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.ISBN}</td>
                    <td>
                        <button class="btn btn-primary" onclick="editBook('${book._id}')">Edit</button>
                        <button class="btn btn-danger" onclick="deleteBook('${book._id}')">Delete</button>
                    </td>
                `;
                bookList.appendChild(row);
            });
            document.getElementById('book-list-container').style.display = 'block';
            document.getElementById('book-form').style.display = 'none';
        })
        .catch(error => console.error('Error fetching books:', error));
}

// Function to show the book form
function showAddBookForm() {
    document.getElementById('form-title').textContent = 'Add a Book';
    document.getElementById('book-id').value = '';
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
    document.getElementById('book-form').style.display = 'block';
    document.getElementById('book-list-container').style.display = 'none';
}

// Function to hide the book form
function hideBookForm() {
    document.getElementById('book-form').style.display = 'none';
}

// Function to submit a new or edited book
function submitBook(event) {
    event.preventDefault();
    const bookId = document.getElementById('book-id').value;
    const bookData = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        ISBN: document.getElementById('isbn').value
    };

    if (bookId) {
        // Update existing book
        fetch(`http://localhost:5000/api/books/${bookId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookData)
        }).then(() => fetchBooks());
    } else {
        // Add new book
        fetch('http://localhost:5000/api/books', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookData)
        }).then(() => fetchBooks());
    }

    hideBookForm();
}

// Function to edit a book
function editBook(bookId) {
    fetch(`http://localhost:5000/api/books/${bookId}`)
        .then(response => response.json())
        .then(book => {
            document.getElementById('form-title').textContent = 'Edit Book';
            document.getElementById('book-id').value = book._id;
            document.getElementById('title').value = book.title;
            document.getElementById('author').value = book.author;
            document.getElementById('isbn').value = book.ISBN;
            document.getElementById('book-form').style.display = 'block';
            document.getElementById('book-list-container').style.display = 'none';
        });
}

// Function to delete a book
function deleteBook(bookId) {
    fetch(`http://localhost:5000/api/books/${bookId}`, {
        method: 'DELETE'
    }).then(() => fetchBooks());
}
