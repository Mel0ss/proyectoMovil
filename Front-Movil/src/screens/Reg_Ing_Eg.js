import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TextInput } from "react-native-gesture-handler";

function IngresosScreen({navigation}) {
    return (
        <View style={styles.ContainerRegistro}>
        <Text style={styles.TitulosRegistro}>Registros de Ingresos</Text>
        <View style={styles.CuadritoRegistro}>
            <View style={styles.ContainerRegistro2}>
                <Text style={styles.TextoRegistro2}>Descripción: </Text>
                <TextInput style={styles.InputRegistro} placeholder="Pago de nómina, Trabajo con XXX, etc..." />
            </View>
            <View style={styles.ContainerRegistro2}>
                <Text style={styles.TextoRegistro2} >Cantidad: </Text>
                <TextInput style={styles.InputRegistro} placeholder="$$$$" />
            </View>
            <View style={styles.ContainerRegistro2}>
                <Text style={styles.TextoRegistro2}>Categoría: </Text>
                <TextInput style={styles.InputRegistro} placeholder="--" />
            </View>
            <View style={styles.ContainerRegistro2}>
                <Text style={styles.TextoRegistro2}>Fecha: </Text>
                <TextInput style={styles.InputRegistro} placeholder="DD/MM/AAAA" />
            </View>
            <Button title="Registrar" onPress={() => navigation.navigate("Dashboard")} color="#CCD5AE"/>
        </View>
        <Text style={styles.MarcaAgua} >Acciones & Gestión S.A.S</Text>
    </View>
    );
  }

const Tab = createBottomTabNavigator();

function EgresosScreen({navigation}) {
    return (
      <View style={styles.ContainerRegistro}>
        <Text style={styles.TitulosRegistro}>Registros de Gastos</Text>
        <View style={styles.CuadritoRegistro}>
            <View style={styles.ContainerRegistro2}>
                <Text style={styles.TextoRegistro2}>Descripción: </Text>
                <TextInput style={styles.InputRegistro} placeholder="Pago de nómina, Trabajo con XXX, etc..." />
            </View>
            <View style={styles.ContainerRegistro2}>
                <Text style={styles.TextoRegistro2} >Cantidad: </Text>
                <TextInput style={styles.InputRegistro} placeholder="$$$$" />
            </View>
            <View style={styles.ContainerRegistro2}>
                <Text style={styles.TextoRegistro2}>Categoría: </Text>
                <TextInput style={styles.InputRegistro} placeholder="--" />
            </View>
            <View style={styles.ContainerRegistro2}>
                <Text style={styles.TextoRegistro2}>Fecha: </Text>
                <TextInput style={styles.InputRegistro} placeholder="DD/MM/AAAA" />
            </View>
            <Button title="Registrar" onPress={() => navigation.navigate("Dashboard")} color="#CCD5AE"/>
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
      MarcaAgua:{
        color: '#CAC080',
        fontSize: 10,
        fontFamily: 'Pacifico',
        position: 'absolute',
        bottom: 10,
    }
})