const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'your_database_name',
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

// Endpoint to get image data from the MySQL database
app.get('/api/images', (req, res) => {
  let sql = 'SELECT * FROM images_table';
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      // Send the image data as response
      res.json(results);
    }
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
