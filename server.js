const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let books = [
  { id: 101, title: "Wings of Fire", author: "A.P.J. Abdul Kalam", genre: "Autobiography", publishedYear: 1999, available: true },
  { id: 102, title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction", publishedYear: 1988, available: true },
  { id: 103, title: "Harry Potter", author: "J.K. Rowling", genre: "Fantasy", publishedYear: 1997, available: false }
];

app.get('/api/books', (req, res) => {
  res.status(200).json(books);
});

app.get('/api/books/filter', (req, res) => {
  const authorQuery = req.query.author;
  if (!authorQuery) {
    return res.status(200).json([]);
  }
  const result = books.filter(b => b.author.toLowerCase().includes(authorQuery.toLowerCase()));
  res.status(200).json(result);
});

app.get('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.status(200).json(book);
});

app.post('/api/books', (req, res) => {
  const { title, author, genre, publishedYear, available } = req.body;

  if (!title || !author || !genre || publishedYear === undefined || available === undefined) {
    return res.status(400).json({ message: "All fields (title, author, genre, publishedYear, available) are required" });
  }
  if (typeof publishedYear !== 'number' || typeof available !== 'boolean') {
    return res.status(400).json({ message: "publishedYear must be a number and available must be a boolean" });
  }

  const newId = books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 101;
  const newBook = {
    id: newId,
    title,
    author,
    genre,
    publishedYear: Number(publishedYear),
    available: Boolean(available)
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

app.put('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  const { title, author, genre, publishedYear, available } = req.body;
  if (title !== undefined) book.title = title;
  if (author !== undefined) book.author = author;
  if (genre !== undefined) book.genre = genre;
  if (publishedYear !== undefined) book.publishedYear = Number(publishedYear);
  if (available !== undefined) book.available = Boolean(available);

  res.status(200).json(book);
});

app.delete('/api/books/:id', (req, res) => {
  const index = books.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  books.splice(index, 1);
  res.status(200).json({ message: "Book deleted successfully" });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
