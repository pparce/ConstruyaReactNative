import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Theme from '../../../assets/styles/theme';

function PagoStep() {
    return (
        <View style={[Theme.style.container, style.container]}>
            <Text>Su pedido sera enviado de inmediato. Haga clic en el boton confirmar para finalizar.</Text>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,00)'
    }
});

export default PagoStep;