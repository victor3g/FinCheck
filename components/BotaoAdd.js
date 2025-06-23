import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function BotaoAdd() {
  const [visivel, setVisivel] = useState(false);
  const navigation = useNavigation(); // Hook para acessar a navegação

  const toggleMenu = () => {
    setVisivel(!visivel);
  };

  // Função genérica para navegar e fechar o menu
  const handleNavigate = (screenName) => {
    navigation.navigate(screenName);
    setVisivel(false);
  };

  return (
    <View style={styles.container}>
      {visivel && (
        <View style={styles.overlay}>
          {/* Opção Receitas */}
          <TouchableOpacity style={styles.opcao} onPress={() => handleNavigate('AdicionarReceita')}>
            <Image source={require('../assets/mais.png')} style={styles.icone} />
            <Text style={styles.texto}>Receitas</Text>
          </TouchableOpacity>

          {/* Opção Despesas */}
          <TouchableOpacity style={styles.opcao} onPress={() => handleNavigate('AdicionarDespesa')}>
            <Image source={require('../assets/menos.png')} style={styles.icone} />
            <Text style={styles.texto}>Despesas</Text>
          </TouchableOpacity>

          {/* Opção Calculadora */}
          <TouchableOpacity style={styles.opcao} onPress={() => handleNavigate('Calculadora')}>
            <Image source={require('../assets/logo1.png')} style={styles.icone} />
            <Text style={styles.texto}>Calculadora</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.fab} onPress={toggleMenu}>
        {/* Mostra um 'X' se o menu estiver aberto, ou '+' se estiver fechado */}
        <Text style={styles.fabText}>{visivel ? '✕' : '+'}</Text>
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
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
  },
  fabText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    lineHeight: 32, // Ajuste para centralizar melhor o + e o X
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
    paddingVertical: 8, // Aumenta a área de toque
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
