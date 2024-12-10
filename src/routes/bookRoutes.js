const express = require("express");
const bookController = require("../controllers/bookController");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - publishedDate
 *         - numberOfPages
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The title of the book
 *         author:
 *           type: string
 *           description: The author of the book
 *         publishedDate:
 *           type: string
 *           format: date
 *           description: The publication date of the book
 *         numberOfPages:
 *           type: integer
 *           description: The number of pages in the book
 *       example:
 *         id: "d290f1ee-6c54-4b01-90e6-d701748f0851"
 *         title: "The Great Gatsby"
 *         author: "F. Scott Fitzgerald"
 *         publishedDate: "1925-04-10"
 *         numberOfPages: 180
 *     BookInput:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - publishedDate
 *         - numberOfPages
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the book
 *         author:
 *           type: string
 *           description: The author of the book
 *         publishedDate:
 *           type: string
 *           format: date
 *           description: The publication date of the book
 *         numberOfPages:
 *           type: integer
 *           description: The number of pages in the book
 *       example:
 *         title: "The Great Gatsby"
 *         author: "F. Scott Fitzgerald"
 *         publishedDate: "1925-04-10"
 *         numberOfPages: 180
 */

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: The books managing API
 */

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Add a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookInput'
 *     responses:
 *       201:
 *         description: The book was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Bad request
 */
router.post("/", bookController.addBook);

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Retrieve a list of all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       400:
 *         description: Bad request
 */
router.get("/", bookController.getAllBooks);

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Get details of a specific book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: The book description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 *       400:
 *         description: Bad request
 */
router.get("/:id", bookController.getBookById);

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update a book's details
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The book id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookInput'
 *     responses:
 *       200:
 *         description: The book was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 *       400:
 *         description: Bad request
 */
router.put("/:id", bookController.updateBook);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: The book was successfully deleted
 *       404:
 *         description: Book not found
 *       400:
 *         description: Bad request
 */
router.delete("/:id", bookController.deleteBook);

module.exports = router;
