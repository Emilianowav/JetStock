const db = require('../db/config');

exports.getAllProducts = (req, res) => {
  const query = 'SELECT * FROM productos';
  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.createProduct = (req, res) => {
  const { nombre, descripcion, precio, stock_minimo, cantidad } = req.body;
  const query = 'INSERT INTO productos (nombre, descripcion, precio, stock_minimo, cantidad) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [nombre, descripcion, precio, stock_minimo, cantidad], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ id: result.insertId, ...req.body });
  });
};

exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, stock_minimo, cantidad } = req.body;
  const query = 'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock_minimo = ?, cantidad = ? WHERE id = ?';
  db.query(query, [nombre, descripcion, precio, stock_minimo, cantidad, id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ id, ...req.body });
  });
};

exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM productos WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: `Producto con ID ${id} eliminado.` });
  });
};
