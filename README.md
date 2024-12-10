# Book Management API

## Overview

This is a RESTful API for managing a collection of books. The API allows users to:

1. Add a new book.
2. Retrieve a list of all books.
3. Get details of a specific book.
4. Update a book's details.
5. Delete a book.

Basic authentication is implemented to secure the endpoints.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for Node.js.
- **Sequelize**: Promise-based Node.js ORM for SQL databases.
- **SQLite**: SQL database engine.
- **Swagger**: API documentation tool.
- **Swagger UI**: Tool for visualizing Swagger API documentation.
- **Swagger JSDoc**: Generates Swagger documentation from JSDoc comments.

## Swagger Documentation

The project uses Swagger to document the API. The Swagger documentation is available at `/api-docs` endpoint once the server is running. It provides a user-friendly interface to interact with the API endpoints.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

```sh
git clone https://github.com/nathnaelteshome/book-management-api.git
cd book-management-api
```

2. Install dependencies:

```sh
npm install
```

3. Run the application:

```sh
npm start
```
