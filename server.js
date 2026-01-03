const express = require("express");
const app = express();
app.use(express.json());
const mysql = require("mysql2");
const morgan = require("morgan");
const router = require("./router/userRouter");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
app.use(morgan("dev"));
// host and port
const host = "localhost";
const port = 5012;

// swagger options
const swaggerOption = require("./swagger.json");
const swaggerSpec = swaggerJSDoc(swaggerOption);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/api-docs/json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "puls@r1159",
  database: "my_database",
});
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database.");
});


app.use("/api/rewards", router);

app.listen(port, host, () => {
  console.log(`express server is running on http://${host}:${port}`);
});
