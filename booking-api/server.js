const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.json());

const DB_FILE = "db.json";

// Helper to read books from db.json
const readBooks = () => {
  try {
    const data = fs.readFileSync(DB_FILE, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

// Helper to write books to db.json
const writeBooks = (books) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(books, null, 2));
};

// POST /books → Add a new book
app.post("/books", (req, res) => {
  const books = readBooks();
  const newBook = req.body;

  if (!newBook.id || !newBook.title || !newBook.author || !newBook.year) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  books.push(newBook);
  writeBooks(books);
  res.status(201).json(newBook);
});

// GET /books → Retrieve all books
app.get("/books", (req, res) => {
  const books = readBooks();
  res.json(books);
});

// GET /books/:id → Retrieve a book by its ID
app.get("/books/:id", (req, res) => {
  const books = readBooks();
  const book = books.find((b) => b.id == req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
});

// PUT /books/:id → Update a book by its ID
app.put("/books/:id", (req, res) => {
  const books = readBooks();
  const index = books.findIndex((b) => b.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: "Book not found" });

  books[index] = { ...books[index], ...req.body };
  writeBooks(books);
  res.json(books[index]);
});

// DELETE /books/:id → Delete a book by its ID
app.delete("/books/:id", (req, res) => {
  const books = readBooks();
  const filteredBooks = books.filter((b) => b.id != req.params.id);
  if (books.length === filteredBooks.length) {
    return res.status(404).json({ message: "Book not found" });
  }
  writeBooks(filteredBooks);
  res.json({ message: "Book deleted" });
});

// GET /books/search?author=&title= → Search by author and/or title
app.get("/books/search", (req, res) => {
  const { author, title } = req.query;
  const books = readBooks();

  let filtered = books;

  if (author) {
    filtered = filtered.filter((b) =>
      b.author.toLowerCase().includes(author.toLowerCase())
    );
  }

  if (title) {
    filtered = filtered.filter((b) =>
      b.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  if (filtered.length === 0) {
    return res.status(404).json({ message: "No books found" });
  }

  res.json(filtered);
});

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
