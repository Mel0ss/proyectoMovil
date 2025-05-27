import React , {useEffect, useState} from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { BarChart } from 'react-native-gifted-charts';
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function AnalisisFinanciero() {
    const [datos, setDatos] = useState(null)

    const obtenerAnalisis = async () => {
      const usuario = await AsyncStorage.getItem('usuario')
      const id_usuario = JSON.parse(usuario).id_usuario

      try {
        const res = await fetch(`http://localhost:3000/api/analisis/${id_usuario}`)
        const data = await res.json()
        setDatos(data)
      } catch (error) {
        console.error("Error al obtener el análisis: ", error)
      }
    }

    useEffect(() => {
      obtenerAnalisis()
    }, [])

    if (!datos) {
      return <Text style={{textAlign: 'center', marginTop: 50}}>Cargando...</Text>
    }

    const barData = [
      {value: datos.promedioIngresos, label: 'Ingresos', frontColor: '#ccd5ae'},
      {value: datos.promedioGastos, label: 'Gastos', frontColor: '#6b705c'}
    ]

    return (
      <ScrollView style={styles.ContainerAnalisis} contentContainerStyle={{ paddingBottom: 60 }}>
        <Text style={styles.Titulo}>Análisis de Ingresos y Gastos</Text>

        <View style={styles.Card}>
          <Text style={styles.Subtitulo}>Promedio Mensual</Text>
          <Text style={styles.info}>Ingresos: ${datos.promedioIngresos}</Text>
          <Text style={styles.info}>Gastos: ${datos.promedioGastos}</Text>
        </View>

        <View style={styles.Card}>
          <Text style={styles.Subtitulo}>Porcentaje de Ahorro</Text>
          <Text style={styles.valor}>{datos.porcentajeAhorro}%</Text>
        </View>

        <View style={styles.Card}>
          <Text style={styles.Subtitulo}>Gasto por Categoría</Text>
          {datos.gastosPorCategoria.map((cat, i) => (
            <Text key={i} style={styles.info}>{cat.categoria}: ${cat.total}</Text>
          ))}
        </View>

        <View style={styles.Card}>
          <Text style={styles.Subtitulo}>Relación Ingresos-Gastos</Text>
          <Text style={styles.valor}>
            {datos.relacion === 'positivo' ? 'Positivo' : 'Negativo'} ({datos.relacion === 'positivo' ? '+' : '-'}${datos.diferencia})
          </Text>
        </View>

        <View style={styles.Card}>
          <Text style={styles.Subtitulo}>Gráfico Ingresos vs Gastos</Text>
          <BarChart 
              data={barData}
              barWidth={40}
              maxValue={Math.max(datos.promedioIngresos, datos.promedioGastos) + 500}
              yAxisLabelPrefix="$"
              yAxisTextStyle={{ color: 'gray' }}
              xAxisLabelTextStyle={{ color: 'gray' }}
              yAxisLabelWidth={50}
              isAnimated
          />
        </View>
        
        <Text style={styles.MarcaAgua} >Acciones & Gestión S.A.S</Text>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  ContainerAnalisis: {
    flex: 1,
    backgroundColor: "#FEFAE0",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  Titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#463f3a",
    textAlign: "center",
  },
  Card: {
    backgroundColor: "#E9EDC9",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  Subtitulo: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#463f3a",
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
    color: "#463f3a",
  },
  valor: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#6b705c",
  },
  MarcaAgua:{
    color: '#CAC080',
    fontSize: 10,
    fontFamily: 'Pacifico',
    textAlign: 'center',
    marginVertical: 20,
  }
})