import { getConnection } from "../database/database.js"

export const registro = async (req, res) => {
    let connection
    const {email, usuario, contraseña, saldo} = req.body

    try {
        connection = await getConnection()
        const existe = await connection.query('SELECT * FROM Usuarios WHERE email = ?', [email])
        
        if (existe[0].length > 0) {
            return res.status(400).json({message: "El usuario ya existe"})
        }
        
        await connection.execute('INSERT INTO Usuarios (email, usuario, contraseña, saldo) VALUES(?, ?, ?, ?)', [email, usuario, contraseña, saldo])
        return res.status(201).json({message: "Usuario registrado exitosamente"})
    } catch (error) {
        return res.status(500).json({message: "Error en el servidor"})
    }
}