const db = require('../db/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = 'INSERT INTO usuarios (username, password, role) VALUES (?, ?, ?)';

  db.query(query, [username, hashedPassword, role], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send('Usuario registrado con éxito.');
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM usuarios WHERE username = ?';

  db.query(query, [username], async (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send('Usuario no encontrado.');

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(401).send('Contraseña incorrecta.');

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login exitoso', token });
  });
};

exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) return res.status(403).send('Token requerido.');

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send('Token inválido.');
    req.user = decoded;
    next();
  });
};