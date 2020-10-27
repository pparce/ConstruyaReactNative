import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import Theme from '../../../assets/styles/theme';
import CustomBoottomSheetComponent from '../../../components/custom-bottom-sheet';
import ItemMenuDialog from '../../../components/item-menu-dialog';
import ListadoProductosCarrito from '../../../components/listado-productos-carrito';
import TablaResumenCarro from '../../../components/tabla-resumen-carro';
import CarroService from '../../../services/carro.service';

class ProductosStep extends Component {

    constructor(props) {
        super(props)
        this.cart = CarroService.instance.getCart();
        this.state = {
            items: this.props.cart.cart.items ? this.props.cart.cart.items : [],
            cart: ''
        }
    }

    render() {
        return (
            <View style={{ backgroundColor: 'rgba(0,0,0,00)', height: '100%' }}>
                <ListadoProductosCarrito
                    title='manten presionado para mas opciones'
                    productos={this.props.cart.cart.items}
                    onLongPressItem={this.props.onLongPressItem}
                    header={<Text style={style.sugerencia}>Manten presionado para mas opciones</Text>}
                    footer={<View style={{ marginHorizontal: 16 }}><TablaResumenCarro cart={this.cart} /></View>} />

            </View>
        );
    }
}

const style = StyleSheet.create({
    sugerencia: {
        margin: 16,
        alignSelf: 'center',
        color: Theme.colors.subtitle
    }
});

const mapStateToProps = state => ({
    cart: state.cart
});

const mapDispatchToProps = {
    // setCart: setCart
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductosStep)