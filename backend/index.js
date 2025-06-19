const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) return console.error('Database connection failed:', err);
  console.log('Connected to MySQL RDS');
});

app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

app.post('/api/users', (req, res) => {
  const { name, hobbies } = req.body;
  if (!name || !hobbies) return res.status(400).send('Missing fields');
  db.query('INSERT INTO users (name, hobbies) VALUES (?, ?)', [name, hobbies], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.sendStatus(201);
  });
});

app.listen(5000, () => console.log('Backend running on port 5000'));
