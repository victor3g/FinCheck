import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, Switch, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Colors } from '../constants/Colors';

export default function TransactionModal({ visible, onClose, onSave, onUpdate, transactionToEdit, defaultType }) {
    const [isExpense, setIsExpense] = useState(true);
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    
    const isEditing = !!transactionToEdit;

    useEffect(() => {
        if (visible) {
            if (isEditing) {
                setIsExpense(transactionToEdit.type === 'despesa');
                setAmount(transactionToEdit.amount.toString());
                setDescription(transactionToEdit.description);
                setCategory(transactionToEdit.category);
            } else {
                setIsExpense(defaultType === 'despesa');
                setAmount('');
                setDescription('');
                setCategory('');
            }
        }
    }, [transactionToEdit, visible, defaultType]);

    const handleSave = () => {
        if (!amount || !description || !category) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }
        const transactionData = {
            type: isExpense ? 'despesa' : 'receita',
            amount: parseFloat(amount),
            description,
            category,
        };
        if (isEditing) {
            onUpdate({ ...transactionData, id: transactionToEdit.id });
        } else {
            onSave(transactionData);
        }
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>{isEditing ? 'Editar' : 'Adicionar'} Transação</Text>
                    <View style={styles.switchContainer}>
                        <Text style={[styles.switchLabel, !isExpense && styles.activeSwitch]}>Receita</Text>
                        <Switch trackColor={{ false: Colors.success, true: Colors.danger }} thumbColor={Colors.white} onValueChange={setIsExpense} value={isExpense} />
                        <Text style={[styles.switchLabel, isExpense && styles.activeSwitch]}>Despesa</Text>
                    </View>
                    <TextInput style={styles.input} placeholder="Valor (ex: 50.99)" keyboardType="numeric" value={amount} onChangeText={setAmount}/>
                    <TextInput style={styles.input} placeholder="Descrição (ex: Almoço)" value={description} onChangeText={setDescription}/>
                    <TextInput style={styles.input} placeholder="Categoria (ex: Alimentação)" value={category} onChangeText={setCategory}/>
                    <TouchableOpacity style={[styles.button, { backgroundColor: isExpense ? Colors.danger : Colors.success }]} onPress={handleSave}>
                        <Text style={styles.buttonText}>{isEditing ? 'Salvar Alterações' : 'Adicionar'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.closeButton]} onPress={onClose}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

// Estilos
const styles = StyleSheet.create({
    modalContainer: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'transparent' 
    },
    modalContent: { 
        width: '90%', 
        backgroundColor: 'white', 
        borderRadius: 12, 
        padding: 20, 
        alignItems: 'center', 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.25, 
        shadowRadius: 4, 
        elevation: 5 
    },
    modalTitle: { 
        fontSize: 20, 
        fontWeight: 'bold', 
        marginBottom: 20 
    },
    switchContainer: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: 20 
    },
    switchLabel: { 
        fontSize: 16, 
        color: 'gray', 
        marginHorizontal: 10 
    },
    activeSwitch: { 
        fontWeight: 'bold', 
        color: '#333' 
    },
    input: { 
        width: '100%', 
        height: 50, 
        backgroundColor: '#f0f0f0', 
        borderRadius: 8, 
        paddingHorizontal: 15, 
        marginBottom: 15, 
        fontSize: 16, 
        borderWidth: 1, 
        borderColor: '#ddd' 
    },
    button: { 
        width: '100%', 
        height: 50, 
        borderRadius: 8, 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 10 
    },
    buttonText: { 
        color: 'white', 
        fontSize: 18, 
        fontWeight: 'bold' 
    },
    closeButton: { 
        backgroundColor: 'gray' 
    }
});