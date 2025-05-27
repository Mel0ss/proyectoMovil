import { getConnection } from "../database/database.js";

export const listar = async (req, res) => {
  let connection;
  try {
    const { tipo, id_usuario } = req.body;

    connection = await getConnection();

    const query = `
      SELECT m.id, m.tipo, m.descripcion, m.cantidad,
             DATE_FORMAT(m.fecha, '%d/%m/%Y') AS fecha,
             c.nombre AS categoria
      FROM Movimientos m
      INNER JOIN Categorias c ON m.id_categoria2 = c.id_categoria
      WHERE m.tipo = ? AND m.id_usuario2 = ?
    `;
    const [rows] = await connection.execute(query, [tipo, id_usuario]);

    res.json(rows);
  } catch (error) {
    console.error("Error al listar movimientos:", error);
    res.status(500).json({ message: "Error al obtener movimientos" });
  } finally {
    if (connection) connection.release();
  }
};
