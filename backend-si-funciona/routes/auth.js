const express = require('express');
const pool = require('../db');
const router = express.Router();

router.post('/login', async (req, res) => {
  const { correo, clave } = req.body;

  console.log(`Attempting login with correo: ${correo}, clave: ${clave}`); // Añadir log para depuración

  try {
    const result = await pool.query(
      'SELECT * FROM persona WHERE correo = $1 AND clave = $2',
      [correo, clave]
    );

    if (result.rows.length > 0) {
      res.status(200).json({ message: 'Login successful', user: result.rows[0] });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (err) {
    console.error('Database query error:', err); // Añadir log de error
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

module.exports = router;
