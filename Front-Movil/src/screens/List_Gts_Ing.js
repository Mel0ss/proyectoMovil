import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function List_Gts_Ing({navigation}){

    const [tipo, setTipo] = useState("");
    const [data, setData] = useState([]);

      const ValidacionTipo = async (itemValue) => {
        setTipo(itemValue)

        if (!itemValue) {
          setData([]);
          return;
        }

        try {
          const usuario = await AsyncStorage.getItem("usuario");
          const usuarioParseado = JSON.parse(usuario);
          const id_usuario = usuarioParseado.id_usuario;

          const response = await fetch("http://localhost:3000/api/listar_movimientos", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              tipo: itemValue.slice(0, -1), // "Ingresos" -> "Ingreso"
              id_usuario
            })
          });

          if (!response.ok) throw new Error("Error al obtener movimientos");

          const movimientos = await response.json();

          const datosAdaptados = movimientos.map((item) => ({
            id: item.id_movimiento.toString(),
            tipo: item.tipo,
            descripcion: item.descripcion,
            cantidad: item.cantidad,
            categoria: item.nombre_categoria,
            fecha: item.fecha
          }));

          setData(datosAdaptados)
        } catch (error) {
          console.error("Error al obtener movimientos:", error)
          setData([])
        }
      };

    return(
        <View style={styles.ContainerLista}>
            <Text style={styles.TituloLista}>Lista de Gastos e Ingresos</Text>
            <Picker
                selectedValue={tipo}
                onValueChange={ValidacionTipo}
                style={styles.picker}
                itemStyle={styles.TextoLista}
            >
                <Picker.Item label="         --" value="" />
                <Picker.Item label="Ingresos" value="Ingresos" />
                <Picker.Item label="Gastos" value="Gastos" />
            </Picker>
            <FlatList
                data={data}
                keyExtractor={(item)=> item.id}
                contentContainerStyle={{ paddingBottom: 50 }}
                renderItem={({item}) => (
                <View style={styles.ficha}>
                  <Text style={styles.TituloLista2}>{item.tipo}</Text>
                  <Text style={styles.TextoLista}>Cantidad: {item.cantidad}</Text>
                  <Text style={styles.TextoLista}>Descripción: {item.descripcion}</Text>
                  <Text style={styles.TextoLista}>Categoria: {item.categoria}</Text>
                  <Text style={styles.TextoLista}>Fecha: {item.fecha}</Text>
                  </View>
                )}
            />
            <Text style={styles.MarcaAgua} >Acciones & Gestión S.A.S</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    ContainerLista: {
        flex: 1,
        display: 'flex',
        backgroundColor: '#FEFAE0',
        alignItems: 'center',
        justifyContent: 'space-around',
      },
    TituloLista:{
        fontSize: 42,
        fontFamily: 'Pacifico',
        color: '#463f3a',
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    picker: {
        width: 250,
        marginVertical: 10,
        backgroundColor: '#DDE5B6',
        borderRadius: 8,
        fontSize: 20,
        fontFamily: 'Pacifico',
      },
    TituloLista2:{
        fontSize: 25,
        fontFamily: 'Pacifico',
        color: '#463f3a',
        fontWeight: 'bold'
    },
    TextoLista:{
        fontSize: 18,
        fontFamily: 'Pacifico',
        marginTop: 5,
        color: '#463f3a',
        textAlign: 'center'
    },
    ficha: {
        width: 250, 
        backgroundColor: '#E9EDC9',
        alignItems: 'center',  
        borderRadius: 15,
        margin: 15,
    },
    MarcaAgua:{
        color: '#CAC080',
        fontSize: 10,
        fontFamily: 'Pacifico',
        position: 'absolute',
        bottom: 10,
    },
    CajitaLista: {
      flex: 1
    }
});