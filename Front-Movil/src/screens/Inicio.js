import React from "react";
import { StyleSheet, View, Button, Text } from "react-native";

export default function Inicio({navigation}){ 
    return(
        <View style={styles.ContainerInicio}>
            <Text style={styles.TextoBienvenida}>Bienvenid@ </Text>
            <View style={styles.CuadritoInicio}>
            <View style={styles.BotonesInicio}><Button title="Inicio de sesión" onPress={() => navigation.navigate("Login")} color="#CCD5AE" /></View>
            <View style={styles.BotonesInicio}><Button title="Registro" onPress={() => navigation.navigate("Registro")} color="#CCD5AE"/></View>
            </View>
            <Text style={styles.MarcaAgua} >Acciones & Gestión S.A.S</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    ContainerInicio: {
      flex: 1,
      backgroundColor: '#FEFAE0',
      alignItems: 'center',
      justifyContent: 'center',
    },
    TextoBienvenida:{
        fontSize: 65,
        fontFamily: 'Pacifico',
        color: '#463f3a',
    },
    CuadritoInicio: {
        width: 300,
        backgroundColor: '#E9EDC9',
        alignItems: 'center',
        justifyContent: 'space-around',    
        borderRadius: 20,
    },
    BotonesInicio: {
        margin: '5%',
        width: 200,
    },
    MarcaAgua:{
        color: '#CAC080',
        fontSize: 10,
        fontFamily: 'Pacifico',
        position: 'absolute',
        bottom: 10,
    }
  });
  