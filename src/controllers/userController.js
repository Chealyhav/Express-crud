const db = require('../database/db');

exports.createUser = (req, res) => {
  const { name, email, age } = req.body;
  const sql = 'INSERT INTO users (name, email, age) VALUES (?, ?, ?)';
  db.query(sql, [name, email, age], (err, result) => {
    if (err) {
      console.error('Error inserting user:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.status(201).json({ id: result.insertId, name, email, age });
  });
};

exports.getAllUsers = (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
};

exports.getUserById = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM users WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error fetching user:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    if (result.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json(result[0]);
  });
};

exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  const sql = 'UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?';
  db.query(sql, [name, email, age, id], (err) => {
    if (err) {
      console.error('Error updating user:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json({ id, name, email, age });
  });
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM users WHERE id = ?';
  db.query(sql, [id], (err) => {
    if (err) {
      console.error('Error deleting user:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.status(204).end();
  });
};
