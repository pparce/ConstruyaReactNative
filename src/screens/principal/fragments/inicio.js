
import React, { Fragment, Component } from 'react';
import { Appbar, Button, Portal } from 'react-native-paper';
import { Animated, BackHandler, Dimensions, Alert, ScrollView, StatusBar, Text, View, Platform } from 'react-native';
import ListadoProductosHorizontal from '../../../components/listado-productos-horizontal';
import Banner from '../../../components/banner';
import ApiService from '../../../services/api.service';
import { connect } from 'react-redux';
import BoottomSheetComponent from '../../../components/bottom-sheet';
import Theme from '../../../assets/styles/theme';
import ReduxService from '../../../services/redux.service';
import DetalleDialog from '../../../components/detalle-dialog';



class Inicio extends Component {

    // bottomSheet = React.createRef(null);
    window = Dimensions.get('window');
    Screen = {
        width: Dimensions.get('window').width,
        height: Platform.OS !== 'ios' && Dimensions.get('screen').height !== Dimensions.get('window').height && StatusBar.currentHeight > 24
            ? Dimensions.get('screen').height
            : Dimensions.get('window').height
    };
    snapPoints = [0, '50%'];
    canAddFavorito = false;

    constructor(props) {
        super(props);
        this.state = {
            productosMasVendidos: [],
            productosEnVenta: [],
            onLoading: false,
            onError: false,
            opacity: new Animated.Value(0),
            isOpen: false,
            sheetView: false,
            item: {},
            detalleDialog: false,
            showBottomSheet: false
        }
    }

    componentDidMount() {
        this._getProducts();
    }

    _getProducts = () => {
        Promise.all(
            [
                ApiService.instance.get(ApiService.PRODUCTS_MOST_SALED),
                ApiService.instance.get(ApiService.PRODUCTS_ON_SALE)
            ]
        ).then((response) => {
            this.setState({
                productosMasVendidos: response[0],
                productosEnVenta: response[1],
                onLoading: false,
                showBottomSheet: true
            });
        }).catch(error => {
            ReduxService.instance.getRedux().hideLoading();
            if (!ReduxService.instance.getRedux().app.showErrorConnectionDialog) {
                ReduxService.instance.getRedux().showErrorConnectionDialog({
                    action: () => {
                        this._getProducts();
                    },
                    cancel: () => {
                        BackHandler.exitApp();
                    },
                    params: 'inicio'
                });
            }
        });
    }

    _onMenuPress = (item, position) => {
        switch (position) {
            case 0:
                this._addToFavorites(item)
                break;
            case 1:
                this.setState({ item: item, detalleDialog: true })
                break;
        }
    }

    _addToFavorites = (item) => {
        if (item) {
            ReduxService.instance.getRedux().addFavorites(item);
            ReduxService.instance.getRedux().showSnackBarFavorite();
        }
    }

    render() {
        var cart = this.props.cart.cart;
        return (
            <View style={{ height: this.Screen.height }}>
                <Appbar.Header style={[Theme.style.toolbar, { marginTop: StatusBar.currentHeight, elevation: 0 }]}>
                    <Appbar.Action
                        icon="menu"
                        onPress={() => this.props.navigation.openDrawer()}
                    />
                    <Appbar.Content title='Inicio' />
                    <Appbar.Action
                        style={{ alignSelf: 'flex-end' }}
                        icon="magnify"
                        onPress={() => {
                            this.props.navigation.navigate('buscar');
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
                    <Banner />
                    <ListadoProductosHorizontal
                        navigation={this.props.navigation}
                        title='Productos en oferta'
                        productos={this.state.productosEnVenta}
                        onItemLongPress={(item) => {
                            this.bottomSheet._show(item);
                        }} />
                    <ListadoProductosHorizontal
                        title='Lo mas vendido'
                        productos={this.state.productosMasVendidos}
                        onItemLongPress={(item) => {
                            this.bottomSheet._show(item);
                        }} />
                </ScrollView>

                {
                    this.state.showBottomSheet &&
                    <BoottomSheetComponent onRef={ref => (this.bottomSheet = ref)} onMenuPress={this._onMenuPress} />
                }

                <DetalleDialog
                    visible={this.state.detalleDialog}
                    item={this.state.item}
                    onDismiss={() => {
                        this.setState({ detalleDialog: false })
                    }} />
            </View>
        );
    }

}

const mapStateToProps = state => ({
    cart: state.cart
});

const mapDispatchToProps = {
    // setCart: setCart
};

export default connect(mapStateToProps, mapDispatchToProps)(Inicio);