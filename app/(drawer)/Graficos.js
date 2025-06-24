import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useTransactions } from '../../context/TransactionsContext';
import { Colors } from '../../constants/Colors';

const screenWidth = Dimensions.get('window').width;


const CategoryDetailItem = ({ name, total, percentage }) => (
    <View style={styles.categoryItem}>
        <View style={styles.categoryInfo}>
            <Text style={styles.categoryName}>{name}</Text>
            <Text style={styles.categoryValue}>{`R$ ${total.toFixed(2).replace('.', ',')}`}</Text>
        </View>
        <Text style={styles.categoryPercentage}>{`${percentage.toFixed(1)}%`}</Text>
    </View>
);

export default function GraficosScreen() {
    const { transactions, loading } = useTransactions();

    const multiMonthLineChartData = useMemo(() => {
        const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
        const today = new Date();
        const labels = [];
        const incomeData = [];
        const expenseData = [];
        for (let i = 5; i >= 0; i--) {
            const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
            const month = d.getMonth();
            const year = d.getFullYear();
            labels.push(monthNames[month]);
            const monthlyTransactions = transactions.filter(t => { const transactionDate = new Date(t.date); return transactionDate.getMonth() === month && transactionDate.getFullYear() === year; });
            const income = monthlyTransactions.filter(t => t.type === 'receita').reduce((sum, t) => sum + t.amount, 0);
            const expense = monthlyTransactions.filter(t => t.type === 'despesa').reduce((sum, t) => sum + t.amount, 0);
            incomeData.push(income);
            expenseData.push(expense);
        }
        return {
            labels,
            datasets: [
                { data: incomeData, color: (opacity = 1) => Colors.success, strokeWidth: 3 },
                { data: expenseData, color: (opacity = 1) => Colors.danger, strokeWidth: 3 }
            ],
            legend: ["Receitas", "Despesas"]
        };
    }, [transactions]);

    const categoryData = useMemo(() => {
        const today = new Date();
        const totalDespesas = transactions.filter(t => t.type === 'despesa').reduce((sum, t) => sum + t.amount, 0);
        
        const expensesByCategory = transactions
            .filter(t => t.type === 'despesa')
            .reduce((acc, t) => {
                if (!acc[t.category]) {
                    acc[t.category] = { total: 0, transactions: [] };
                }
                acc[t.category].total += t.amount;
                acc[t.category].transactions.push(t);
                return acc;
            }, {});

        const categoryDetails = Object.keys(expensesByCategory)
            .map(category => ({
                name: category,
                total: expensesByCategory[category].total,
                percentage: totalDespesas > 0 ? (expensesByCategory[category].total / totalDespesas) * 100 : 0,
            }))
            .sort((a, b) => b.total - a.total);

        const categoryTrendData = {};
        const monthLabels = [];
        for (let i = 5; i >= 0; i--) {
            const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
            const monthName = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"][d.getMonth()];
            monthLabels.push(monthName);
        }

        Object.keys(expensesByCategory).forEach(category => {
            const monthlyTotals = {};
            for (let i = 5; i >= 0; i--) {
                const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
                const monthKey = `${d.getFullYear()}-${d.getMonth()}`;
                monthlyTotals[monthKey] = 0;
            }
            expensesByCategory[category].transactions.forEach(t => {
                const date = new Date(t.date);
                const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
                if (monthlyTotals.hasOwnProperty(monthKey)) {
                    monthlyTotals[monthKey] += t.amount;
                }
            });
            categoryTrendData[category] = {
                labels: monthLabels,
                datasets: [{ data: Object.values(monthlyTotals) }]
            };
        });
        
        return { details: categoryDetails, trends: categoryTrendData };
    }, [transactions]);

    if (loading) {
        return <ActivityIndicator size="large" color={Colors.primary} style={{flex: 1, justifyContent: 'center'}} />;
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Balanço Comparativo Mensal</Text>
                <LineChart data={multiMonthLineChartData} width={screenWidth - 40} height={220} chartConfig={lineChartConfig} bezier style={styles.graphStyle} yAxisLabel="R$ " formatYLabel={(yValue) => (Number(yValue) / 1000).toFixed(0) + 'k'}/>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Análise de Despesas por Categoria</Text>
                {categoryData.details.map(item => <CategoryDetailItem key={item.name} {...item} />)}
            </View>

            <View style={styles.card}>
                 <Text style={styles.cardTitle}>Tendência de Gastos por Categoria</Text>
                 {categoryData.details.map(item => (
                    <View key={item.name} style={styles.lineChartContainer}>
                        <Text style={styles.lineChartTitle}>{item.name}</Text>
                        <LineChart
                            data={categoryData.trends[item.name]}
                            width={screenWidth - 80}
                            height={180}
                            chartConfig={{...lineChartConfig, color: () => Colors.danger, propsForDots: { r: '3', stroke: Colors.danger}}}
                            withVerticalLabels={true}
                            withInnerLines={false}
                            fromZero={true}
                            style={{paddingRight: 0, paddingLeft: 0}}
                            yAxisLabel=""
                            yAxisSuffix=""
                            formatXLabel={(value) => value}
                            withHorizontalLabels={false}
                        />
                    </View>
                 ))}
            </View>
        </ScrollView>
    );
}

const lineChartConfig = { backgroundColor: '#ffffff', backgroundGradientFrom: '#ffffff', backgroundGradientTo: '#ffffff', decimalPlaces: 0, color: (opacity = 1) => Colors.primary, labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, propsForDots: { r: '4', strokeWidth: '2' }};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F0F2F5' },
    card: { backgroundColor: '#fff', borderRadius: 16, padding: 20, margin: 20, marginBottom: 0, elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8 },
    cardTitle: { fontSize: 18, fontWeight: '600', marginBottom: 15 },
    categoryItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
    categoryInfo: { flexDirection: 'row', alignItems: 'center' },
    categoryName: { fontSize: 16 },
    categoryValue: { fontSize: 14, color: '#666', marginLeft: 10 },
    categoryPercentage: { fontSize: 16, fontWeight: 'bold' },
    lineChartContainer: { marginVertical: 15, alignItems: 'center' },
    lineChartTitle: { fontSize: 16, fontWeight: '500', marginBottom: 5, color: Colors.text },
    graphStyle: { marginVertical: 8, alignSelf: 'center' },
});