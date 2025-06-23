// pages/AdicionarReceita.js
// Componente React Native para a página "Adicionar Receita".
// Projetado para ser visualmente idêntico ao print fornecido,
// e usa a estrutura de estilos da DashboardScreen.js para consistência.

import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Dimensions,
    Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Verifique a instalação: npm install @react-native-picker/picker

// Importe os ícones se estiver usando uma biblioteca como 'react-native-vector-icons'
// Exemplo: import Icon from 'react-native-vector-icons/Feather';
// Por simplicidade, usaremos ícones baseados em texto ou svgs simples para o preview
// mas no React Native real, você usaria uma biblioteca de ícones.

// Componente para o cabeçalho (Header)
// Este componente simula o cabeçalho que foi adicionado na prévia HTML.
// No seu aplicativo real, você provavelmente terá um componente de navegação global.
const AppHeader = () => (
    <View style={headerStyles.header}>
        {/* Ícone de Menu */}
        <TouchableOpacity style={headerStyles.iconContainer}>
            <Image source={require('../assets/bar.png')} style={styles.iconeStatus} />
        </TouchableOpacity>

        {/* Ícone de Cofrinho (Piggy Bank) */}
        <TouchableOpacity style={headerStyles.iconContainer}>
            <Image source={require('../assets/logo1.png')} style={styles.iconeStatus} />
        </TouchableOpacity>

        {/* Ícone de Lupa (Pesquisa) */}
        <TouchableOpacity style={headerStyles.iconContainer}>
            <Image source={require('../assets/lupa.png')} style={styles.iconeStatus} />
        </TouchableOpacity>
    </View>
);

const AdicionarReceita = () => {
    // Estados para armazenar os valores dos campos
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [data, setData] = useState('22/05/2025'); // Data inicial do print
    const [categoria, setCategoria] = useState('');
    const [conta, setConta] = useState('');
    const [anexoNome, setAnexoNome] = useState('Adicionar anexo'); // Para exibir o nome do anexo ou texto padrão

    const handleSalvarReceita = () => {
        console.log('Receita a ser salva:', {
            descricao,
            valor,
            data,
            categoria,
            conta,
            anexo: anexoNome === 'Adicionar anexo' ? '' : anexoNome, // Se for o texto padrão, anexo é vazio
        });
        alert('Receita salva!'); // Use um modal personalizado em produção
        // Resetar formulário
        setDescricao('');
        setValor('');
        setData('22/05/2025');
        setCategoria('');
        setConta('');
        setAnexoNome('Adicionar anexo');
    };

    const handleAddAnexo = () => {
        console.log('Abrir seletor de anexo...');
        // Implementar lógica de seleção de arquivo aqui (Ex: com 'expo-image-picker' ou 'react-native-document-picker')
        // Após selecionar, atualize o estado anexoNome
        // Exemplo: setAnexoNome('nome_do_arquivo.pdf');
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#f3f4f6' }}> {/* Contêiner principal com fundo */}
            <AppHeader /> {/* Inclui o cabeçalho idêntico ao print */}

            <ScrollView
                style={dashboardStyles.scrollView}
                contentContainerStyle={dashboardStyles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={dashboardStyles.mainBox}>
                    <Text style={styles.pageTitle}>Adicionar Receita</Text>

                    {/* Descrição */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.iconPlaceholder}>☰</Text> {/* Ícone Descrição */}
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputLabel}>Descrição</Text>
                            <TextInput
                                style={styles.textInput}
                                value={descricao}
                                onChangeText={setDescricao}
                                placeholder="" /* No print não tem placeholder aparente */
                                placeholderTextColor="#bbb"
                            />
                        </View>
                    </View>

                    {/* Valor */}
                    <View style={styles.inputGroup}>
                        <Image source={require('../assets/doll.png')} style={styles.iconeStatus} />
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputLabel}>R $</Text>
                            <TextInput
                                style={styles.textInput}
                                value={valor}
                                onChangeText={(text) => {
                                    // Permite apenas números e vírgula
                                    const cleanText = text.replace(/[^0-9,]/g, '');
                                    setValor(cleanText);
                                }}
                                keyboardType="numeric"
                                placeholder="0,00"
                                placeholderTextColor="#bbb"
                            />
                        </View>
                    </View>

                    {/* Data */}
                    <View style={styles.inputGroup}>
                        <Image source={require('../assets/calendario.png')} style={styles.iconeStatus} />
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputLabel}>Data</Text>
                            <TextInput
                                style={styles.textInput}
                                value={data}
                                onChangeText={setData}
                                placeholder="DD/MM/AAAA"
                                placeholderTextColor="#bbb"
                                keyboardType="number-pad"
                            />
                        </View>
                    </View>

                    {/* Categoria */}
                    <View style={styles.inputGroup}>
                       <Image source={require('../assets/icon.png')} style={styles.iconeStatus} />
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputLabel}>Categoria</Text>
                            <View style={styles.pickerWrapper}>
                                <Picker
                                    selectedValue={categoria}
                                    onValueChange={(itemValue) => setCategoria(itemValue)}
                                    style={styles.pickerStyle}
                                    itemStyle={Platform.OS === 'ios' ? styles.pickerItemStyle : {}} // Aplica itemStyle apenas no iOS
                                >
                                    <Picker.Item label="" value="" /> {/* Opção vazia */}
                                    <Picker.Item label="Salário" value="salario" />
                                    <Picker.Item label="Presente" value="presente" />
                                    <Picker.Item label="Renda Extra" value="renda_extra" />
                                    <Picker.Item label="Investimento" value="investimento" />
                                </Picker>
                                {/* Seta para dropdown (só visível no preview HTML, no RN o Picker já tem) */}
                                {Platform.OS === 'android' && (
                                    <Text style={styles.pickerArrow}>▼</Text>
                                )}
                            </View>
                        </View>
                    </View>

                    {/* Conta */}
                    <View style={styles.inputGroup}>
                        <Image source={require('../assets/conta.png')} style={styles.iconeStatus} />
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputLabel}>Conta</Text>
                            <View style={styles.pickerWrapper}>
                                <Picker
                                    selectedValue={conta}
                                    onValueChange={(itemValue) => setConta(itemValue)}
                                    style={styles.pickerStyle}
                                    itemStyle={Platform.OS === 'ios' ? styles.pickerItemStyle : {}} // Aplica itemStyle apenas no iOS
                                >
                                    <Picker.Item label="" value="" /> {/* Opção vazia */}
                                    <Picker.Item label="Conta Corrente" value="corrente" />
                                    <Picker.Item label="Poupança" value="poupanca" />
                                    <Picker.Item label="Dinheiro" value="dinheiro" />
                                    <Picker.Item label="Cartão de Crédito" value="cartao_credito" />
                                </Picker>
                                {/* Seta para dropdown */}
                                {Platform.OS === 'android' && (
                                    <Text style={styles.pickerArrow}>▼</Text>
                                )}
                            </View>
                        </View>
                    </View>

                    {/* Adicionar anexo */}
                    <View style={styles.inputGroup}>
                        <Image source={require('../assets/clipe.png')} style={styles.iconeStatus} />
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputLabel}>Adicionar anexo</Text>
                            <TouchableOpacity style={styles.anexoButton} onPress={handleAddAnexo}>
                                <Text style={styles.anexoButtonText}>{anexoNome}</Text>
                            </TouchableOpacity>
                        </View>
                        {/* Seta para anexo */}
                        <Text style={styles.pickerArrow}>▼</Text>
                    </View>

                    {/* Botão Salvar */}
                    <TouchableOpacity style={styles.saveButton} onPress={handleSalvarReceita}>
                        <Text style={styles.saveButtonText}>Salvar</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </View>
    );
};

// Estilos do cabeçalho
const headerStyles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24, // 1.5rem
        paddingVertical: 16, // 1rem
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        // Adicionar padding superior para iOS para evitar notch
        paddingTop: Platform.OS === 'ios' ? 40 : 16,
    },
    iconContainer: {
        padding: 5, // Aumenta a área clicável dos ícones
    },
    iconText: {
        fontSize: 24,
        color: '#28a745', // Cor verde dos ícones do header
    },
});

// Reutilizando os estilos da DashboardScreen para consistência
const dashboardStyles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#f3f4f6', // Cor de fundo da sua Dashboard
    },
    scrollContent: {
        alignItems: 'center',
        paddingTop: 30, // Reduzi um pouco o padding para centralizar melhor o formulário
        paddingBottom: 30, // Padding para garantir que o botão não fique colado no final
    },
    mainBox: {
        width: '95%',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20, // Ajustei o padding para um pouco mais de espaço interno
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 10,
        elevation: 5,
    },
    // Removi o 'card' direto daqui para usar o 'inputGroup' mais específico,
    // mas mantive a ideia de ter seções bem definidas.
});


// Estilos específicos da página AdicionarReceita
const styles = StyleSheet.create({
    pageTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 25,
        textAlign: 'center',
    },
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 10,
        marginBottom: 15, // Espaçamento entre os grupos de input
    },
    iconPlaceholder: {
        width: 24,
        height: 24,
        fontSize: 20, // Tamanho para simular ícone
        marginRight: 10,
        color: '#666', // Cor dos ícones dos inputs
        textAlign: 'center', // Centraliza o texto/emoji
        lineHeight: 24, // Garante que o emoji fique no centro vertical
    },
    inputWrapper: {
        flexGrow: 1, // Permite que o wrapper do input cresça
        flexDirection: 'column',
    },
    inputLabel: {
        fontSize: 14,
        color: '#777',
        marginBottom: 2,
    },
    textInput: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        padding: 0,
        fontSize: 16,
        color: '#333',
        width: '100%',
        height: 25, // Ajuste de altura para se assemelhar ao print
    },
    pickerWrapper: {
        width: '100%',
        position: 'relative', // Para posicionar a seta
    },
    pickerStyle: {
        height: 30, // Altura do picker para se assemelhar
        width: '100%',
        color: '#333',
        // No Android, o picker tem uma seta padrão. No iOS, precisa de itemStyle.
    },
    pickerItemStyle: {
        height: 30, // Altura dos itens no iOS
    },
    pickerArrow: {
        position: 'absolute',
        right: 0,
        top: 0, // Ajuste a posição para o topo do campo
        fontSize: 14, // Tamanho da seta
        color: '#999', // Cor da seta
        // Removido pointerEvents: 'none' pois é uma propriedade web. No RN, a View abaixo
        // ou a posição do Picker controlam isso.
    },
    anexoButton: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        padding: 0,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        height: 25, // Altura para alinhar com outros inputs
    },
    anexoButtonText: {
        fontSize: 16,
        color: '#333',
        flexGrow: 1,
    },
    saveButton: {
        backgroundColor: '#28a745',
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 6,
        width: '100%',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AdicionarReceita;
