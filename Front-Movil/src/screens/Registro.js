import React from "react";
import { StyleSheet, View, Text, Button, TextInput } from "react-native";
import { useState } from "react"

export default function Registro({navigation}){
    const [form, setForm] = useState({email: '', usuario: '', contraseña: '', saldo: 0})

    const handleChange = (name, value) => {
        setForm({ ...form, [name]: value})
    }

    const handleSubmit = async() => {
        try {
            const response = await fetch("http://localhost:3000/api/registro", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(form)
            })
            const data = await response.json()
            if (response.ok){
                alert(data.message)
                navigation.navigate('Inicio')
            } else {
                alert(data.message)
            }
        } catch (error) {
            console.error("Error en el registro: ", error)
        }
        console.log(form)
    }

    return(
        <View style={styles.ContainerRegistro}>
            <View style={styles.CuadritoRegistro}>
                <View style={styles.ContainerRegistro2}>
                    <Text style={styles.TextoRegistro}>Correo electrónico:</Text>
                    <TextInput 
                    style={styles.InputRegistro} 
                    placeholder="Correo electrónico"
                    value={form.email}
                    onChangeText={(text) => handleChange("email", text)}
                    />
                </View>
                <View style={styles.ContainerRegistro2}>
                    <Text style={styles.TextoRegistro}>Usuario:</Text>
                    <TextInput 
                    style={styles.InputRegistro} 
                    placeholder="Usuario"
                    value={form.usuario}
                    onChangeText={(text) => handleChange("usuario", text)}
                    />
                </View>
                <View style={styles.ContainerRegistro2}>
                    <Text style={styles.TextoRegistro}>Contraseña:</Text>
                    <TextInput 
                    style={styles.InputRegistro} 
                    placeholder="Contraseña"
                    secureTextEntry
                    value={form.contraseña}
                    onChangeText={(text) => handleChange("contraseña", text)}
                    />
                </View>
                <Button title="Entrar" onPress={handleSubmit} color="#CCD5AE"/>
            </View>
            <Text style={styles.MarcaAgua} >Acciones & Gestión S.A.S</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    ContainerRegistro: {
        flex: 1,
        backgroundColor: '#FEFAE0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    CuadritoRegistro: {
        width: 300, 
        backgroundColor: '#E9EDC9',
        alignItems: 'center',
        justifyContent: 'space-around',    
        borderRadius: 20,
    },
    ContainerRegistro2:{
        marginTop: 15,
        display: 'flex',
        flexDirection: 'column',
    },
    TextoRegistro: {
        fontSize: 23,
        fontFamily: 'Pacifico',
        color: '#463f3a',
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    InputRegistro: {
        height: 40,
        borderColor: "#6b705c",
        color: '#CCD5AE',
        fontFamily: 'Pacifico',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginBottom: 16,
    },  
    MarcaAgua: {
        color: '#CAC080',
        fontSize: 10,
        fontFamily: 'Pacifico',
        position: 'absolute',
        bottom: 10,
    }
})