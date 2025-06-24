import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../../constants/Colors';

const ProgramaItem = ({ nome, valor }) => (
    <View style={styles.programaContainer}>
        <Text style={styles.programaNome}>{nome}</Text>
        <Text style={styles.programaValor}>{valor}</Text>
    </View>
);

export default function MilhasScreen() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Total de Milhas Acumuladas</Text>
                <Text style={styles.totalMilhas}>48.320</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Seus Programas</Text>
                <ProgramaItem nome="LATAM Pass" valor="15.480" />
                <ProgramaItem nome="Smiles (GOL)" valor="8.230" />
                <ProgramaItem nome="TudoAzul" valor="25.110" />
                <ProgramaItem nome="Livelo" valor="4.500" />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 20,
    },
    card: {
        backgroundColor: Colors.cardBackground,
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 15,
    },
    totalMilhas: {
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Colors.secondary,
    },
    programaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderColor,
    },
    programaNome: {
        fontSize: 16,
        color: Colors.text,
    },
    programaValor: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.secondary,
    },
});