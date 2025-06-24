import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Button, Keyboard, ActivityIndicator } from 'react-native';
import { Colors } from '../../constants/Colors';


const CotacaoItem = ({ currency, value }) => {
    const realValue = (1 / value).toFixed(2).replace('.', ',');
    return (
        <View style={styles.cotacaoRow}>
            <Text style={styles.cotacaoCurrency}>{currency}</Text>
            <Text style={styles.cotacaoValue}>R$ {realValue}</Text>
        </View>
    );
};


const ProgramaItem = ({ programa, isEditing, onEditPress, onSavePress, tempValue, setTempValue }) => {
    if (isEditing) {
        return (
            <View style={styles.programaContainerEditing}>
                <Text style={styles.programaNome}>{programa.name}</Text>
                <View style={styles.editView}>
                    <TextInput style={styles.input} value={tempValue} onChangeText={setTempValue} keyboardType="numeric" autoFocus={true} />
                    <Button title="Salvar" onPress={() => onSavePress(programa.id)} color={Colors.primary} />
                </View>
            </View>
        );
    }
    return (
        <TouchableOpacity onPress={() => onEditPress(programa)}>
            <View style={styles.programaContainer}>
                <Text style={styles.programaNome}>{programa.name}</Text>
                <Text style={styles.programaValor}>{programa.value.toLocaleString('pt-BR')}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default function MilhasScreen() {

    const [programs, setPrograms] = useState([
        { id: 'latam', name: 'LATAM Pass', value: 15480 },
        { id: 'smiles', name: 'Smiles (GOL)', value: 8230 },
        { id: 'azul', name: 'TudoAzul', value: 25110 },
        { id: 'livelo', name: 'Livelo', value: 4500 },
    ]);
    const [editingId, setEditingId] = useState(null);
    const [tempValue, setTempValue] = useState('');
    const totalMiles = useMemo(() => programs.reduce((sum, program) => sum + program.value, 0), [programs]);
    const handleEditPress = (programa) => { setEditingId(programa.id); setTempValue(programa.value.toString()); };
    const handleSavePress = (programId) => {
        const newPrograms = programs.map(p => { if (p.id === programId) { return { ...p, value: parseInt(tempValue, 10) || 0 }; } return p; });
        setPrograms(newPrograms);
        setEditingId(null);
        Keyboard.dismiss();
    };


    const [rates, setRates] = useState(null);
    const [loadingApi, setLoadingApi] = useState(true);
    const [errorApi, setErrorApi] = useState(null);

    useEffect(() => {
        const fetchRates = async () => {
            try {
                const response = await fetch('https://api.frankfurter.app/latest?from=BRL&to=USD,EUR,GBP');
                if (!response.ok) throw new Error('Falha ao buscar dados.');
                const data = await response.json();
                setRates(data.rates);
            } catch (err) {
                setErrorApi(err.message);
            } finally {
                setLoadingApi(false);
            }
        };
        fetchRates();
    }, []);

    return (
        <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Total de Milhas Acumuladas</Text>
                <Text style={styles.totalMilhas}>{totalMiles.toLocaleString('pt-BR')}</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Seus Programas</Text>
                {programs.map(prog => (
                    <ProgramaItem
                        key={prog.id}
                        programa={prog}
                        isEditing={editingId === prog.id}
                        tempValue={tempValue}
                        setTempValue={setTempValue}
                        onEditPress={handleEditPress}
                        onSavePress={handleSavePress}
                    />
                ))}
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Cotações do Dia</Text>
                {loadingApi && <ActivityIndicator size="small" color={Colors.primary} />}
                {errorApi && <Text style={styles.errorText}>Não foi possível carregar as cotações.</Text>}
                {rates && (
                    <View>
                        <CotacaoItem currency="Dólar (USD)" value={rates.USD} />
                        <CotacaoItem currency="Euro (EUR)" value={rates.EUR} />
                        <CotacaoItem currency="Libra (GBP)" value={rates.GBP} />
                    </View>
                )}
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
    programaContainerEditing: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderColor,
    },
    programaNome: {
        fontSize: 16,
        color: Colors.text,
        marginBottom: 5,
    },
    programaValor: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.secondary,
    },
    editView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: Colors.borderColor,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginRight: 10,
        fontSize: 16,
    },

    cotacaoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    cotacaoCurrency: {
        fontSize: 16,
        color: Colors.lightText,
    },
    cotacaoValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.text,
    },
    errorText: {
        fontSize: 14,
        color: Colors.danger,
        textAlign: 'center',
    },
});