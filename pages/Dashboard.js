import React from 'react';
import { ScrollView, StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { useTransactions } from '../context/TransactionContext'; // Importar o hook
import Card from '../components/Card'; // Reutilizaremos o Card genérico
import { LineChart, BarChart } from 'react-native-chart-kit';
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const Dashboard = () => {
  const {
    transactions,
    totalReceitas,
    totalDespesas,
    saldo,
    loading
  } = useTransactions();

  if (loading) {
    return <ActivityIndicator size="large" color="#00A86B" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  // Formata os valores para moeda brasileira
  const formatCurrency = (value) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  // Dados para o gráfico de linha (saldo ao longo do tempo)
  const lineChartData = {
    labels: transactions.slice(-5).map(t => new Date(t.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })),
    datasets: [{
      data: transactions.slice(-5).map(t => t.type === 'receita' ? parseFloat(t.amount) : -parseFloat(t.amount)),
    },],
  };

  // Dados para o gráfico de barras (despesas por categoria)
  const despesasPorCategoria = transactions
    .filter(t => t.type === 'despesa')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + parseFloat(t.amount);
      return acc;
    }, {});

  const barChartData = {
    labels: Object.keys(despesasPorCategoria).slice(0, 4), // Primeiras 4 categorias
    datasets: [{
      data: Object.values(despesasPorCategoria).slice(0, 4),
    },],
  };


  return (
    <ScrollView style={styles.container}>
      {/* Card de Saldo */}
      <Card>
        <Text style={styles.cardTitle}>Saldo Atual</Text>
        <Text style={[styles.saldo, saldo < 0 ? styles.negativo : styles.positivo]}>
          {formatCurrency(saldo)}
        </Text>
        <View style={styles.resumoContainer}>
          <View style={styles.resumoItem}>
            <Text style={styles.resumoLabel}>Receitas</Text>
            <Text style={[styles.resumoValor, styles.positivo]}>{formatCurrency(totalReceitas)}</Text>
          </View>
          <View style={styles.resumoItem}>
            <Text style={styles.resumoLabel}>Despesas</Text>
            <Text style={[styles.resumoValor, styles.negativo]}>{formatCurrency(totalDespesas)}</Text>
          </View>
        </View>
      </Card>

      {/* Gráfico de Linha */}
      {transactions.length > 0 && (
        <Card>
          <Text style={styles.cardTitle}>Últimas Transações</Text>
          <LineChart
            data={lineChartData}
            width={screenWidth - 60}
            height={220}
            yAxisLabel="R$"
            yAxisSuffix=""
            chartConfig={chartConfig}
            bezier
          />
        </Card>
      )}


      {/* Gráfico de Barras */}
      {Object.keys(despesasPorCategoria).length > 0 && (
        <Card>
          <Text style={styles.cardTitle}>Despesas por Categoria</Text>
          <BarChart
            data={barChartData}
            width={screenWidth - 60}
            height={220}
            yAxisLabel="R$"
            chartConfig={chartConfig}
            verticalLabelRotation={15}
          />
        </Card>
      )}

    </ScrollView>
  );
};

const chartConfig = {
  backgroundColor: '#e26a00',
  backgroundGradientFrom: '#fb8c00',
  backgroundGradientTo: '#ffa726',
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333'
  },
  saldo: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  resumoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  resumoItem: {
    alignItems: 'center',
  },
  resumoLabel: {
    fontSize: 14,
    color: '#666',
  },
  resumoValor: {
    fontSize: 18,
    fontWeight: '600',
  },
  positivo: {
    color: '#5cb85c',
  },
  negativo: {
    color: '#d9534f',
  }
});

export default Dashboard;
