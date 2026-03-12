const express = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const userRoutes = require("./routes/users");

const app = express();
app.use(express.json());

/*
Swagger configuration
*/

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Backend 101 API",
      version: "1.0.0",
      description: "Example API documentation using Swagger"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
  },
  apis: ["./routes/*.js"]
};

const specs = swaggerJsDoc(options);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));


app.use("/api/v1/users", userRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
  console.log("Swagger docs at http://localhost:3000/docs");
});