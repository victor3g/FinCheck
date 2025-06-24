import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';


const CustomHeaderTitle = ({ title }) => {
    return (
        <View style={styles.headerContainer}>
            <Image
                source={require('../../assets/images/logo.png')}
                style={styles.headerLogo}
            />
            <Text style={styles.headerTitle}>{title}</Text>
        </View>
    );
};

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerStyle: {
            height: 110,
            backgroundColor: Colors.cardBackground,
            elevation: 0,
            shadowOpacity: 0,
        },
        headerTitleAlign: 'center',
        headerTintColor: Colors.text,
        drawerActiveTintColor: Colors.primary,
        drawerInactiveTintColor: Colors.lightText,
        drawerLabelStyle: {
          marginLeft: -10, 
          fontSize: 16,
        },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: 'Início',

          headerTitle: () => <CustomHeaderTitle title="Dashboard" />,
          drawerIcon: ({ color, size }) => <FontAwesome name="home" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="transacoes"
        options={{
          drawerLabel: 'Transações',

          headerTitle: () => <CustomHeaderTitle title="Histórico" />,
          drawerIcon: ({ color, size }) => <MaterialIcons name="swap-horiz" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Graficos"
        options={{
          drawerLabel: 'Gráficos',

          headerTitle: () => <CustomHeaderTitle title="Análise Detalhada" />,
          drawerIcon: ({ color, size }) => <MaterialIcons name="bar-chart" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="milhas"
        options={{
          drawerLabel: 'Milhas',

          headerTitle: () => <CustomHeaderTitle title="Controle de Milhas" />,
          drawerIcon: ({ color, size }) => <MaterialIcons name="flight" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="calculadora"
        options={{
          drawerLabel: 'Calculadora',

          headerTitle: () => <CustomHeaderTitle title="Calculadora" />,
          drawerIcon: ({ color, size }) => <FontAwesome name="calculator" size={size} color={color} />,
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerLogo: {
        width: 32,
        height: 32,
        marginBottom: 4,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.text,
    },
});