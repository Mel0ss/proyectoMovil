import { getConnection } from "../database/database.js"

export const registrar_movimiento = async (req, res) => {
try {
    const { tipo, descripcion, cantidad, fecha, id_categoria2, id_usuario2 } = req.body;

    const connection = await getConnection();

    await connection.query(
      `INSERT INTO Movimientos (tipo, descripcion, cantidad, fecha, id_categoria2, id_usuario2)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [tipo, descripcion, cantidad, fecha, id_categoria2, id_usuario2]
    );

    res.status(201).json({ message: "Movimiento registrado correctamente" });
  } catch (error) {
    console.error("Error al registrar movimiento:", error);
    res.status(500).json({ message: "Error al registrar movimiento" });
  }
} 

export const getCategorias = async (req, res) => {
  const { id_usuario, tipo } = req.params;
  try {
    const connection = await getConnection();
    const [categorias] = await connection.query(
      'SELECT * FROM Categorias WHERE id_usuario2 = ? AND tipo = ?',
      [id_usuario, tipo]
    );
    res.json(categorias);
  } catch (err) {
    console.error("Error al obtener categorías:", err);
    res.status(500).json({ error: "Error al obtener categorías" });
  }
};
