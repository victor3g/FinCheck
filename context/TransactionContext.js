import React,
{
  createContext,
  useState,
  useEffect,
  useContext
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values'; // Import para o funcionamento do uuid
import { v4 as uuidv4 } from 'uuid';

// Cria o Contexto
const TransactionContext = createContext();

// Cria o "Provedor" do Contexto
export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Efeito para carregar as transações salvas no AsyncStorage ao iniciar o app
  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const storedTransactions = await AsyncStorage.getItem('transactions');
        if (storedTransactions !== null) {
          setTransactions(JSON.parse(storedTransactions));
        }
      } catch (error) {
        console.error("Failed to load transactions.", error);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  // Função para adicionar uma nova transação
  const addTransaction = async (transaction) => {
    try {
      const newTransaction = { ...transaction, id: uuidv4(), date: new Date().toISOString() };
      const updatedTransactions = [...transactions, newTransaction];
      setTransactions(updatedTransactions);
      await AsyncStorage.setItem('transactions', JSON.stringify(updatedTransactions));
    } catch (error) {
      console.error("Failed to save transaction.", error);
    }
  };

  // Calcula o total de receitas
  const totalReceitas = transactions
    .filter(t => t.type === 'receita')
    .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

  // Calcula o total de despesas
  const totalDespesas = transactions
    .filter(t => t.type === 'despesa')
    .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

  // Calcula o saldo
  const saldo = totalReceitas - totalDespesas;

  return (
    <TransactionContext.Provider value={{
      transactions,
      addTransaction,
      totalReceitas,
      totalDespesas,
      saldo,
      loading
    }}>
      {children}
    </TransactionContext.Provider>
  );
};

// Hook customizado para facilitar o uso do contexto
export const useTransactions = () => {
  return useContext(TransactionContext);
};