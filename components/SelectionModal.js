import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

const SelectionModal = ({ visible, onClose, onSelectReceita, onSelectDespesa }) => (
    <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
    >
        <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} onPress={onClose}>
            <View style={styles.miniMenuContainer}>
                <TouchableOpacity style={styles.miniMenuItem} onPress={onSelectReceita}>
                    <Text style={[styles.miniMenuItemText, { color: Colors.success }]}>Receita</Text>
                    <Feather name="plus-circle" size={24} color={Colors.success} />
                </TouchableOpacity>
                <View style={styles.separator} />
                <TouchableOpacity style={styles.miniMenuItem} onPress={onSelectDespesa}>
                    <Text style={[styles.miniMenuItemText, { color: Colors.danger }]}>Despesa</Text>
                    <Feather name="minus-circle" size={24} color={Colors.danger} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    </Modal>
);

const styles = StyleSheet.create({
    modalBackdrop: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    miniMenuContainer: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 180,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 8,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    miniMenuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 10,
    },
    miniMenuItemText: {
        fontSize: 16,
        fontWeight: '500',
    },
    separator: {
        height: 1,
        backgroundColor: '#eee',
        marginHorizontal: 5,
    },
});

export default SelectionModal;