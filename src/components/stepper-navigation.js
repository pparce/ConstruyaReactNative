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
            {
                !isEnd
                    ?
                    <Button
                        style={style.button}
                        uppercase
                        onPress={isEnd ? end : next}
                        mode='text'>
                        Siguiente
                    </Button>
                    :
                    <Button
                        style={style.buttonFinalizar}
                        uppercase
                        onPress={end}
                        mode='contained'>
                        Finalizar
                    </Button>
            }

        </View>
    );
}

export default StepperNavigation;

const style = StyleSheet.create({
    container: {
        borderTopWidth: 0.3,
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: theme.colors.black,
    },
    button: {
        margin: 8,
    },
    buttonFinalizar: {
        margin: 8,
    }
})