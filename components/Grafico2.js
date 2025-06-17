import React from 'react';
import { Text, Dimensions, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import Card from './Card';

const screenWidth = Dimensions.get('window').width;
const chartWidth = screenWidth * 0.95 - 60;

const chartConfig = {
  color: () => '#000',
};

const GraficoPizzaCard = ({ data }) => {
  return (
    <Card>
      <Text style={styles.subtitulo}>Despesas por Categoria</Text>
      <PieChart
        data={data}
        width={chartWidth}
        height={180}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  subtitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default GraficoPizzaCard;