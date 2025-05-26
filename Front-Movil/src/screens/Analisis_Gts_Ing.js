import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { BarChart } from 'react-native-gifted-charts';

export default function AnalisisFinanciero() {
    const barData = [
        { value: 10000, label: 'Ingresos', frontColor: '#ccd5ae' },
        { value: 5000, label: 'Gastos', frontColor: '#6b705c' },
      ]

  return (
    <ScrollView style={styles.ContainerAnalisis} contentContainerStyle={{ paddingBottom: 60 }}>
      <Text style={styles.Titulo}>Análisis de Ingresos y Gastos</Text>

      <View style={styles.Card}>
        <Text style={styles.Subtitulo}>Promedio Mensual</Text>
        <Text style={styles.info}>Ingresos: $1,200</Text>
        <Text style={styles.info}>Gastos: $950</Text>
      </View>

      <View style={styles.Card}>
        <Text style={styles.Subtitulo}>Porcentaje de Ahorro</Text>
        <Text style={styles.valor}>20.8%</Text>
      </View>

      <View style={styles.Card}>
        <Text style={styles.Subtitulo}>Gasto por Categoría</Text>
        <Text style={styles.info}>Alimentos: $300</Text>
        <Text style={styles.info}>Transporte: $150</Text>
        <Text style={styles.info}>Educación: $200</Text>
        <Text style={styles.info}>Ocio: $100</Text>
      </View>

      <View style={styles.Card}>
        <Text style={styles.Subtitulo}>Relación Ingresos-Gastos</Text>
        <Text style={styles.valor}>Positivo (+$250)</Text>
      </View>

      <View style={styles.Card}>
        <Text style={styles.Subtitulo}>Relación Ingresos-Gastos</Text>
        <BarChart 
            data={barData}
            barWidth={40}
            stepValue={2000}
            maxValue={10000}
            frontColor="lightblue"
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
});