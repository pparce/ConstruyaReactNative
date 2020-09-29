import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Theme from '../../../assets/styles/theme';
import ListadoProductosCarrito from '../../../components/listado-productos-carrito';
import TablaResumenCarro from '../../../components/tabla-resumen-carro';
import CarroService from '../../../services/carro.service';

function ProductosStep({ items }) {
    var cart = CarroService.instance.getCart();
    var items = cart.items;
    return (
        <View style={[Theme.style.container, {  backgroundColor: 'rgba(0,0,0,00)' }]}>
            <ListadoProductosCarrito
                title='manten presionado para mas opciones'
                productos={items}
                header={<Text style={style.sugerencia}>Manten presionado para mas opciones</Text>}
                footer={<TablaResumenCarro cart={cart} />} />

        </View>
    );
}

const style = StyleSheet.create({
    sugerencia: {
        margin: 16,
        alignSelf: 'center',
        color: Theme.colors.subtitle
    }
});

export default ProductosStep;