import { getConnection } from "../database/database.js";

export const listar = async (req, res) => {
  try {
    const { tipo, id_usuario } = req.body;
    console.log("Recibido en backend:", tipo, id_usuario);

    const connection = await getConnection()

    const [resultado] = await connection.query(`SELECT m.*, c.nombre AS nombre_categoria FROM Movimientos m JOIN Categorias c ON m.id_categoria2 = c.id_categoria WHERE m.tipo = ? AND m.id_usuario2 = ?`,[tipo, id_usuario])
    console.log("Movimientos encontrados:", resultado);

    res.json(resultado);
  } catch (error) {
    console.error("Error al listar movimientos:", error);
    res.status(500).json({ message: "Error al obtener movimientos" });
  }
};
