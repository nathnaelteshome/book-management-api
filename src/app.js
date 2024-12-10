const express = require("express");
const bodyParser = require("body-parser");
const basicAuth = require("express-basic-auth");
const sequelize = require("./config/database");
const bookRoutes = require("./routes/bookRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();
app.use(bodyParser.json());

app.use(
  basicAuth({
    users: { admin: "password" },
    challenge: true,
  })
);

app.use("/api/books", bookRoutes);

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Book Management API",
      version: "1.0.0",
      description:
        "A simple Book Management API using Node.js, Express, and SQLite",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await sequelize.sync();
  // Dynamically import and use the open module
  const open = await import("open");
  open.default(`http://localhost:${PORT}/api-docs`);
});
