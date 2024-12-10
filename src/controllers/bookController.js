const Book = require("../models/book");

// Add a new book
exports.addBook = async (req, res) => {
  try {
    const bookData = {
      title: req.body.title,
      author: req.body.author,
      publishedDate: req.body.publishedDate,
      numberOfPages: req.body.numberOfPages,
    };
    const book = await Book.create(bookData);
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Retrieve a list of all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get details of a specific book
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a book's details
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    // Exclude the id field from the update
    const { id, ...updateData } = req.body;

    await book.update(updateData);
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      await book.destroy();
      res.status(200).json({ message: "Book successfully deleted" });
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
