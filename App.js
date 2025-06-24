import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TransactionProvider } from './context/TransactionContext'; // Importar o Provider

// Importação dos componentes de página (telas)
import Dashboard from './pages/Dashboard';
import Transacoes from './pages/Transacoes';
import Calculadora from './pages/Calculadora';
import Configuracoes from './pages/Configuracoes';
import Sobre from './pages/Sobre';
import AdicionarReceita from './pages/AdicionarReceita';
import AdicionarDespesa from './pages/AdicionarDespesa';

// Importação dos componentes de UI
import Layout from './components/Layout';
import BotaoAdd from './components/BotaoAdd';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    // Envolvemos o App com o Provedor de Transações
    <TransactionProvider>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Resumo"
          screenOptions={{
            headerShown: false,
            drawerStyle: {
              backgroundColor: '#FFFFFF',
            },
            drawerActiveTintColor: '#00A86B',
          }}
        >
          <Drawer.Screen name="Resumo">
            {() => (
              <Layout>
                <Dashboard />
                <BotaoAdd />
              </Layout>
            )}
          </Drawer.Screen>

          <Drawer.Screen name="Transações">
            {() => (
              <Layout>
                <Transacoes />
              </Layout>
            )}
          </Drawer.Screen>

          <Drawer.Screen name="Calculadora">
            {() => (
              <Layout>
                <Calculadora />
              </Layout>
            )}
          </Drawer.Screen>

          <Drawer.Screen name="Configurações">
            {() => (
              <Layout>
                <Configuracoes />
              </Layout>
            )}
          </Drawer.Screen>

          <Drawer.Screen name="Sobre">
            {() => (
              <Layout>
                <Sobre />
              </Layout>
            )}
          </Drawer.Screen>

          <Drawer.Screen
            name="AdicionarReceita"
            component={AdicionarReceita}
            options={{ drawerItemStyle: { height: 0 } }}
          />
          <Drawer.Screen
            name="AdicionarDespesa"
            component={AdicionarDespesa}
            options={{ drawerItemStyle: { height: 0 } }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </TransactionProvider>
  );
}