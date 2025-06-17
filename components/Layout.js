import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import NavBar from './NavBar';

export default function Layout({ children }) {
  return (
    <SafeAreaView style={styles.container}>
      <NavBar />
      <View style={styles.content}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingTop: 80, // espaço para não cobrir o conteúdo
    paddingHorizontal: 5,
  },
});
