import React from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useTransactions } from '../context/TransactionContext';

const Transacoes = () => {
  const { transactions, loading } = useTransactions();

  const formatCurrency = (value) => {
    return parseFloat(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemCategory}>{item.category}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Text style={styles.itemDate}>{new Date(item.date).toLocaleDateString('pt-BR')}</Text>
      </View>
      <Text style={[
        styles.itemAmount,
        item.type === 'receita' ? styles.receita : styles.despesa
      ]}>
        {item.type === 'receita' ? '+' : '-'} {formatCurrency(item.amount)}
      </Text>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#00A86B" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Transações</Text>
      {transactions.length === 0 ? (
        <Text style={styles.noTransactionsText}>Nenhuma transação registrada ainda.</Text>
      ) : (
        <FlatList
          data={[...transactions].reverse()} // Mostra as mais recentes primeiro
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 2,
  },
  itemInfo: {
    flex: 1,
  },
  itemCategory: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
  },
  itemDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  itemAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  receita: {
    color: '#5cb85c',
  },
  despesa: {
    color: '#d9534f',
  },
  noTransactionsText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#666',
  }
});

export default Transacoes;
