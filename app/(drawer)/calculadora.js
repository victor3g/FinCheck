import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

import { Colors } from '../../constants/Colors'; 


const useButtonDimensions = () => {
    const screenWidth = Dimensions.get('window').width;

    const padding = 20;
    const buttonMargin = 10;
    const buttonContainerWidth = screenWidth - (2 * padding);
    const buttonSize = (buttonContainerWidth - (3 * buttonMargin)) / 4;
    return { buttonSize, buttonMargin };
};

const CalculatorButton = ({ text, onPress, theme = 'number', size = 'single' }) => {
    const { buttonSize, buttonMargin } = useButtonDimensions();

    let backgroundColor = Colors.cardBackground;
    let textColor = Colors.text;

    switch(theme) {
        case 'operator':
            backgroundColor = Colors.primary;
            textColor = Colors.white;
            break;
        case 'special':
            backgroundColor = '#E0E0E0';
            textColor = Colors.text;
            break;
        case 'number':
        default:
            backgroundColor = Colors.cardBackground;
            textColor = Colors.text;
            break;
    }

    const buttonStyle = [
        styles.button,
        { 
            width: size === 'double' ? (buttonSize * 2) + buttonMargin : buttonSize, 
            height: buttonSize,
            backgroundColor: backgroundColor,
        }
    ];

    const textStyle = [
        styles.buttonText,
        { color: textColor }
    ];

    return (
        <TouchableOpacity style={buttonStyle} onPress={() => onPress(text)}>
            <Text style={textStyle}>{text}</Text>
        </TouchableOpacity>
    );
};


export default function CalculadoraScreen() {
    const [displayValue, setDisplayValue] = useState('0');
    const [operator, setOperator] = useState(null);
    const [firstValue, setFirstValue] = useState('');
    const [waitingForOperand, setWaitingForOperand] = useState(false);


    const handleNumberInput = (num) => {
        if (waitingForOperand) {
            setDisplayValue(String(num));
            setWaitingForOperand(false);
        } else {
            setDisplayValue(displayValue === '0' ? String(num) : displayValue + num);
        }
    };
    const handleDecimal = () => { if (!displayValue.includes('.')) { setDisplayValue(displayValue + '.'); } };
    const handleOperatorInput = (nextOperator) => {
        const inputValue = parseFloat(displayValue);
        if (operator && !waitingForOperand) {
            const result = performCalculation();
            setDisplayValue(String(result));
            setFirstValue(String(result));
        } else {
            setFirstValue(displayValue);
        }
        setWaitingForOperand(true);
        setOperator(nextOperator);
    };
    const performCalculation = () => {
        const inputValue = parseFloat(displayValue);
        const firstOperand = parseFloat(firstValue);
        if (operator === '+') return firstOperand + inputValue;
        if (operator === '-') return firstOperand - inputValue;
        if (operator === '×') return firstOperand * inputValue;
        if (operator === '÷') return firstOperand / inputValue;
        return inputValue;
    };
    const handleEqual = () => {
        if (!operator) return;
        const result = performCalculation();
        setDisplayValue(String(result));
        setFirstValue('');
        setOperator(null);
        setWaitingForOperand(true);
    };
    const handleClear = () => { setDisplayValue('0'); setOperator(null); setFirstValue(''); setWaitingForOperand(false); };
    const handlePlusMinus = () => { setDisplayValue(String(parseFloat(displayValue) * -1)); };
    const handlePercentage = () => { setDisplayValue(String(parseFloat(displayValue) / 100)); };
    const handleButtonPress = (buttonValue) => {
        if (!isNaN(buttonValue) || buttonValue === '.') {
            if (buttonValue === '.') handleDecimal();
            else handleNumberInput(buttonValue);
        } else {
            switch (buttonValue) {
                case 'AC': handleClear(); break;
                case '+/-': handlePlusMinus(); break;
                case '%': handlePercentage(); break;
                case '=': handleEqual(); break;
                case '+': case '-': case '×': case '÷':
                    handleOperatorInput(buttonValue);
                    break;
            }
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.displayContainer}>
                <Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>{displayValue}</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <View style={styles.row}>
                    <CalculatorButton text="AC" theme="special" onPress={handleButtonPress} />
                    <CalculatorButton text="+/-" theme="special" onPress={handleButtonPress} />
                    <CalculatorButton text="%" theme="special" onPress={handleButtonPress} />
                    <CalculatorButton text="÷" theme="operator" onPress={handleButtonPress} />
                </View>
                <View style={styles.row}>
                    <CalculatorButton text="7" theme="number" onPress={handleButtonPress} />
                    <CalculatorButton text="8" theme="number" onPress={handleButtonPress} />
                    <CalculatorButton text="9" theme="number" onPress={handleButtonPress} />
                    <CalculatorButton text="×" theme="operator" onPress={handleButtonPress} />
                </View>
                <View style={styles.row}>
                    <CalculatorButton text="4" theme="number" onPress={handleButtonPress} />
                    <CalculatorButton text="5" theme="number" onPress={handleButtonPress} />
                    <CalculatorButton text="6" theme="number" onPress={handleButtonPress} />
                    <CalculatorButton text="-" theme="operator" onPress={handleButtonPress} />
                </View>
                <View style={styles.row}>
                    <CalculatorButton text="1" theme="number" onPress={handleButtonPress} />
                    <CalculatorButton text="2" theme="number" onPress={handleButtonPress} />
                    <CalculatorButton text="3" theme="number" onPress={handleButtonPress} />
                    <CalculatorButton text="+" theme="operator" onPress={handleButtonPress} />
                </View>
                <View style={styles.row}>
                    <CalculatorButton text="0" theme="number" size="double" onPress={handleButtonPress} />
                    <CalculatorButton text="." theme="number" onPress={handleButtonPress} />
                    <CalculatorButton text="=" theme="operator" onPress={handleButtonPress} />
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    displayContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingHorizontal: 30,
        paddingBottom: 20,
    },
    displayText: {
        color: Colors.text,
        fontSize: 80,
        fontWeight: '300',
    },
    buttonsContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: Colors.borderColor,
    },
    buttonText: {
        fontSize: 32,
        fontWeight: '500',
    },
});