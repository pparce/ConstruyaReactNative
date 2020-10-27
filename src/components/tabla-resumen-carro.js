import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Theme from '../assets/styles/theme';
import Utiles from '../utiles/funciones_utiles';

function TablaResumenCarro({ cart }) {
    return (
        <View style={style.container}>
            <ItemInfo label='SUBTOTAL' value={Utiles._redondearValorDecimal(cart.subtotal)} />
            <ItemInfo label='DESCUENTO' value={Utiles._redondearValorDecimal(cart.discount)} />
            <ItemInfo label='ENVIO' value={Utiles._redondearValorDecimal(cart.shipping)} />
            <ItemInfo label='IVA' value={Utiles._redondearValorDecimal(cart.subtotal)} estilo={{ backgroundColor: Theme.colors.grisClaro }} />
        </View>
    );
}

function ItemInfo({ estilo, label, value = '$00.00' }) {
    return (
        <View style={[style.item, estilo]}>
            <Text style={style.label}>{label}</Text>
            <Text style={style.label}>${value}</Text>
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