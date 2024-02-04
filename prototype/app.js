const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Initialize database connection
const db = new sqlite3.Database('./db/login.db');

// Create table if not exists
db.run(`CREATE TABLE IF NOT EXISTS users (
   id INTEGER PRIMARY KEY,
   username TEXT,
   password TEXT
)`);

// Handle login requests
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if username and password match a record in the database
    db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
        if (err) {
            return console.error(err.message);
        }
        if (row) {
            res.send('Login successful'); // You can customize this response
        } else {
            res.send('Invalid credentials'); // You can customize this response
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
