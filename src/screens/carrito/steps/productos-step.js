import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Theme from '../../../assets/styles/theme';
import ListadoProductosCarrito from '../../../components/listado-productos-carrito';
import CarroService from '../../../services/carro.service';

function ProductosStep({ items }) {
    var items = CarroService.instance.getCart().items;
    return (
        <View style={{backgroundColor: 'rgba(0,0,0,00)'}}>
            <Text style={style.sugerencia}>Manten presionado para mas opciones</Text>
            <ListadoProductosCarrito
                title='manten presionado para mas opciones'
                productos={items} />
        </View>
    );
}

const style = StyleSheet.create({
    sugerencia:{
        margin: 16,
        alignSelf: 'center',
        color: Theme.colors.subtitle
    }
});

export default ProductosStep;