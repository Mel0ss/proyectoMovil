import { getConnection } from "../database/database.js";
import jwt from "jsonwebtoken"

const SECRET_KEY = "claveMovil"

export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const connection = await getConnection()
    const [result] = await connection.query('SELECT * FROM Usuarios WHERE email = ?', [email])
    console.log("conectado")

    if (result.length === 0) return res.status(401).json({ message: "Email no encontrado" })

    const usuario = result[0]

    if (password === usuario.password) {
      const user = { id: usuario.id_usuario, username: usuario.usuario }
      const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' })
      console.log("Login válido. Bienvenido", usuario.usuario)
      return res.status(200).json({ message: "Inicio de sesión válido", usuario, token })

    } else {
      console.log("Contraseña incorrecta")
      return res.status(401).json({ message: "Contraseña incorrecta" })

    }
  } catch (error) {
    console.error("Error", error)
    return res.status(500).json({ message: "Error del servidor" })
  }
}

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']
    if(!token) return res.status(402).json({messaje: "Token no encontrado, inicia sesión"})

    jwt.verify(token.split(' ')[1], SECRET_KEY, (err, decode)=>{
    req.user = decode

    next()
    })
    console.log(token)
}

export const metodoLogin = {
  login 
}