const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Create connection to MySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Your MySQL username
  password: 'Mysql@123', // Your MySQL password (leave empty if not set)
  database: 'hardware' // Replace with your database name
});

// Connect to database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ', err);
  } else {
    console.log('Connected to MySQL database.');
  }
});

// API endpoint for saving supplier data
app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  const sql = 'INSERT INTO suppliers (name, email, password) VALUES (?, ?, ?)';
  db.query(sql, [name, email, password], (err, result) => {
    if (err) {
      console.error('Failed to insert data: ', err);
      res.status(500).send('Error saving data');
    } else {
      res.status(200).send('Supplier data saved successfully!');
    }
  });
});

// Server listening
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
