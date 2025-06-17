
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardScreen from '../pages/Dashboard';
import TransactionsScreen from '../pages/Transacoes';
import ReportsScreen from '../pages/Sobre';
import SettingsScreen from '../pages/Configuracoes';
import Calculadora from '../pages/Calculadora';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Perfil" component={DashboardScreen} />
      <Drawer.Screen name="Resumo" component={DashboardScreen} />
      <Drawer.Screen name="Contas" component={DashboardScreen} />
      <Drawer.Screen name="Transações" component={TransactionsScreen} />
      <Drawer.Screen name="Crédito" component={ReportsScreen} />
      <Drawer.Screen name="Calc" component={Calculadora} />
      <Drawer.Screen name="Relátorios" component={SettingsScreen} />
      <Drawer.Screen name="Milhas" component={DashboardScreen} />
      <Drawer.Screen name="Categorias" component={DashboardScreen} />
      <Drawer.Screen name="Gráficos" component={DashboardScreen} />
      <Drawer.Screen name="Configurações" component={DashboardScreen} />
      <Drawer.Screen name="Sobre" component={DashboardScreen} />
    </Drawer.Navigator>
  );
}