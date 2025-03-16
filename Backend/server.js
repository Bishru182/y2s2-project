const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const nodemailer = require('nodemailer'); // Import nodemailer

const app = express();
app.use(cors());
app.use(express.json());

// Create connection to MySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Mysql@123',
  database: 'hardware'
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
app.post('/supplier', (req, res) => {
  const { name, sid, email, contact, address, remarks } = req.body;

  const sql = 'INSERT INTO suppliers (name, sid, email, contact, address, remarks) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [name, sid, email, contact, address, remarks], (err, result) => {
    if (err) {
      console.error('Failed to insert data: ', err);
      res.status(500).send('Error saving data');
    } else {
      res.status(200).send('Supplier data saved successfully!');
    }
  });
});

// API endpoint for fetching orders
app.get('/orders', (req, res) => {
  const sql = 'SELECT * FROM orders';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Failed to fetch orders: ', err);
      res.status(500).send('Server error');
    } else {
      res.json(results);
    }
  });
});


// API endpoint for fetching suppliers
app.get('/suppliers', (req, res) => {
  const sql = 'SELECT * FROM suppliers';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Failed to fetch suppliers: ', err);
      res.status(500).send('Server error');
    } else {
      res.json(results);
    }
  });
});

// API endpoint for deleting a supplier
app.delete('/supplier/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM suppliers WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Failed to delete supplier: ', err);
      res.status(500).send('Error deleting supplier');
    } else {
      res.status(200).send('Supplier deleted successfully');
    }
  });
});

// API endpoint for saving orders and sending email
app.post('/order', (req, res) => {
  const { name, email, productName, quantity, requireDate, remarks } = req.body;

  const sql = 'INSERT INTO orders (name, email, productName, quantity, requireDate, remarks) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [name, email, productName, quantity, requireDate, remarks], (err, result) => {
    if (err) {
      console.error('Failed to insert order data: ', err);
      return res.status(500).send('Error saving order data');
    }

    // Send Email to Supplier
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'apsarahardware088@gmail.com', // Your email
        pass: 'kwwi awsp umty wupu' // Your email password (use App Password if 2FA is enabled)
      }
    });

    const mailOptions = {
      from: 'apsarahardware088@gmail.com',
      to: email,
      subject: 'New Product Order Request',
      text: `Dear ${name},

We would like to place an order for the following product:
Product Name: ${productName}
Quantity: ${quantity}
Required Date: ${requireDate}
Remarks: ${remarks}

Please confirm the availability of the product and provide an estimated delivery date.

Thank you,
Hardware Store`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Failed to send email: ', error);
        return res.status(500).send('Error sending email');
      }
      console.log('Email sent: ' + info.response);
      res.status(200).send('Order placed and email sent successfully!');
    });
  });
});

// Server listening
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
