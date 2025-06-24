import React, { createContext, useState, useEffect, useContext } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TRANSACTIONS_STORAGE_KEY = '@FinCheckApp:transactions';
const TransactionsContext = createContext({});

const calculateBalance = (transactionsArray) => {
    const totalReceitas = transactionsArray
        .filter(t => t.type === 'receita')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalDespesas = transactionsArray
        .filter(t => t.type === 'despesa')
        .reduce((sum, t) => sum + t.amount, 0);
    
    return totalReceitas - totalDespesas;
};

export const TransactionsProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData() {
            try {
                const storedTransactions = await AsyncStorage.getItem(TRANSACTIONS_STORAGE_KEY);
                if (storedTransactions) {
                    setTransactions(JSON.parse(storedTransactions));
                }
            } catch (error) {
                console.error("Failed to load transactions from storage", error);
            } finally {
                setLoading(false);
            }
        }
        loadStorageData();
    }, []);

    const saveTransactionsToStorage = async (newTransactions) => {
        try {
            await AsyncStorage.setItem(TRANSACTIONS_STORAGE_KEY, JSON.stringify(newTransactions));
        } catch (error) {
            console.error("Failed to save transactions to storage", error);
        }
    };

    const addTransaction = (transaction) => {
        if (transaction.type === 'despesa') {
            const currentBalance = calculateBalance(transactions);
            if (transaction.amount > currentBalance) {
                Alert.alert("Saldo Insuficiente", "Você não pode adicionar esta despesa, pois seu saldo ficaria negativo.");
                return;
            }
        }
        const newTransaction = { ...transaction, id: Date.now(), date: new Date().toISOString() };
        const updatedTransactions = [...transactions, newTransaction];
        setTransactions(updatedTransactions);
        saveTransactionsToStorage(updatedTransactions);
    };

    const updateTransaction = (updatedTransaction) => {
        const hypotheticalTransactions = transactions.map(t =>
            t.id === updatedTransaction.id ? updatedTransaction : t
        );
        const hypotheticalBalance = calculateBalance(hypotheticalTransactions);

        if (hypotheticalBalance < 0) {
            Alert.alert("Operação Inválida", "Você não pode editar esta transação, pois seu saldo ficaria negativo.");
            return;
        }
        setTransactions(hypotheticalTransactions);
        saveTransactionsToStorage(hypotheticalTransactions);
    };

    const deleteTransaction = (id) => {
        Alert.alert(
            "Confirmar Exclusão",
            "Você tem certeza que deseja apagar esta transação?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Apagar",
                    style: "destructive",
                    onPress: () => {
                        const transactionToDelete = transactions.find(t => t.id === id);
                        if (transactionToDelete.type === 'receita') {
                            const hypotheticalTransactions = transactions.filter(t => t.id !== id);
                            const hypotheticalBalance = calculateBalance(hypotheticalTransactions);
                            if (hypotheticalBalance < 0) {
                                Alert.alert("Operação Inválida", "Você não pode apagar esta receita, pois seu saldo ficaria negativo.");
                                return;
                            }
                        }
                        const updatedTransactions = transactions.filter(t => t.id !== id);
                        setTransactions(updatedTransactions);
                        saveTransactionsToStorage(updatedTransactions);
                    },
                },
            ]
        );
    };

    return (
        <TransactionsContext.Provider value={{ transactions, addTransaction, updateTransaction, deleteTransaction, loading }}>
            {children}
        </TransactionsContext.Provider>
    );
};

export function useTransactions() {
    return useContext(TransactionsContext);
}