import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width - 120;

export default function DashboardScreen() {
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.mainBox}>
        
        {/* Carteira */}
        <View style={styles.cardCarteira}>
          <Text style={styles.titulo}>Carteira</Text>
          <View style={styles.saldoContainer}>
            <Text style={styles.saldo}>R$ 2.623,40</Text>
            <Image
              source={require('../assets/olho.png')}
              style={styles.icon}
            />
          </View>
        </View>

        {/* Visão Geral */}
        <View style={styles.card}>
          <Text style={styles.subtitulo}>Visão geral</Text>
          <View style={styles.linha}>
            <Image source={require('../assets/logo1.png')} style={styles.iconeStatus} />
            <Text style={styles.textoStatus}>Contas</Text>
          </View>
          <View style={styles.linha}>
            <Image source={require('../assets/mais.png')} style={styles.iconeStatus} />
            <Text style={styles.textoStatus}>Receitas</Text>
          </View>
          <View style={styles.linha}>
            <Image source={require('../assets/menos.png')} style={styles.iconeStatus} />
            <Text style={styles.textoStatus}>Despesas</Text>
          </View>
        </View>

        {/* Gráfico de Barras */}
        <View style={styles.card}>
          <BarChart
            data={{
              labels: ['Jan', 'Fev', 'Mar', 'Abr'],
              datasets: [{ data: [4000, 3000, 3900, 1000] }]
            }}
            width={screenWidth}
            height={220}
            yAxisLabel=""
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 0,
              color: () => '#A020F0',
              labelColor: () => '#333',
              style: { borderRadius: 10 },
            }}
            style={{ borderRadius: 10 }}
          />
        </View>

        {/* Gráfico de Pizza */}
        <View style={styles.card}>
          <Text style={styles.subtitulo}>Despesas por Categoria</Text>
          <PieChart
            data={[
              { name: 'Alimentação', population: 200, color: '#f39c12', legendFontColor: '#333', legendFontSize: 12 },
              { name: 'Lazer', population: 150, color: '#9b59b6', legendFontColor: '#333', legendFontSize: 12 },
              { name: 'Transporte', population: 100, color: '#2ecc71', legendFontColor: '#333', legendFontSize: 12 },
              { name: 'Outros', population: 80, color: '#e74c3c', legendFontColor: '#333', legendFontSize: 12 }
            ]}
            width={screenWidth}
            height={180}
            chartConfig={{ color: () => '#000' }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  scrollContent: {
    alignItems: 'center',
    paddingTop: 50,
  },
  mainBox: {
    width: '95%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 5,
  },
  cardCarteira: {
    backgroundColor: '#f1f5f9',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#f1f5f9',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  saldoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  saldo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: 'green',
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconeStatus: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  textoStatus: {
    fontSize: 16,
  },
});
