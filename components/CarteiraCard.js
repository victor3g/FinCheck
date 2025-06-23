import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Card from './Card';

const CarteiraCard = ({ saldoInicial }) => {
  const [saldoVisivel, setSaldoVisivel] = useState(true);

  return (
    <Card style={styles.cardCarteira}>
      <Text style={styles.titulo}>Carteira</Text>
      <TouchableOpacity
        style={styles.saldoContainer}
        onPress={() => setSaldoVisivel(!saldoVisivel)}
        activeOpacity={0.7}
      >
        <Text style={styles.saldo}>
          {saldoVisivel ? `R$ ${saldoInicial.toFixed(2).replace('.', ',')}` : 'R$ ••••••'}
        </Text>
        <Image
          source={
            saldoVisivel
              ? require('../assets/olho.png')
              : require('../assets/olho-aberto.png')
          }
          style={styles.icon}
        />
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardCarteira: {
    alignItems: 'center',
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
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
    tintColor: '#333',
  },
});

export default CarteiraCard;