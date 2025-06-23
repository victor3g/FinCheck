import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import Card from './Card';

// O cálculo da largura é feito com base no container pai, tornando-o mais robusto.
const screenWidth = Dimensions.get('window').width;
const chartWidth = screenWidth * 0.95 - 60; // 95% da tela - padding (15*2 do mainBox + 15*2 do card)

const chartConfig = {
  backgroundColor: '#f1f5f9',
  backgroundGradientFrom: '#f1f5f9',
  backgroundGradientTo: '#f1f5f9',
  decimalPlaces: 0,
  color: () => '#A020F0',
  labelColor: () => '#333',
  style: {
    borderRadius: 10,
  },
};

const GraficoBarrasCard = ({ data }) => {
  return (
    <Card>
      <BarChart
        data={data}
        width={chartWidth}
        height={220}
        yAxisLabel="R$"
        yAxisSuffix="k"
        chartConfig={chartConfig}
        style={styles.chart}
        fromZero
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  chart: {
    borderRadius: 10,
  },
});

export default GraficoBarrasCard;