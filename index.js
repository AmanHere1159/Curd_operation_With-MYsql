const express = require("express");
const app = express();
app.use(express.json());
const mysql = require("mysql2");
const morgan = require("morgan");
const router = require("./router/myRouter");
app.use(morgan("dev"));
// host and port
const host = "localhost";
const port = 5012;

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


app.use("/v1",(req,res,next)=>{
req.db=db;
next();
}, router);

app.listen(port, host, () => {
  console.log(`express server is running on http://${host}:${port}`);
});
