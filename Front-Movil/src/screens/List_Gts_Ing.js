import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from "@react-native-picker/picker";

export default function List_Gts_Ing() {
  const [data, setData] = useState([]);
  const [tipo, setTipo] = useState("Seleccionar");
  const [idUsuario, setIdUsuario] = useState(null);

  useEffect(() => {
    const obtenerUsuario = async () => {
      const usuarioGuardado = await AsyncStorage.getItem("usuario");
      if (usuarioGuardado) {
        const usuario = JSON.parse(usuarioGuardado);
        setIdUsuario(usuario.id_usuario);
      }
    };
    obtenerUsuario();
  }, []);

  const ValidacionTipo = async (itemValue) => {
    setTipo(itemValue);
    setData([]);

    let tipoFormatoBD = "";
    if (itemValue === "Ingresos") tipoFormatoBD = "Ingreso";
    else if (itemValue === "Gastos") tipoFormatoBD = "Gasto";
    else return;

    if (!idUsuario) {
      Alert.alert("Error", "Usuario no identificado.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/listar_movimientos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tipo: tipoFormatoBD, id_usuario: idUsuario }),
      });

      const result = await response.json();

      if (!response.ok) throw new Error("Error del servidor");
      setData(result);
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "No se pudieron obtener los datos");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.textoCategoria}>{item.categoria}</Text>
      <Text style={styles.textoDescripcion}>{item.descripcion}</Text>
      <Text style={styles.textoCantidad}>${item.cantidad}</Text>
      <Text style={styles.textoFecha}>{item.fecha}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Movimientos</Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={tipo}
          onValueChange={ValidacionTipo}
          style={styles.picker}
        >
          <Picker.Item label="Seleccionar" value="Seleccionar" />
          <Picker.Item label="Ingresos" value="Ingresos" />
          <Picker.Item label="Gastos" value="Gastos" />
        </Picker>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.textoVacio}>No hay movimientos aún.</Text>}
      />

      <Text style={styles.marcaAgua}>Acciones & Gestión S.A.S</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFAE0',
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontFamily: 'Pacifico',
    textAlign: 'center',
    marginBottom: 20,
    color: '#463f3a',
  },
  pickerContainer: {
    backgroundColor: '#E9EDC9',
    borderRadius: 10,
    marginBottom: 20,
  },
  picker: {
    height: 50,
    fontFamily: 'Pacifico',
  },
  item: {
    backgroundColor: '#E9EDC9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  textoCategoria: {
    fontSize: 18,
    fontFamily: 'Pacifico',
    color: '#6b705c',
  },
  textoDescripcion: {
    fontSize: 16,
    color: '#463f3a',
  },
  textoCantidad: {
    fontSize: 16,
    color: '#588157',
  },
  textoFecha: {
    fontSize: 14,
    color: '#999',
  },
  textoVacio: {
    fontFamily: 'Pacifico',
    textAlign: 'center',
    marginTop: 40,
    color: '#aaa',
  },
  marcaAgua: {
    fontSize: 10,
    fontFamily: 'Pacifico',
    textAlign: 'center',
    position: 'absolute',
    bottom: 10,
    width: '100%',
    color: '#CAC080',
  },
});
