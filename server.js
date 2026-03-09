const express = require("express");
const path = require("path");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
const port = 8080;

app.use(cors());

const connection = mysql.createConnection({
  host: "express-server-testing.mysql.database.azure.com",
  user: "ivanov",
  password: "Lorder2342",
  port: 3306,
  ssl: { rejectUnauthorized: false },
  database: "azure-express-palvelut",
});

connection.connect((err) => {
  if (err) {
    console.error("Virhe", err);
  } else {
    console.log("Connected to:", "azurepalvelu");
  }
});

app.get("/api/hello", (_, res) => {
  res.json({
    message: "Hello everyone! This is just a test to check if this link works!",
  });
});

app.get("/api/azure", async (_, res) => {
  try {
    const response = await new Promise((resolve, reject) => {
      connection.query("SELECT * FROM `azurepalvelut`;", (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    console.log("Data has been sent successfully!");
    res.json({ response });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Database query failed" });
  }
});

app.use(express.static(path.join(__dirname, "client/dist")));

app.use((_, res) => {
  res.sendFile(path.join(__dirname, "client/dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
