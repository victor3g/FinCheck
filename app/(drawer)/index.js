import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Alert, ActivityIndicator } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit'; 
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTransactions } from '../../context/TransactionsContext';
import { Colors } from '../../constants/Colors';
import TransactionModal from '../../components/TransactionModal';
import SelectionModal from '../../components/SelectionModal';

const screenWidth = Dimensions.get('window').width;

const ActionRow = ({ icon, text, color = Colors.text, onPress }) => (<TouchableOpacity style={styles.actionRow} onPress={onPress}><Feather name={icon} size={24} color={color} /><Text style={[styles.actionText, { color }]}>{text}</Text></TouchableOpacity>);

const pieChartColorPalette = ['#60A5FA', '#FBBF24', '#4ADE80', '#F87171', '#A78BFA', '#2DD4BF'];

export default function ResumoScreen() {
    const router = useRouter();
    const [isBalanceVisible, setIsBalanceVisible] = useState(true);
    const [transactionModalVisible, setTransactionModalVisible] = useState(false);
    const [selectionModalVisible, setSelectionModalVisible] = useState(false);
    const [modalType, setModalType] = useState('despesa');
    const { transactions, addTransaction, updateTransaction, loading } = useTransactions();

    const openTransactionModal = (type) => { setModalType(type); setTransactionModalVisible(true); };
    const handleSelectAndOpen = (type) => { setSelectionModalVisible(false); openTransactionModal(type); };
    
    const financialData = useMemo(() => { const totalReceitas = transactions.filter(t => t.type === 'receita').reduce((sum, t) => sum + t.amount, 0); const totalDespesas = transactions.filter(t => t.type === 'despesa').reduce((sum, t) => sum + t.amount, 0); return { saldo: totalReceitas - totalDespesas }; }, [transactions]);
    const multiMonthLineChartData = useMemo(() => { const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]; const today = new Date(); const labels = []; const incomeData = []; const expenseData = []; for (let i = 5; i >= 0; i--) { const d = new Date(today.getFullYear(), today.getMonth() - i, 1); const month = d.getMonth(); const year = d.getFullYear(); labels.push(monthNames[month]); const monthlyTransactions = transactions.filter(t => { const transactionDate = new Date(t.date); return transactionDate.getMonth() === month && transactionDate.getFullYear() === year; }); const income = monthlyTransactions.filter(t => t.type === 'receita').reduce((sum, t) => sum + t.amount, 0); const expense = monthlyTransactions.filter(t => t.type === 'despesa').reduce((sum, t) => sum + t.amount, 0); incomeData.push(income); expenseData.push(expense); } return { labels, datasets: [ { data: incomeData, color: (opacity = 1) => Colors.success, strokeWidth: 3 }, { data: expenseData, color: (opacity = 1) => Colors.danger, strokeWidth: 3 } ], legend: ["Receitas", "Despesas"] }; }, [transactions]);
    const pieChartData = useMemo(() => { const expensesByCategory = transactions.filter(t => t.type === 'despesa').reduce((acc, t) => { if (acc[t.category]) { acc[t.category] += t.amount; } else { acc[t.category] = t.amount; } return acc; }, {}); return Object.keys(expensesByCategory).map((category, index) => ({ name: category, population: expensesByCategory[category], color: pieChartColorPalette[index % pieChartColorPalette.length] })); }, [transactions]);

    const formatCurrency = (value) => `R$ ${value.toFixed(2).replace('.', ',')}`;

    if (loading) { return <ActivityIndicator size="large" color={Colors.primary} style={styles.centered} />; }

    return (
        <View style={styles.container}>
            <TransactionModal visible={transactionModalVisible} onClose={() => setTransactionModalVisible(false)} onSave={addTransaction} onUpdate={updateTransaction} defaultType={modalType} />
            <SelectionModal visible={selectionModalVisible} onClose={() => setSelectionModalVisible(false)} onSelectReceita={() => handleSelectAndOpen('receita')} onSelectDespesa={() => handleSelectAndOpen('despesa')} />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={[styles.card, styles.carteiraCard]}>
                    <View>
                        <Text style={styles.cardLabel}>Carteira</Text>
                        <Text style={styles.balanceText}>{isBalanceVisible ? formatCurrency(financialData.saldo) : 'R$ ••••••'}</Text>
                    </View>
                    <TouchableOpacity onPress={() => setIsBalanceVisible(!isBalanceVisible)}>
                        <Ionicons name={isBalanceVisible ? "eye-outline" : "eye-off-outline"} size={28} color="#00A86B" />
                    </TouchableOpacity>
                </View>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Visão geral</Text>
                    <ActionRow icon="help-circle" text="Contas" onPress={() => Alert.alert("Contas", "Funcionalidade a ser implementada.")} />
                    <ActionRow icon="plus-circle" text="Receitas" color={Colors.success} onPress={() => openTransactionModal('receita')} />
                    <ActionRow icon="minus-circle" text="Despesas" color={Colors.danger} onPress={() => openTransactionModal('despesa')} />
                </View>
                
                <TouchableOpacity onPress={() => router.push('/Graficos')}>
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Balanço dos Últimos Meses</Text>
                        <LineChart data={multiMonthLineChartData} width={screenWidth - 40} height={220} chartConfig={lineChartConfig} bezier style={styles.graphStyle} withInnerLines={false} withOuterLines={false} yAxisLabel="R$ " formatYLabel={(yValue) => (Number(yValue) / 1000).toFixed(0) + 'k'} />
                    </View>
                </TouchableOpacity>

                {pieChartData.length > 0 && (
                     <TouchableOpacity onPress={() => router.push('/Graficos')}>
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>Despesas por Categoria</Text>
                            <PieChart
                                data={pieChartData}
                                width={screenWidth - 40}
                                height={220}
                                chartConfig={lineChartConfig}
                                accessor={"population"}
                                backgroundColor={"transparent"}
                                hasLegend={false}
                                paddingLeft={"25"}
                                absolute
                            />
                        </View>
                    </TouchableOpacity>
                )}
            </ScrollView>

            {!selectionModalVisible && (
                <TouchableOpacity style={styles.fab} onPress={() => setSelectionModalVisible(true)}>
                    <Ionicons name="add" size={32} color={Colors.white} />
                </TouchableOpacity>
            )}
        </View>
    );
}
const lineChartConfig = { 
    backgroundColor: '#ffffff', 
    backgroundGradientFrom: '#ffffff', 
    backgroundGradientTo: '#ffffff', 
    decimalPlaces: 0, color: (opacity = 1) => `rgba(100, 100, 100, ${opacity})`, 
    labelColor: (opacity = 1) => `rgba(100, 100, 100, ${opacity})`, 
    style: { borderRadius: 16 }, propsForDots: { r: '4', strokeWidth: '2' }};

const styles = StyleSheet.create({ 
    container: { flex: 1, backgroundColor: '#F0F2F5' }, 
    centered: { flex: 1, justifyContent: 'center', 
        alignItems: 'center' }, 
        scrollContent: { padding: 20, paddingBottom: 80 }, 
        card: { backgroundColor: '#fff', 
        borderRadius: 16, padding: 20, 
        marginBottom: 20, elevation: 5, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.1, shadowRadius: 8 }, 
        carteiraCard: { flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        backgroundColor: '#E8F5E9' }, 
        cardLabel: { fontSize: 16, color: '#666' }, 
        balanceText: { fontSize: 28, fontWeight: 'bold' }, 
        cardTitle: { fontSize: 18, fontWeight: '600', marginBottom: 15 }, 
        actionRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 }, 
        actionText: { fontSize: 18, marginLeft: 15, fontWeight: '500' }, 
        graphStyle: { marginVertical: 8, alignSelf: 'center' }, 
        fab: { position: 'absolute', 
        bottom: 30, 
        right: 30, 
        width: 60, 
        height: 60, 
        borderRadius: 30, 
        backgroundColor: Colors.primary, 
        justifyContent: 'center', 
        alignItems: 'center', 
        elevation: 8 }, 
        modalBackdrop: { flex: 1, backgroundColor: 'transparent' }, 
        miniMenuContainer: { position: 'absolute', 
        bottom: 30, 
        right: 30, width: 180, backgroundColor: 'white', borderRadius: 12, padding: 8, elevation: 10 }, miniMenuItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, paddingHorizontal: 10 }, miniMenuItemText: { fontSize: 16, fontWeight: '500' }, separator: { height: 1, backgroundColor: '#eee', marginHorizontal: 5 }, });