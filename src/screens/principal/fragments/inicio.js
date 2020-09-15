
import React, { Fragment, Component } from 'react';
import { Appbar, Button } from 'react-native-paper';
import { ScrollView, StatusBar, Text } from 'react-native';
import ListadoProductosHorizontal from '../../../components/listado-productos-horizontal';
import Slider from '../../../components/banner';
import MyTheme from '../../../assets/styles';
import ApiService from '../../../services/api.service';
import Axios from 'axios';
import { hideLoading, showLoading } from '../../../redux/app/actions';
import { connect } from 'react-redux';
import ConnectionsDialogs from '../../../components/connections-dialogs';
import CarroService from '../../../services/carro.service';
import { setCart } from '../../../redux/cart/actions';
import { getCart } from '../../../redux/cart/selectors';


class Inicio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productosMasVendidos: [],
            productosEnVenta: [],
            onLoading: false,
            onError: false,
        }

    }

    componentDidMount() {
        this._getProducts();
    }

    render() {
        var cart = this.props.cart.cart;
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
                        onPress={() => {
                            this.props.navigation.navigate('buscar')
                        }}
                    />
                    {
                        this.props.cart.showCart &&
                        <Button
                            style={{
                                marginRight: 8,
                                display: 'flex'
                            }}
                            onPress={() => {
                                this.props.navigation.navigate('carrito');
                            }}
                            icon='cart'
                            mode='contained'>
                            ${cart.subtotal}
                    </Button>
                    }
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
                <ConnectionsDialogs
                    onLoading={this.state.onLoading}
                    onError={this.state.onError}
                    onCancel={() => {
                        this.setState({ onError: false })
                        this.props.navigation.goBack()
                    }}
                    onRetry={() => {
                        this.setState({ onError: false });
                        this._getProducts();
                    }} />
            </Fragment>
        );
    }

    _getProducts = () => {
        this.setState({ onLoading: true });
        Axios.all(
            [
                ApiService.instance.get(ApiService.PRODUCTS_MOST_SALED),
                ApiService.instance.get(ApiService.PRODUCTS_ON_SALE)
            ]
        ).then(Axios.spread((...response) => {
            this.setState({
                productosMasVendidos: response[0],
                productosEnVenta: response[1],
                onLoading: false
            });
            this.setState({});
        }))
            .catch(error => {
                this.setState({ onLoading: false, onError: true });
            });
    }
}

const mapStateToProps = state => ({
    cart: state.cart
});

const mapDispatchToProps = {
    // setCart: setCart
};

export default connect(mapStateToProps, mapDispatchToProps)(Inicio);