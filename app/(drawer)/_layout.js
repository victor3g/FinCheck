import { Drawer } from 'expo-router/drawer';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
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
        name="index" // O nome do arquivo index.js
        options={{
          drawerLabel: 'Início',
          title: 'FinCheck',
          drawerIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="transacoes" // O nome do arquivo transacoes.js
        options={{
          drawerLabel: 'Transações',
          title: 'Histórico de Transações',
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="swap-horiz" size={size} color={color} />
          ),
        }}
      />
      {/* --- ITEM DO MENU AGORA VISÍVEL E ESTILIZADO --- */}
      <Drawer.Screen
        name="Graficos" // Nome do arquivo Graficos.js
        options={{
          drawerLabel: 'Gráficos', // Texto que aparecerá no menu
          title: 'Análise Detalhada', // Título no topo da página
          drawerIcon: ({ color, size }) => ( // Ícone para o menu
            <MaterialIcons name="bar-chart" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="milhas" // O nome do arquivo milhas.js
        options={{
          drawerLabel: 'Milhas',
          title: 'Controle de Milhas',
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="flight" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="calculadora" // O nome do arquivo calculadora.js
        options={{
          drawerLabel: 'Calculadora',
          title: 'Calculadora',
          drawerIcon: ({ color, size }) => (
            <FontAwesome name="calculator" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}