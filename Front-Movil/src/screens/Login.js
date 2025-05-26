import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from "react-native-gesture-handler";

export default function Login({navigation}){
    const [login, setLogin] = useState({ email: '', password: ''})

    const handleSubmit = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/ingreso", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(login)
            })

            const data = await response.json()

            if (response.ok){
                await AsyncStorage.setItem('token', data.token)
                await AsyncStorage.setItem('usuario', JSON.stringify(data.usuario))
                navigation.navigate('Dashboard');
            } else {
                alert(data.message)
            }
        } catch (error){
            console.error("Error en el inicio de sesión: ", error)

        }
    }

    return(
        <View style={styles.ContainerLogin}>
            <View style={styles.CuadritoLogin}>
                <View style={styles.ContainerLogin2}>
                    <Text style={styles.TextoLogin}>Ingresa correo electrónico: </Text>
                    <TextInput 
                        style={styles.InputLogin} 
                        placeholder="Correo electrónico"
                        value={login.email}
                        onChangeText={(Text) => setLogin({...login, email: Text})}
                     />
                </View>
                <View style={styles.ContainerLogin2}>
                    <Text style={styles.TextoLogin}>Ingresa contraseña: </Text>
                    <TextInput 
                        style={styles.InputLogin} 
                        placeholder="Contraseña" 
                        value={login.password}
                        secureTextEntry 
                        onChangeText={(text) => setLogin({...login, password: text})}
                    />
                </View>
                <Button title="Entrar" onPress={handleSubmit} color="#CCD5AE"/>
            </View>
            <Text style={styles.MarcaAgua} >Acciones & Gestión S.A.S</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    ContainerLogin: {
      flex: 1,
      backgroundColor: '#FEFAE0',
      alignItems: 'center',
      justifyContent: 'center',
    },
    CuadritoLogin: {
        width: 300, 
        backgroundColor: '#E9EDC9',
        alignItems: 'center',
        justifyContent: 'space-around',    
        borderRadius: 20,
    },
    ContainerLogin2:{
        marginTop: 15,
        display: 'flex',
        flexDirection: 'column',
    },
    TextoLogin: {
        fontSize: 23,
        fontFamily: 'Pacifico',
        color: '#463f3a',
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    InputLogin: {
        height: 40,
        borderColor: "#6b705c",
        color: '#CCD5AE',
        fontFamily: 'Pacifico',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginBottom: 16,
    },    
    MarcaAgua:{
        color: '#CAC080',
        fontSize: 10,
        fontFamily: 'Pacifico',
        position: 'absolute',
        bottom: 10,
    }
});