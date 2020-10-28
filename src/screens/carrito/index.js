import React, { Component } from 'react';
import { View, Text, StatusBar, StyleSheet, Dimensions, Platform } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { Appbar, Button, Dialog, Portal } from 'react-native-paper';
import MyTheme from "../../assets/styles";
import StepperIndicator from '../../components/stepper-indicator';
import StepperNavigation from '../../components/stepper-navigation';
import CarroService from '../../services/carro.service';
import ProductosStep from './steps/productos-step';
import EnvioStep from './steps/envio-step';
import PagoStep from './steps/pago-step';
import ReduxService from '../../services/redux.service';
import ApiService from '../../services/api.service';
import { connect } from 'react-redux';
import CustomBoottomSheetComponent from '../../components/custom-bottom-sheet';
import ItemMenuDialog from '../../components/item-menu-dialog';
import Theme from '../../assets/styles/theme';
import Cantidad from '../../components/cantidad';
import EmptyScreen from '../../components/empty-screen';

class Carrito extends Component {
    window = Dimensions.get('window');
    window = Dimensions.get('window');
    Screen = {
        width: Dimensions.get('window').width,
        height: Platform.OS !== 'ios' && Dimensions.get('screen').height !== Dimensions.get('window').height && StatusBar.currentHeight > 24
            ? Dimensions.get('screen').height
            : Dimensions.get('window').height
    };
    constructor(props) {
        super(props);
        this.cantidad = 1;
        this.item = {};
        this.state = {
            currentPage: 0,
            steppers: ['Productos', 'Envío', 'Pago'],
            billing_information: {},
            login: this.props.login,
            cart: this.props.cart.cart,
            diabledNext: false,
            item: {},
            dialogCantidad: false
        };
    }
    _nextStep = () => {
        if (this.state.currentPage != 1) {
            this.setState({ currentPage: this.state.currentPage + 1 })
            this.viewPager.setPage(this.state.currentPage + 1)
        } else {
            let data = this.envioStep._onSubmit();
            if (data.valid) {
                this.setState({ currentPage: this.state.currentPage + 1 })
                this.viewPager.setPage(this.state.currentPage + 1)
                this.setState({
                    billing_information: data.data
                })
            }
        }
    }

    _lastStep = () => {
        this.viewPager.setPage(this.state.currentPage - 1)
        this.setState({ currentPage: this.state.currentPage - 1 })
    }

    _endStep = () => {
        // console.log(this._buildJSON());
        ApiService.instance.post(ApiService.ORDER, this._buildJSON()).then(
            response => {
                if (response.id) {
                    ReduxService.instance.getRedux().setSnackInfo({
                        show: true,
                        message: 'El pedido se ha realizado con éxito'
                    });
                    CarroService.instance.clearCart();
                    this.props.navigation.goBack();
                } else {
                    ReduxService.instance.getRedux().setSnackInfo({
                        show: true,
                        message: 'Ha ocurrido un error. Intentelo nuevamente'
                    });
                }
            }
        ).catch(error => {
            ReduxService.instance.getRedux().hideLoading();
            if (!ReduxService.instance.getRedux().app.showErrorConnectionDialog) {
                ReduxService.instance.getRedux().showErrorConnectionDialog({
                    action: () => {
                        this._endStep();
                    },
                    cancel: () => {
                        // this.props.navigation.goBack();
                    },
                    params: 'carrito'
                });
            }
        });
    }

    _buildJSON = () => {
        let login = ReduxService.instance.getRedux().login.login;
        let cart = CarroService.instance.getCart();
        let order = {
            create_user: login.customer.user.id,
            customer: login.customer.id,
            update_user: login.customer.user.id,
            tenant: '12',
            order: {
                ...cart,
                customer: login.customer.id,
                canal: cart.canal,
                channel_references: [],
                billing_information: this.state.billing_information,
                shipping_information: this.state.billing_information,
                subtotal: cart.subtotal,
                total: cart.total,
                check_price: cart.check_price,
                items: this._buildItemsArray(cart.items)
            }
        }
        return order;
    }

    _buildItemsArray = (items) => {
        let arrayItems = [];
        items.forEach(item => {
            arrayItems.push(
                {
                    // id:,
                    price: item.price,
                    price_checked: item.check_price ? item.check_price : 0,
                    product_id: item.product.id,
                    qty: item.qty,
                    subtotal: item.subtotal,
                    options: [],
                }
            );
        });
        return arrayItems;
    }

    _onLongPressItem = (item) => {
        this.setState({ item: item })
        this.bottomSheet._show();
    }

    _editItem = () => {
        CarroService.instance.editItem(this.state.item, this.cantidad);
    }

    _removeItem = () => {
        if (CarroService.instance.removeItem(this.state.item) == 0) {
            CarroService.instance.clearCart();
            this.props.navigation.goBack();
        }
        this.setState()
    }

    render() {
        return (
            <View style={{ height: this.Screen.height }}>
                <Appbar.Header style={[Theme.style.toolbar, { borderBottomWidth: 0 }]}>
                    <Appbar.Action
                        icon="arrow-left"
                        onPress={() => this.props.navigation.goBack()}
                    />
                    <Appbar.Content title='Carro de Compras' />
                    <Appbar.Action
                        icon="delete-sweep"
                        onPress={() => {
                            CarroService.instance.clearCart();
                            this.props.navigation.goBack();
                        }}
                    />
                </Appbar.Header>

                <StepperIndicator
                    steppSelected={this.state.currentPage}
                    titulos={this.state.steppers} />
                <ViewPager
                    ref={(viewpager) => {
                        this.viewPager = viewpager;
                    }}
                    onPageSelected={(e) => {
                        var position = e.nativeEvent.position;
                        if (position == 1 && !this.props.login.isLogin) {
                            this.setState({ disabledNext: true });
                        } else {
                            this.setState({ disabledNext: false });
                        }
                        // this.setState({ currentPage: position });
                    }}
                    scrollEnabled={false}
                    style={styles.viewPager}
                    initialPage={this.state.currentPage}>
                    <ProductosStep
                        key='1'
                        onLongPressItem={(item) => {
                            this._onLongPressItem(item);
                        }}
                    />
                    <EnvioStep navigation={this.props.navigation} onRef={ref => (this.envioStep = ref)} login={this.state.login} key='2' />
                    <PagoStep key='3' />
                </ViewPager>
                <StepperNavigation
                    steppers={this.state.steppers}
                    currentPage={this.state.currentPage}
                    back={this._lastStep}
                    next={this._nextStep}
                    end={this._endStep}
                    disabledNext={this.state.disabledNext} />
                <CustomBoottomSheetComponent onRef={ref => (this.bottomSheet = ref)} >
                    <ItemMenuDialog
                        icon='pencil-outline'
                        label='Editar Cantidad'
                        onPress={() => {
                            this.bottomSheet._dismiss();
                            this.setState({ dialogCantidad: true })
                        }} />
                    <ItemMenuDialog
                        icon='delete-outline'
                        label='Eliminar'
                        onPress={() => {
                            this._removeItem();
                            this.bottomSheet._dismiss();
                        }} />
                </CustomBoottomSheetComponent>

                <Dialog
                    visible={this.state.dialogCantidad}
                    dismissable={true}
                    onDismiss={() => {
                        this.setState({ dialogCantidad: false })
                    }}>
                    <Dialog.Title>Editar Cantidad</Dialog.Title>
                    <Dialog.Content>
                        <View style={[Theme.style.alingHorizontal, { alignItems: 'center', marginTop: 16 }]}>
                            <Cantidad
                                qty={this.state.item.qty}
                                onChange={(value) => {
                                    this.cantidad = value;
                                }}
                                style={{ flex: 1, alignSelf: 'flex-end' }} />
                        </View>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button
                            onPress={() => {
                                this.setState({ dialogCantidad: false })
                            }}
                            uppercase>
                            cancelar
                            </Button>
                        <Button
                            onPress={() => {
                                this.setState({ dialogCantidad: false })
                                this._editItem();
                            }}
                            uppercase>
                            Editar
                            </Button>
                    </Dialog.Actions>
                </Dialog>
            </View>
        );
    };
}

var styles = StyleSheet.create({
    viewPager: {
        flex: 1
    },
    pageStyle: {
        alignItems: 'center',
        padding: 20,
    }
});

const mapStateToProps = state => ({
    login: state.login,
    cart: state.cart
});

const mapDispatchToProps = {
    // setCart: setCart
};

export default connect(mapStateToProps, mapDispatchToProps)(Carrito);