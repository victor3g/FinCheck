import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Dashboard from './pages/Dashboard';
import Transacoes from './pages/Transacoes';
import Configuracoes from './pages/Configuracoes';
import Sobre from './pages/Sobre';

import Layout from './components/Layout';
import BotaoAdd from './components/BotaoAdd';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={{ headerShown: false }}>
        <Drawer.Screen name="Resumo">
          {() => (
            <Layout>
              <Dashboard />
              <BotaoAdd />
            </Layout>
          )}
        </Drawer.Screen>

        <Drawer.Screen name="Transacoes">
          {() => (
            <Layout>
              <Transacoes />
            </Layout>
          )}
        </Drawer.Screen>

        <Drawer.Screen name="Configuracoes">
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
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
