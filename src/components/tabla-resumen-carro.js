import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Theme from '../assets/styles/theme';

function TablaResumenCarro({ cart }) {
    return (
        <View style={style.container}>
            <ItemInfo label='TOTAL PARCIAL' value={cart.subtotal} />
            <ItemInfo label='DESCUENTO' value={cart.subtotal} />
            <ItemInfo label='IMPUESTO' value={cart.subtotal} />
            <ItemInfo label='TOTAL' value={cart.subtotal} estilo={{ backgroundColor: Theme.colors.grisClaro }} />
        </View>
    );
}

function ItemInfo({ estilo, label, value = '$00.00' }) {
    return (
        <View style={[style.item,  estilo ]}>
            <Text style={style.label}>{label}</Text>
            <Text style={style.label}>{value}</Text>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        width: '50%',
        alignSelf: 'flex-end',
        borderWidth: 0.5,
        marginTop: 16,
        borderColor: Theme.colors.black,
    },
    item: {
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        color: Theme.colors.subtitle,
    }
});

export default TablaResumenCarro;