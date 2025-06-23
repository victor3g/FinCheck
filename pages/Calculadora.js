import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';

const botoes = [
  ['AC', '÷', '%', '÷'],
  ['7', '8', '9', 'x'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['logo', '0', ',', '='],
];

export default function Calculadora() {
  const [input, setInput] = useState('');
  const [resultado, setResultado] = useState('0');

  const handlePress = (valor) => {
    if (valor === 'AC') {
      setInput('');
      setResultado('0');
      return;
    }

    if (valor === '=') return calcular();

    if (valor === 'logo') return;

    setInput((prev) => prev + valor);
  };

  const calcular = () => {
    try {
      if (!input) return;

      const expressao = input
        .replace(/x/g, '*')
        .replace(/÷/g, '/')
        .replace(/,/g, '.');

      const resultadoCalculado = eval(expressao);

      if (resultadoCalculado !== undefined) {
        setResultado(String(resultadoCalculado).replace('.', ','));
        setInput('');
      } else {
        setResultado('Erro');
      }
    } catch (error) {
      setResultado('Erro');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.resultado}>{input || resultado}</Text>
      </View>

      <View style={styles.botoesContainer}>
        {botoes.map((linha, linhaIndex) => (
          <View key={linhaIndex} style={styles.linha}>
            {linha.map((botao, i) => {
              const isOperador = ['÷', 'x','%', '-', '+', '='].includes(botao);
              const isAC = botao === 'AC';
              const isLogo = botao === 'logo';

              return (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.botao,
                    isOperador ? styles.botaoVerde : null,
                    isAC ? styles.botaoBranco : null,
                  ]}
                  onPress={() => handlePress(botao)}
                >
                  {isLogo ? (
                    <Image source={require('../assets/logo1.png')} style={styles.logo} />
                  ) : (
                    <Text
                      style={[
                        styles.textoBotao,
                        isOperador ? styles.textoBotaoBranco : null,
                        isAC ? styles.textoBotaoPreto : null,
                      ]}
                    >
                      {botao}
                    </Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}

const largura = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    padding: 10,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  display: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    height: 70,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  resultado: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
  },
  botoesContainer: {
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    alignSelf: 'center',
  },
  linha: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  botao: {
    width: largura * 0.17,
    height: largura * 0.17,
    borderRadius: (largura * 0.17) / 2,
    backgroundColor: '#dcdcdc',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  botaoVerde: {
    backgroundColor: '#008000',
  },
  botaoBranco: {
    backgroundColor: '#fff',
  },
  textoBotao: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
  },
  textoBotaoBranco: {
    color: '#fff',
  },
  textoBotaoPreto: {
    color: '#000',
  },
  logo: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
});
