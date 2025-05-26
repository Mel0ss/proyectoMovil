import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {NavigationContainer} from "@react-navigation/native";

//screens 
import Inicio from "./src/screens/Inicio"; 
import Login from "./src/screens/Login";
import Registro from "./src/screens/Registro";
import Dashboard from "./src/screens/Dashboard";
import Categorias_Gastos from "./src/screens/Categorias_Gastos";
import Reg_Ing_Eg from "./src/screens/Reg_Ing_Eg";
import List_Gts_Ing from "./src/screens/List_Gts_Ing";
import Analisis_Gts_Ing from "./src/screens/Analisis_Gts_Ing";

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

function MyStack(){
    return(
        <Stack.Navigator screenOptions={{
            headerStyle: {backgroundColor: '#FAEDCD'},
            headerTintColor: '#463f3a'
        }}>
            <Stack.Screen name='Inicio' component={Inicio} options={{ headerShown: false }}/>
            <Stack.Screen name='Login' component={Login}/>
            <Stack.Screen name='Registro' component={Registro}/>
            <Stack.Screen name='Dashboard' component={MyDrawer} options={{ headerShown: false }}/>
        </Stack.Navigator>
    )
}

function MyDrawer(){
    return(
        <Drawer.Navigator screenOptions={{
            drawerStyle: { backgroundColor: '#FAEDCD'},
            drawerActiveTintColor: '#D4A373', 
            drawerInactiveTintColor: '#463f3a',
            headerStyle: {backgroundColor: '#FAEDCD'},
            headerTintColor: '#463f3a'
        }}>
            
            <Drawer.Screen name='Dashboard' component={Dashboard}/>
            <Drawer.Screen name='Categorias de Gastos' component={Categorias_Gastos}/>
            <Drawer.Screen name='Registros de Ingresos y Egresos' component={Reg_Ing_Eg}/>
            <Drawer.Screen name='Lista de Gastos e Ingresos' component={List_Gts_Ing}/>
            <Drawer.Screen name='Análisis de Gastos e Ingresos' component={Analisis_Gts_Ing}/>
            <Drawer.Screen name='Cerrar Sesión' component={Inicio} options={{ headerShown: false }}/>
        </Drawer.Navigator>
    )
}

export default function Navigation(){
    return(
        <NavigationContainer>
            <MyStack/>
        </NavigationContainer>
    )
}