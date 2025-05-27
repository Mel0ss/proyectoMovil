import { getConnection } from "../database/database.js";

export const analizar = async (req, res) => {
  let connection;
  const { id_usuario } = req.params;

  try {
    connection = await getConnection();

    const [movimientos] = await connection.query('SELECT m.cantidad, m.tipo, c.nombre AS categoria, m.fecha FROM Movimientos m JOIN Categorias c ON m.id_categoria2 = c.id_categoria WHERE m.id_usuario2 = ?', [id_usuario]);

    console.log("ID del usuario para análisis:", id_usuario);
    console.log("Movimientos encontrados:", movimientos);

    if (movimientos.length === 0) {
      return res.status(200).json({
        promedioIngresos: 0,
        promedioGastos: 0,
        porcentajeAhorro: 0,
        relacion: "neutral",
        diferencia: 0,
        gastosPorCategoria: [],
      });
    }

    let totalIngresos = 0;
    let totalGastos = 0;
    let cantidadIngresos = 0;
    let cantidadGastos = 0;
    const gastosPorCategoria = {};

    movimientos.forEach(({ cantidad, tipo, categoria }) => {
      cantidad = parseFloat(cantidad);

      if (tipo.toLowerCase() === "ingreso") {
        totalIngresos += cantidad;
        cantidadIngresos++;
      } else if (tipo.toLowerCase() === "gasto") {
        totalGastos += cantidad;
        cantidadGastos++;
        gastosPorCategoria[categoria] = (gastosPorCategoria[categoria] || 0) + cantidad;
      }
    });

    const promedioIngresos = cantidadIngresos > 0 ? +(totalIngresos / cantidadIngresos).toFixed(2) : 0;
    const promedioGastos = cantidadGastos > 0 ? +(totalGastos / cantidadGastos).toFixed(2) : 0;

    const diferencia = +(totalIngresos - totalGastos).toFixed(2);
    const porcentajeAhorro = totalIngresos > 0
      ? +(((totalIngresos - totalGastos) / totalIngresos) * 100).toFixed(2)
      : 0;

    const relacion = diferencia > 0 ? "positivo" : diferencia < 0 ? "negativo" : "neutral";

    const categorias = Object.entries(gastosPorCategoria).map(([categoria, total]) => ({
      categoria,
      total: +total.toFixed(2),
    }));

    res.status(200).json({
      promedioIngresos,
      promedioGastos,
      porcentajeAhorro,
      relacion,
      diferencia: Math.abs(diferencia),
      gastosPorCategoria: categorias,
    });

  } catch (error) {
    console.error("Error en análisis:", error);
    res.status(500).json({ message: "Error al analizar movimientos" });
  }
}