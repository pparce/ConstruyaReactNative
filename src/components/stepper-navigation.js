import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import theme from '../assets/styles/theme';

function StepperNavigation({ currentPage, steppers = [], next, back, end }) {
    var isEnd = currentPage === steppers.length - 1;
    return (
        <View style={style.container}>
            <Button
                style={[style.button, { opacity: currentPage == 0 ? 0 : 1 }]}
                uppercase
                onPress={currentPage == 0 ? null : back}
                mode='text'>
                Atras
            </Button>
            <Button
                style={style.button}
                uppercase
                onPress={isEnd ? end : next}
                mode='text'>
                {isEnd ? 'Finalizar' : 'Siguiente'}
            </Button>

        </View>
    );
}

export default StepperNavigation;

const style = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: theme.colors.primary,
        elevation: 1
    },
    button: {
        margin: 8,
    }
})