// --- Arquivo: src/screens/DashboardScreen.js ---

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

// Importando o serviço de API e os novos componentes
import { getDashboardData } from '../services/api';
import CarteiraCard from '../components/CarteiraCard';
import VisaoGeralCard from '../components/VisaoGeralCard';
import Grafico1 from '../components/Grafico1';
import Grafico2 from '../components/Grafico2';

export default function DashboardScreen() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect para carregar os dados uma vez quando o componente é montado
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error("Erro ao buscar dados para o dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Exibe um indicador de carregamento enquanto os dados não chegam
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#A020F0" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.mainBox}>
        <CarteiraCard saldoInicial={dashboardData.carteira.saldo} />
        <VisaoGeralCard />
        <Grafico1 data={dashboardData.grafico1} />
        <Grafico2 data={dashboardData.grafico2} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  scrollContent: {
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
  },
  mainBox: {
    width: '98%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 5,
  },
});