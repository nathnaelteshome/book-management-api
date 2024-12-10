# Book Management API

## Overview

This is a RESTful API for managing a collection of books. The API allows users to:

1. Add a new book.
2. Retrieve a list of all books.
3. Get details of a specific book.
4. Update a book's details.
5. Delete a book.

Basic authentication is implemented to secure the endpoints.

## Endpoints

### Add a New Book

- **Endpoint:** POST /api/books
- **Request Body:**
  ```json
  {
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "publishedDate": "1925-04-10",
    "numberOfPages": 180
  }
  ```
