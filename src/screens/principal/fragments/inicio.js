
import React, { Fragment, Component } from 'react';
import { Appbar, Button, Portal } from 'react-native-paper';
import { Animated, Dimensions, ScrollView, StatusBar, Text, View } from 'react-native';
import ListadoProductosHorizontal from '../../../components/listado-productos-horizontal';
import Slider from '../../../components/banner';
import MyTheme from '../../../assets/styles';
import ApiService from '../../../services/api.service';
import Axios from 'axios';
import { connect } from 'react-redux';
import ConnectionsDialogs from '../../../components/connections-dialogs';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import BottomSheet from 'reanimated-bottom-sheet';
import BottomSheet from 'react-native-bottomsheet-reanimated';
import BottomSheetBehavior from 'reanimated-bottom-sheet';
import RBSheet from 'react-native-raw-bottom-sheet';
import ItemMenuDialog from '../../../components/item-menu-dialog';
import RNBottomActionSheet from 'react-native-bottom-action-sheet';



class Inicio extends Component {

    bottomSheet = React.createRef(null);
    window = Dimensions.get('window');
    Screen = {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    };
    snapPoints = [0, '50%'];

    constructor(props) {
        super(props);
        this.state = {
            productosMasVendidos: [],
            productosEnVenta: [],
            onLoading: false,
            onError: false,
            opacity: new Animated.Value(0),
            isOpen: false,
            sheetView: false
        }

    }

    componentDidMount() {
        this._getProducts();
    }

    _getProducts = () => {
        // this.setState({ onLoading: true });
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
                console.log(error);
            });
    }

    renderContent = () => (
        <View
            style={{
                backgroundColor: 'white',
                padding: 16,
                height: 450,
            }}
        >
            <Text>Swipe down to close</Text>
        </View>
    );

    onClose = () => {
        Animated.timing(this.state.opacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
        this.bottomSheet.current.snapTo(0);
        setTimeout(() => {
            this.setState({ isOpen: false });
        }, 50);
    };

    onOpen = () => {
        this.setState({ isOpen: true });
        this.bottomSheet.current.snapTo(2);
        Animated.timing(this.state.opacity, {
            toValue: 0.5,
            duration: 250,
            useNativeDriver: true,
        }).start();
    };

    renderBackDrop = () => (
        <Animated.View
            style={{
                opacity: this.state.opacity,
                backgroundColor: '#000',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            }}>
            <TouchableOpacity
                style={{
                    width: this.window.width,
                    height: this.window.height,
                    backgroundColor: 'transparent',
                }}
                activeOpacity={1}
                onPress={this.onClose}
            />
        </Animated.View>
    );

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
                            // this.bottomSheet.current.snapTo(1);
                            // this.onOpen()
                            // this.props.navigation.navigate('buscar')
                            // this.RBSheet.open()
                            this.setState({
                                sheetView: true
                            })
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
                <RNBottomActionSheet.SheetView visible={this.state.sheetView} title={"Awesome!"} theme={"light"} onSelection={(index, value) => {
                    // value is optional
                    console.log("selection: " + index + " " + value);
                }}>
                    <RNBottomActionSheet.SheetView.Item title={"Facebook"} subTitle={"Facebook Description"}  />
                    <RNBottomActionSheet.SheetView.Item title={"Instagram"} subTitle={"Instagram Description"}  />
                </RNBottomActionSheet.SheetView>
                {/* <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    animationType='fade'
                    height={300}
                    duration={250}
                    customStyles={{
                        container: {
                            justifyContent: "center",
                            alignItems: "center"
                        }
                    }}
                >
                    <ItemMenuDialog
                        icon='heart-outline'
                        label='Agregar a favorito'
                        onPress={() => {
                            setOpciones(false);
                            alert('click')
                        }} />
                    <ItemMenuDialog
                        icon='information-outline'
                        label='Detalles'
                        onPress={() => {
                            setOpciones(false);
                            alert('click')
                        }} />
                </RBSheet> */}
            </Fragment>
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