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