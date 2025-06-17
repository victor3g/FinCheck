import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

export default function BotaoAdd() {
  const [visivel, setVisivel] = useState(false);

  const toggleMenu = () => {
    setVisivel(!visivel);
  };

  return (
    <View style={styles.container}>
      {visivel && (
        <View style={styles.overlay}>
          <View style={styles.opcao}>
            <Image source={require('../assets/mais.png')} style={styles.icone} />
            <Text style={styles.texto}>Receitas</Text>
          </View>
          <View style={styles.opcao}>
            <Image source={require('../assets/menos.png')} style={styles.icone} />
            <Text style={styles.texto}>Despesas</Text>
          </View>
          <View style={styles.opcao}>
            <Image source={require('../assets/logo1.png')} style={styles.icone} />
            <Text style={styles.texto}>Calculadora</Text>
          </View>
        </View>
      )}

      <TouchableOpacity style={styles.fab} onPress={toggleMenu}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'flex-end',
  },
  fab: {
    backgroundColor: '#008000',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  fabText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  overlay: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 6,
  },
  opcao: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icone: {
    width: 28,
    height: 28,
    marginRight: 10,
  },
  texto: {
    fontSize: 16,
    fontWeight: '500',
  },
});
