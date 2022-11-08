// Dependencies

const express = require('express');
const { Pool } = require('pg');

// Initialize pool

const connectionString = 'postgresql://postgres:docker@127.0.0.1:5432/pet_shop_scratch';
const pool = new Pool({ connectionString: connectionString });
pool.connect();

// Initialize express

const app = express();

// Globals

const port = 9000;

// Middleware

app.use(express.json());

// Route Handlers

app.get('/pets', (req, res) => {
  pool
    .query(`SELECT * FROM pets`)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.error(err);
      res.send(err);
    });
});

app.get('/pets/:id', (req, res) => {
  pool
    .query(`SELECT * FROM pets WHERE id=${req.params.id}`)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error(err);
      res.send(err);
    });
});

app.post('/pets', (req, res) => {
  pool
    .query(`INSERT INTO pets (age, kind, name) VALUES ('${req.body.age}','${req.body.kind}','${req.body.name}') RETURNING *`)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error(err);
      res.send(err);
    });
});

app.patch('/pets/:id/:column/:data', (req, res) => {
  pool
    .query(`UPDATE pets SET ${req.params.column}='${req.params.data}' WHERE id=${req.params.id} RETURNING *`)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error(err);
      res.send(err);
    });
});

app.delete('/pets/:id', (req, res) => {
  pool
    .query(`DELETE FROM pets WHERE id=${req.params.id} RETURNING *`)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error(err);
      res.send(err);
    });
});

// Listener

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
