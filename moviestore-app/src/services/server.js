const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'your_database_name',
});

db.connect((err) => {
  if (err) {
    throw err;
  }
});

app.get('/api/images', (req, res) => {
  let sql = 'SELECT * FROM images_table';
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

const PORT = 5000;
app.listen(PORT, () => {
});
