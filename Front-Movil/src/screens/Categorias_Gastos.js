import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, Button, TextInput, TouchableOpacity, Image, ScrollView, StatusBar} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFocusEffect } from '@react-navigation/native';


function CategoriaScreen({ tipo }) {
  const [categorias, setCategorias] = useState([]);
  const [nombreCategoria, setNombreCategoria] = useState('');
  const [mostrarCuadro, setMostrarCuadro] = useState(false);

  const obtenerCategorias = async () => {
    const usuario = await AsyncStorage.getItem('usuario');
    const id_usuario = JSON.parse(usuario).id_usuario;

    try {
      const res = await fetch(`http://localhost:3000/api/categorias/${id_usuario}`);
      const data = await res.json();
      const filtradas = data.filter(cat => cat.tipo.toLowerCase() === tipo.toLowerCase())
      setCategorias(filtradas);
    } catch (error) {
      console.error("Error al traer la lista de categorías: ", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      obtenerCategorias();
    }, [tipo])
  )

  const crearCategoria = async () => {
    const usuario = await AsyncStorage.getItem('usuario');
    const id_usuario = JSON.parse(usuario).id_usuario;

    try {
      const response = await fetch("http://localhost:3000/api/categorias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: nombreCategoria,
          tipo: tipo,
          id_usuario2: id_usuario
        })
      });
      const data = await response.json();
      alert(data.message);
      setNombreCategoria('');
      setMostrarCuadro(false);
      obtenerCategorias();
    } catch (error) {
      console.error("Error al crear categoría:", error);
    }
  };

  const eliminarCategoria = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/categorias/${id}`, {
        method: "DELETE"
      });
      const data = await res.json();
      alert(data.message);
      obtenerCategorias();
    } catch (error) {
      console.error("Error al eliminar categoría", error);
    }
  };

  return (
    <View style={styles.ContainerCategorias}>
      <Text style={styles.Titulo}>Tus categorías de {tipo}</Text>
      <ScrollView contentContainerStyle={styles.ContainerCategorias2}>
        {categorias.map((cat) => (
          <View key={cat.id_categoria} style={styles.ContainerCard}>
            <TouchableOpacity
              style={styles.BotonEliminar}
              onPress={() => eliminarCategoria(cat.id_categoria)}
            >
              <Text style={styles.TextoEliminar}>×</Text>
            </TouchableOpacity>
            <Image source={require("../Icons/cat-icon.png")} />
            <Text style={styles.TextCard}>{cat.nombre}</Text>
          </View>
        ))}
        <View style={styles.ContainerCard}>
          <TouchableOpacity onPress={() => setMostrarCuadro(true)}>
            <Image source={require("../Icons/Agregar-icon.png")} />
            <Text style={styles.TextCard}>Agregar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {mostrarCuadro && (
        <View style={styles.CuadroCategoria}>
          <Text style={{ color: "black" }}>Nombre de la categoría:</Text>
          <TextInput
            style={styles.InputCategorias}
            placeholder="Categoría"
            value={nombreCategoria}
            onChangeText={setNombreCategoria}
          />
          <TouchableOpacity onPress={crearCategoria}>
            <Text style={{ color: "green" }}>Guardar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setMostrarCuadro(false)}>
            <Text style={{ color: "blue" }}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.MarcaAgua}>Acciones & Gestión S.A.S</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function Categorias() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#FAEDCD' },
        tabBarActiveTintColor: '#D4A373',
      }}
    >
      <Tab.Screen
        name="Gastos"
        children={() => <CategoriaScreen tipo="gasto" />}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Ingresos"
        children={() => <CategoriaScreen tipo="ingreso" />}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  ContainerCategorias: {
    flex: 1,
    backgroundColor: "#FEFAE0",
    padding: 20,
    alignItems: "center",
  },
  Titulo: {
    fontSize: 30,
    color: "#463f3a",
    marginVertical: 10,
  },
  ContainerCategorias2: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingBottom: 100,
  },
  ContainerCard: {
    width: 80,
    height: 120,
    margin: 10,
    backgroundColor: "#E9EDC9",
    alignItems: "center",
    borderRadius: 20,
    paddingTop: StatusBar.currentHeight || 20,
  },
  TextCard: {
    color: "#463f3a",
    textAlign: "center",
  },
  CuadroCategoria: {
    position: "absolute",
    width: 250,
    top: 150,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    zIndex: 100,
  },
  InputCategorias: {
    height: 40,
    borderColor: "#6b705c",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: "100%",
    color: "#000",
  },
  BotonEliminar: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "#cd9777",
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  TextoEliminar: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    lineHeight: 18,
  },
  MarcaAgua: {
    color: "#CAC080",
    fontSize: 10,
    fontFamily: "Pacifico",
    position: "absolute",
    bottom: 10,
  },
});
