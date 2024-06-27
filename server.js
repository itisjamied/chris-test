// const express = require("express");
// const path = require("path");
// const app = express();
// const port = 8000;

// app.use(express.static(path.join(__dirname, ".")));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "./admin/index.html"));
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the 'admin' directory
app.use('/admin', express.static(path.join(__dirname, 'admin')));

app.get('/', (req, res) => {
  res.send('Welcome to the ValueForm-2.0 project!');
});

// Serve the admin index.html file for the basePath /admin
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin', 'index.html'));
});

const port = 3000; // You can change this to any port you prefer
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
