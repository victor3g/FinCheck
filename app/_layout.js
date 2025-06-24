import 'react-native-gesture-handler';

import { Stack } from 'expo-router';
import { TransactionsProvider } from '../context/TransactionsContext';

export default function RootLayout() {
  return (
    <TransactionsProvider>
      <Stack>
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      </Stack>
    </TransactionsProvider>
  );
}