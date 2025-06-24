import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTransactions } from '../../context/TransactionsContext';
import { Colors } from '../../constants/Colors';
import TransactionModal from '../../components/TransactionModal';

// O item da lista agora tem os botões de ação
const TransactionItem = ({ item, onEdit, onDelete }) => {
    const isReceita = item.type === 'receita';
    const amountColor = isReceita ? Colors.success : Colors.danger;
    const amountSign = isReceita ? '+' : '-';
    const formattedDate = new Date(item.date).toLocaleDateString('pt-BR');

    return (
        <View style={styles.itemContainer}>
            <View style={styles.itemDetails}>
                <Text style={styles.itemCategory}>{item.category}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
                <Text style={styles.itemDate}>{formattedDate}</Text>
            </View>
            <View style={styles.itemRightContainer}>
                <Text style={[styles.itemAmount, { color: amountColor }]}>
                    {`${amountSign} R$ ${item.amount.toFixed(2).replace('.', ',')}`}
                </Text>
                <View style={styles.itemActions}>
                    <TouchableOpacity onPress={() => onEdit(item)} style={styles.actionButton}>
                        <Feather name="edit" size={20} color={Colors.secondary} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.actionButton}>
                        <Feather name="trash-2" size={20} color={Colors.danger} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default function TransacoesScreen() {
    const { transactions, loading, addTransaction, updateTransaction, deleteTransaction } = useTransactions();
    
    // Estado para controlar o modal e a transação selecionada
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const handleEdit = (transaction) => {
        setSelectedTransaction(transaction);
        setModalVisible(true);
    };
    
    // Função para fechar o modal e limpar a seleção
    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedTransaction(null);
    };

    const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

    if (loading) {
        return <ActivityIndicator size="large" color={Colors.primary} style={{ flex: 1, justifyContent: 'center' }} />;
    }

    return (
        <View style={styles.container}>
            <TransactionModal
                visible={modalVisible}
                onClose={handleCloseModal}
                onSave={addTransaction} // Não usamos para adicionar aqui, mas a prop é esperada
                onUpdate={updateTransaction}
                transactionToEdit={selectedTransaction}
            />

            {sortedTransactions.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Nenhuma transação registrada.</Text>
                </View>
            ) : (
                <FlatList
                    data={sortedTransactions}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TransactionItem 
                            item={item} 
                            onEdit={handleEdit}
                            onDelete={deleteTransaction} // Passa a função de deletar diretamente
                        />
                    )}
                    contentContainerStyle={styles.list}
                />
            )}
        </View>
    );
}

// Estilos atualizados para acomodar os novos botões
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    list: { padding: 15 },
    itemContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: Colors.cardBackground, padding: 15, borderRadius: 10, marginBottom: 10, elevation: 2 },
    itemDetails: { flex: 1, marginRight: 10 },
    itemCategory: { fontSize: 16, fontWeight: 'bold', textTransform: 'capitalize', color: Colors.text },
    itemDescription: { fontSize: 14, color: Colors.lightText },
    itemDate: { fontSize: 12, color: Colors.gray, marginTop: 4 },
    itemRightContainer: { alignItems: 'flex-end' },
    itemAmount: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
    itemActions: { flexDirection: 'row' },
    actionButton: { marginLeft: 15, padding: 5 },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyText: { fontSize: 18, color: Colors.lightText },
});