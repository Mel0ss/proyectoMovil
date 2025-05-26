import { getConnection } from "../database/database.js"

export const categorias = async (req, res) => {
    let connection
    const {nombre, tipo, id_usuario2} = req.body

    try {
        connection = await getConnection()
        const existe = await connection.query('SELECT * FROM Categorias WHERE nombre = ? AND id_usuario2 = ?', [nombre, id_usuario2])
        
        if (existe[0].length > 0) {
            return res.status(400).json({message: "La categoría ya existe"})
        }
        
        await connection.execute('INSERT INTO Categorias (nombre, tipo, id_usuario2) VALUES(?, ?, ?)', [nombre, tipo, id_usuario2])
        return res.status(201).json({message: "Categoría creada exitosamente"})
    } catch (error) {
        return res.status(500).json({message: "Error en el servidor"})
    }
}