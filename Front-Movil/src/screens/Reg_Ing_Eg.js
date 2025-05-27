import React, {  useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, TextInput, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from "@react-native-async-storage/async-storage";

function IngresosScreen({navigation}) {
    const [descripcion, setDescripcion] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [categoria, setCategoria] = useState("");
    const [fecha, setFecha] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

    useEffect(() => {
  const obtenerCategorias = async () => {
    try {
      const usuario = await AsyncStorage.getItem("usuario");
      const usuarioParseado = JSON.parse(usuario);
      const id_usuario = usuarioParseado.id_usuario;

      const response = await fetch(`http://localhost:3000/api/categorias/${id_usuario}`);
      const data = await response.json();

      if (response.ok) {
        setCategorias(data);
      } else {
        console.error("Error al obtener categorías");
      }
    } catch (error) {
      console.error("Error cargando categorías:", error);
    }
  };

    obtenerCategorias();
    }, []);

    const registrarIngreso = async () => {
    if (!descripcion || !cantidad || !categoriaSeleccionada || !fecha) {
      Alert.alert("Error", "Por favor completa todos los campos.");
      return;
    }

    try {
      const usuario = await AsyncStorage.getItem("usuario");
      const usuarioParseado = JSON.parse(usuario);
      const id_usuario2 = usuarioParseado.id_usuario;

      const response = await fetch("http://localhost:3000/api/registrar_movimiento", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tipo: "Ingreso",
          descripcion,
          cantidad: parseFloat(cantidad),
          fecha,
          id_categoria2: categoriaSeleccionada,
          id_usuario2,
        }),
      });

      if (response.ok) {
        Alert.alert("Éxito", "Ingreso registrado correctamente.");
        navigation.navigate("Dashboard");
      } else {
        Alert.alert("Error", "No se pudo registrar el ingreso.");
      }
    } catch (error) {
      console.error("Error al registrar ingreso:", error);
      Alert.alert("Error", "Error al registrar ingreso.");
    }
    };

    return (
        <View style={styles.ContainerRegistro}>
        <Text style={styles.TitulosRegistro}>Registros de Ingresos</Text>
        <View style={styles.CuadritoRegistro}>
            <View style={styles.ContainerRegistro2}>
                <Text style={styles.TextoRegistro2}>Descripción: </Text>
                <TextInput 
                    style={styles.InputRegistro} 
                    placeholder="Pago de nómina, Trabajo con XXX, etc..."
                    value={descripcion} 
                    onChangeText={setDescripcion} 
                />
            </View>
            <View style={styles.ContainerRegistro2}>
                <Text style={styles.TextoRegistro2} >Cantidad: </Text>
                <TextInput
                    style={styles.InputRegistro}
                    placeholder="$$$$"
                    value={cantidad}
                    onChangeText={setCantidad}
                    keyboardType="numeric"
                />
            </View>
            <View style={styles.ContainerRegistro2}>
                <Text style={styles.TextoRegistro2}>Categoría: </Text>
                <View style={{ borderWidth: 1, borderColor: "#6b705c", borderRadius: 5, marginBottom: 16 }}>
                    <Picker
                    selectedValue={categoriaSeleccionada}
                    onValueChange={(itemValue) => setCategoriaSeleccionada(itemValue)}
                    style={styles.picker}
                    >
                    <Picker.Item label="--" value={null} />
                    {categorias.map((cat) => (
                        <Picker.Item key={cat.id_categoria} label={cat.nombre} value={cat.id_categoria} />
                    ))}
                    </Picker>
                </View>
            </View>
            <View style={styles.ContainerRegistro2}>
                <Text style={styles.TextoRegistro2}>Fecha: </Text>
                <TextInput 
                    style={styles.InputRegistro} 
                    placeholder="AAAA/MM/DD" 
                    value={fecha}
                    onChangeText={setFecha}
                />
            </View>
            <Button title="Registrar" onPress={registrarIngreso} color="#CCD5AE"/>
        </View>
        <Text style={styles.MarcaAgua} >Acciones & Gestión S.A.S</Text>
    </View>
    );
  }

const Tab = createBottomTabNavigator();

function EgresosScreen({navigation}) {
    const [descripcion, setDescripcion] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [categoria, setCategoria] = useState("");
    const [fecha, setFecha] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

    useEffect(() => {
  const obtenerCategorias = async () => {
    try {
      const usuario = await AsyncStorage.getItem("usuario");
      const usuarioParseado = JSON.parse(usuario);
      const id_usuario = usuarioParseado.id_usuario;

      const response = await fetch(`http://localhost:3000/api/categorias/${id_usuario}`);
      const data = await response.json();

      if (response.ok) {
        setCategorias(data);
      } else {
        console.error("Error al obtener categorías");
      }
    } catch (error) {
      console.error("Error cargando categorías:", error);
    }
  };

    obtenerCategorias();
    }, []);

    const registrarEgreso = async () => {
    if (!descripcion || !cantidad || !categoriaSeleccionada || !fecha) {
      Alert.alert("Error", "Por favor completa todos los campos.");
      return;
    }

    try {
      const usuario = await AsyncStorage.getItem("usuario");
      const usuarioParseado = JSON.parse(usuario);
      const id_usuario2 = usuarioParseado.id_usuario;

      const response = await fetch("http://localhost:3000/api/registrar_movimiento", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tipo: "Gasto",
          descripcion,
          cantidad: parseFloat(cantidad),
          fecha,
          id_categoria2: parseInt(categoria), // Debe ser el ID de la categoría
          id_usuario2,
        }),
      });

      if (response.ok) {
        Alert.alert("Éxito", "Gasto registrado correctamente.");
        navigation.navigate("Dashboard");
      } else {
        Alert.alert("Error", "No se pudo registrar el gasto.");
      }
    } catch (error) {
      console.error("Error al registrar gasto:", error);
      Alert.alert("Error", "Error al registrar gasto.");
    }
    };
    return (
     <View style={styles.ContainerRegistro}>
        <Text style={styles.TitulosRegistro}>Registros de Ingresos</Text>
        <View style={styles.CuadritoRegistro}>
            <View style={styles.ContainerRegistro2}>
                <Text style={styles.TextoRegistro2}>Descripción: </Text>
                <TextInput 
                    style={styles.InputRegistro} 
                    placeholder="Pago de nómina, Trabajo con XXX, etc..."
                    value={descripcion} 
                    onChangeText={setDescripcion} 
                />
            </View>
            <View style={styles.ContainerRegistro2}>
                <Text style={styles.TextoRegistro2} >Cantidad: </Text>
                <TextInput
                    style={styles.InputRegistro}
                    placeholder="$$$$"
                    value={cantidad}
                    onChangeText={setCantidad}
                    keyboardType="numeric"
                />
            </View>
            <View style={styles.ContainerRegistro2}>
                <Text style={styles.TextoRegistro2}>Categoría: </Text>
                <View style={{ borderWidth: 1, borderColor: "#6b705c", borderRadius: 5, marginBottom: 16 }}>
                    <Picker
                        selectedValue={categoriaSeleccionada}
                        onValueChange={(itemValue) => setCategoriaSeleccionada(itemValue)}
                        style={{ height: 40, color: "#463f3a" }}
                        >
                        <Picker.Item label="Seleccione una categoría" value={null} />
                        {categorias.map((cat) => (
                            <Picker.Item key={cat.id_categoria} label={cat.nombre} value={cat.id_categoria} />
                        ))}
                    </Picker>
                </View>
            </View>
            <View style={styles.ContainerRegistro2}>
                <Text style={styles.TextoRegistro2}>Fecha: </Text>
                <TextInput 
                    style={styles.InputRegistro} 
                    placeholder="AAAA/MM/DD" 
                    value={fecha}
                    onChangeText={setFecha}
                />
            </View>
            <Button title="Registrar" onPress={registrarEgreso} color="#CCD5AE"/>
        </View>
        <Text style={styles.MarcaAgua} >Acciones & Gestión S.A.S</Text>
    </View>
    );
}

export default function Reg_Ing_Eg(){
    return(
        <Tab.Navigator screenOptions={{
            tabBarStyle: { backgroundColor: '#FAEDCD' },
            tabBarIndicatorStyle: { backgroundColor: '#FAEDCD' },
            tabBarActiveTintColor: '#D4A373',   
            swipeEnabled: false,                     
        }}>
            <Tab.Screen name="Ingresos" component={IngresosScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Gastos" component={EgresosScreen} options={{ headerShown: false }} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    ContainerRegistro: {
        flex: 1,
        backgroundColor: '#FEFAE0',
        alignItems: 'center',
        justifyContent: 'center',
      },
    TitulosRegistro:{
        fontSize: 42,
        fontFamily: 'Pacifico',
        color: '#463f3a',
        paddingHorizontal: 10,
        borderRadius: 5,
        alignItems: 'center'
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
    TextoRegistro2: {
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
    picker: {
        width: 250,
        marginVertical: 10,
        backgroundColor: '#DDE5B6',
        borderRadius: 8,
        fontSize: 20,
        fontFamily: 'Pacifico',
    },
      MarcaAgua:{
        color: '#CAC080',
        fontSize: 10,
        fontFamily: 'Pacifico',
        position: 'absolute',
        bottom: 10,
    }
})