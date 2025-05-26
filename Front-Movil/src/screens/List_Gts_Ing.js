import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Picker } from '@react-native-picker/picker';

export default function List_Gts_Ing({navigation}){

    const [tipo, setTipo] = useState("");
    const [data, setData] = useState([]);

    const Api_ingresos = [
        {
            id: '1',
            tipo: 'Ingreso',
            descripcion: 'Salario de abril',
            cantidad: 2500000,
            categoria: 'Nómina',
            fecha: '01/05/2025',
          },
          {
            id: '2',
            tipo: 'Ingreso',
            descripcion: 'Emprendimiento pulseras',
            cantidad: 120000,
            categoria: 'Trabajo Extra',
            fecha: '02/05/2025',
          },
          {
            id: '3',
            tipo: 'Ingreso',
            descripcion: 'Freelance diseño',
            cantidad: 800000,
            categoria: 'Trabajo Extra',
            fecha: '04/05/2025',
          },
      ];

      const Api_gastos = [
        {
            id: '1',
            tipo: 'Gasto',
            descripcion: 'Arenero inteligente',
            cantidad: 500000,
            categoria: 'Mascota',
            fecha: '01/05/2025',
          },
          {
            id: '2',
            tipo: 'Gasto',
            descripcion: 'Supermercado',
            cantidad: 350000,
            categoria: 'Alimentos',
            fecha: '02/05/2025',
          },
          {
            id: '3',
            tipo: 'Gasto',
            descripcion: 'Recarga de civica',
            cantidad: 70000,
            categoria: 'Transporte',
            fecha: '04/05/2025',
          },
      ];

      const ValidacionTipo = (itemValue) => {
        setTipo(itemValue);
        if (itemValue === "Ingresos") {
          setData(Api_ingresos);
        } else if (itemValue === "Gastos") {
          setData(Api_gastos);
        } else {
          setData([]);
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