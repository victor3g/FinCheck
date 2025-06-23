import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Card from './Card';

const itensVisaoGeral = [
  { id: 'contas', texto: 'Contas', icone: require('../assets/logo1.png') },
  { id: 'receitas', texto: 'Receitas', icone: require('../assets/mais.png') },
  { id: 'despesas', texto: 'Despesas', icone: require('../assets/menos.png') },
];

// O componente agora recebe uma propriedade 'onNavigateToReceitas'
const VisaoGeralCard = ({ onNavigateToReceitas }) => {
  return (
    <Card>
      <Text style={styles.subtitulo}>Visão geral</Text>
      {itensVisaoGeral.map((item) => {
        if (item.id === 'Receita') {
          return (
            <TouchableOpacity 
              key={item.id} 
              style={styles.linha} 
              onPress={onNavigateToReceitas}
              activeOpacity={0.6}
            >
              <Image source={item.icone} style={styles.iconeStatus} />
              <Text style={styles.textoStatus}>{item.texto}</Text>
            </TouchableOpacity>
          );
        }

        return (
          <View style={styles.linha} key={item.id}>
            <Image source={item.icone} style={styles.iconeStatus} />
            <Text style={styles.textoStatus}>{item.texto}</Text>
          </View>
        );
      })}
    </Card>
  );
};

const styles = StyleSheet.create({
  subtitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 5,
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

export default VisaoGeralCard;
