import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function Dashboard({navigation}){
    return(
        <View style={styles.ContainerDasboard}> 
            <Text style={styles.TextoDashboard} >Bienvenid@, Esperamos que tenga una buena experiecia</Text>
            <View style={styles.DashboardIcon}>
                <View style={styles.CuadritoDash}>
                    <View>
                        <TouchableOpacity style={styles.IconosDash} onPress={() => navigation.navigate('Categorias de Gastos')}>
                        <Image source={require('../Icons/Categoria-icon.png')} ></Image>
                        <Text style={styles.TextoiconDashboard} >Categorias de Gastos</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.IconosDash} onPress={() => navigation.navigate('Registros de Ingresos y Egresos')}>
                        <Image source={require('../Icons/Registro-icon.png')} ></Image>
                        <Text style={styles.TextoiconDashboard} >Registros de Ingresos y Egresos</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.IconosDash} onPress={() => navigation.navigate('Lista de Gastos e Ingresos')}>
                        <Image source={require('../Icons/Lista-icon.png')} ></Image>
                        <Text style={styles.TextoiconDashboard} >Lista de Gastos e Ingresos</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                    <TouchableOpacity style={styles.IconosDash} onPress={() => navigation.navigate('Análisis de Gastos e Ingresos')}>
                        <Image source={require('../Icons/Analisis-icon.png')} ></Image>
                        <Text style={styles.TextoiconDashboard} >Análisis de Gastos e Ingresos</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <Text style={styles.MarcaAgua} >Acciones & Gestión S.A.S</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    ContainerDasboard: {
      flex: 1,
      backgroundColor: '#FEFAE0',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    TextoDashboard:{
        fontSize: 30,
        fontFamily: 'Pacifico',
        color: '#463f3a',
        textAlign: 'center'
    },
    DashboardIcon:{
        margin: 20,
    },    
    CuadritoDash: {
        display: 'flex',
        flexDirection: 'column',
    },
    IconosDash:{
        margin: 5,
        width: 115,
        height:115,
        backgroundColor: '#E9EDC9',
        alignItems: 'center',
        justifyContent: 'space-around',    
        borderRadius: 40,
    },
    TextoiconDashboard:{
        fontSize: 10,
        fontFamily: 'Pacifico',
        marginTop: 5,
        color: '#463f3a',
        textAlign: 'center'
    },
    MarcaAgua:{
        color: '#CAC080',
        fontSize: 10,
        fontFamily: 'Pacifico',
        position: 'absolute',
        bottom: 10,
    }

  });
  