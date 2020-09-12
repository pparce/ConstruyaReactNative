
import React, { Fragment, Component } from 'react';
import { Appbar } from 'react-native-paper';
import { styles } from '..';
import { ScrollView, StatusBar } from 'react-native';
import ListadoProductosHorizontal from '../../../components/listado-productos-horizontal';
import Slider from '../../../components/banner';
import MyTheme from '../../../assets/styles';
import ApiService from '../../../services/api.service';
import Axios from 'axios';


class Inicio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productosMasVendidos: [],
            productosEnVenta: []
        }
        this._getProducts();
    }

    _getProducts = () => {
        Axios.all(
            [
                ApiService.instance.get(ApiService.PRODUCTS_MOST_SALED),
                ApiService.instance.get(ApiService.PRODUCTS_ON_SALE)
            ]
        ).then(Axios.spread((...response) => {
            this.setState({ productosMasVendidos: response[0].data });
            this.setState({ productosEnVenta: response[1].data });
        }));
    }

    render() {
        return (
            <Fragment>
                <Appbar.Header style={[MyTheme.style.toolbar, { marginTop: StatusBar.currentHeight }]}>
                    <Appbar.Action
                        icon="menu"
                        onPress={() => this.props.navigation.openDrawer()}
                    />
                    <Appbar.Content title='Inicio' />
                    <Appbar.Action
                        style={{ alignSelf: 'flex-end' }}
                        icon="magnify"
                        onPress={() => this.props.navigation.navigate('buscar')}
                    />
                </Appbar.Header>

                <ScrollView>
                    <Slider />
                    <ListadoProductosHorizontal
                        navigation={this.props.navigation}
                        title='Productos en oferta'
                        productos={this.state.productosEnVenta} />
                    <ListadoProductosHorizontal
                        title='Lo mas vendido'
                        productos={this.state.productosMasVendidos} />
                </ScrollView>
            </Fragment>
        );
    }
}

export default Inicio;