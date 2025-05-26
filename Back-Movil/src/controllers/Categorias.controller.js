import { getConnection } from "../database/database.js"

export const crearCategoria = async (req, res) => {
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

export const listarCategorias = async (req, res) => {
    let connection
    const {id_usuario} = req.params

    console.log("ID recibido en backend:", id_usuario)

    try {
        connection = await getConnection()
        const [categorias] = await connection.query('SELECT * FROM Categorias WHERE id_usuario2 = ?', [id_usuario])
        console.log("Categorías obtenidas:", categorias)

        return res.status(200).json(categorias)
    } catch (error) {
        return res.status(500).json({message: "Error al obtener categorías"})
    }
}

export const eliminarCategoria = async (req, res) => {
    let connection
    const {id} = req.params

    try {
        connection = await getConnection()
        await connection.query('DELETE FROM Categorias WHERE id_categoria = ?', [id])

        return res.status(200).json({message: "Categoría eliminada"})
    } catch (error) {
        return res.status(500).json({message: "Error al eliminar la categoría"})
    }
}
