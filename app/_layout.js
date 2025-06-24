import 'react-native-gesture-handler'; // IMPORTANTE: Deve ser a primeira linha

import { Stack } from 'expo-router';
import { TransactionsProvider } from '../context/TransactionsContext';

export default function RootLayout() {
  // ... o resto do seu código continua o mesmo
  return (
    <TransactionsProvider>
      <Stack>
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      </Stack>
    </TransactionsProvider>
  );
}