import React, {useState} from "react";
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, TextInput, Image } from "react-native";

export default function Categorias_Gastos({navigation}){
    const [mostrarCuadro, setMostrarCuadro] = useState(false)
    const [nombreCategoria, setNombreCategoria] = useState('')
    const [tipoCategoria, setTipoCategoria] = useState('gasto')
    const [idUsuario2, setIdUsuario2] = useState(1)

    const handleCrearCategoria = async () => {
        const data = {
            nombre: nombreCategoria,
            tipo: tipoCategoria,
            id_usuario2: idUsuario2
        }

        try {
            const response = await fetch("http://192.168.1.11:3000/api/categorias", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            })
            const data = await response.json()
            if (response.ok) {
                alert(data.message)
                setMostrarCuadro(false)
                setNombreCategoria('')
            } else {
                alert(data.message)
            }
        } catch (error) {
            console.error("Error al crear categoría:", error)
        }
    }

    return(
        <View style={styles.ContainerCategorias}>
            <Text style={styles.Titulo}>Tus categorías actuales</Text>
            <View style={styles.ContainerCategorias2}>
                <View style={styles.ContainerCard}>
                    <TouchableOpacity style={styles.BotonEliminar}>
                        <Text style={styles.TextoEliminar}>×</Text>
                    </TouchableOpacity>
                    <Image source={require('../Icons/Casa-icon.png')}></Image>
                    <Text style={styles.TextCard}>Casa</Text>
                </View>
                <View style={styles.ContainerCard}>
                    <TouchableOpacity style={styles.BotonEliminar}>
                        <Text style={styles.TextoEliminar}>×</Text>
                    </TouchableOpacity>
                    <Image source={require('../Icons/Ocio-icon.png')}></Image>
                    <Text style={styles.TextCard}>Ocio</Text>
                </View>
                <View style={styles.ContainerCard}>
                    <TouchableOpacity style={styles.BotonEliminar}>
                        <Text style={styles.TextoEliminar}>×</Text>
                    </TouchableOpacity>
                    <Image source={require('../Icons/Educacion-icon.png')}></Image>
                    <Text style={styles.TextCard}>Educación</Text>
                </View>
                <View style={styles.ContainerCard}>
                    <TouchableOpacity style={styles.BotonEliminar}>
                        <Text style={styles.TextoEliminar}>×</Text>
                    </TouchableOpacity>
                    <Image source={require('../Icons/Transporte-icon.png')}></Image>
                    <Text style={styles.TextCard}>Transporte</Text>
                </View>
                <View style={styles.ContainerCard}>
                    <TouchableOpacity style={styles.BotonEliminar}>
                        <Text style={styles.TextoEliminar}>×</Text>
                    </TouchableOpacity>
                    <Image source={require('../Icons/Alimentos-icon.png')}></Image>
                    <Text style={styles.TextCard}>Alimentos</Text>
                </View>
                <View style={styles.ContainerCard}>
                    <TouchableOpacity onPress={() => setMostrarCuadro(true)}>
                        <Image source={require('../Icons/Agregar-icon.png')}></Image>
                        <Text style={styles.TextCard}>Agregar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {mostrarCuadro && (
                    <View style={styles.CuadroCategoria}>
                        <Text style={{ color: 'black' }}>Nombre de la categoría:</Text>
                        <TextInput 
                        style={styles.InputCategorias} 
                        placeholder="Categoría" 
                        value={nombreCategoria}
                        onChangeText={setNombreCategoria}
                        />
                        <Text style={{ color: 'black' }}>Tipo (gasto/ingreso):</Text>
                        <TextInput 
                        style={styles.InputCategorias} 
                        placeholder="Tipo" 
                        value={tipoCategoria}
                        onChangeText={setTipoCategoria}
                        />
                        <TouchableOpacity onPress={handleCrearCategoria}>
                            <Text style={{color: 'green'}}>Guardar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setMostrarCuadro(false)}>
                        <Text style={{ color: 'blue' }}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                    )}
            <Text style={styles.MarcaAgua} >Acciones & Gestión S.A.S</Text>
        </View> 
    )
}

const styles = StyleSheet.create({
    ContainerCategorias:{
        flex: 1,
        display: 'flex',
        backgroundColor: '#FEFAE0',
        alignContent: 'space-around',
        justifyContent: 'space-around',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    Titulo: {
        fontSize: 30,
        color: '#463f3a'
    },
    ContainerCategorias2: {
        display: 'flex',
        width: 320,
        height: 550,
        backgroundColor: '#E9EDC9',
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderRadius: 20
    },
    ContainerCard:{
        width: 80,
        height: 120,
        display: 'flex',
        paddingTop: StatusBar.currentHeight || 30,
        backgroundColor: '#E9EDC9',
        alignItems: 'center',
        borderRadius: 20
    },
    TextCard: {
        color: '#463f3a'
    },
    CuadroCategoria: {
        position: 'absolute',
        width: 200,
        height: 100, 
        top: 150,
        left: 80,
        right: 70,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 15,
        alignItems: 'center',
        zIndex: 100,
    },
    InputCategorias: {
        height: 40,
        borderColor: "#6b705c",
        color: '#CCD5AE',
        fontFamily: 'Pacifico',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginBottom: 16,
    },
    BotonEliminar: {
        position: 'absolute',
        top: 5,
        right: 5,
        zIndex: 10,
        backgroundColor: '#cd9777',
        borderRadius: 10,
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    TextoEliminar: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
        lineHeight: 18,
    },
    MarcaAgua:{
        color: '#CAC080',
        fontSize: 10,
        fontFamily: 'Pacifico',
        position: 'absolute',
        bottom: 10,
    }
})