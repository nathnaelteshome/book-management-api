const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./config/database");
const { v4: uuidv4 } = require("uuid");

async function migrate() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    // Create a new table with the correct schema
    await sequelize.query(`
      CREATE TABLE Books_new (
        id UUID PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        publishedDate DATETIME NOT NULL,
        numberOfPages INTEGER NOT NULL,
        createdAt DATETIME NOT NULL,
        updatedAt DATETIME NOT NULL
      );
    `);

    // Fetch all data from the old table
    const books = await sequelize.query("SELECT * FROM Books", {
      type: Sequelize.QueryTypes.SELECT,
    });

    // Insert data into the new table with UUIDs
    for (const book of books) {
      const newId = uuidv4();
      await sequelize.query(
        `
        INSERT INTO Books_new (id, title, author, publishedDate, numberOfPages, createdAt, updatedAt)
        VALUES (:id, :title, :author, :publishedDate, :numberOfPages, :createdAt, :updatedAt)
      `,
        {
          replacements: {
            id: newId,
            title: book.title,
            author: book.author,
            publishedDate: book.publishedDate,
            numberOfPages: book.numberOfPages,
            createdAt: book.createdAt,
            updatedAt: book.updatedAt,
          },
        }
      );
    }

    // Drop the old table
    await sequelize.query("DROP TABLE Books");

    // Rename the new table to the original table name
    await sequelize.query("ALTER TABLE Books_new RENAME TO Books");

    console.log("Migration completed successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  } finally {
    await sequelize.close();
  }
}

migrate();
