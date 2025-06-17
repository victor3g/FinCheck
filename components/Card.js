import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = ({ children, style }) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f1f5f9',
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
    width: '100%',
  },
});

export default Card;