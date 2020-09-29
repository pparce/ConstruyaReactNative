import React, { Component } from 'react';
import { View, Text, StatusBar, StyleSheet } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { Appbar } from 'react-native-paper';
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

class Carrito extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            steppers: ['Productos', 'Envío', 'Pago'],
            billing_information: {},
            login: this.props.login
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
        ApiService.instance.post(ApiService.ORDER, this._buildJSON()).then(
            response => {
                console.log(response);
            }, error => {
                console.log(error);
            }
        );
    }

    _buildJSON = () => {
        let login = ReduxService.instance.getRedux().login.login;
        let cart = CarroService.instance.getCart();
        let order = {
            order: {
                customer: login.customer.id,
                canal: cart.canal,
                billing_information: this.state.billing_information,
                shipping_information: this.state.billing_information,
                subtotal: cart.subtotal,
                total: cart.total,
                check_price: cart.check_price,
                items: this._buildItemsArray(cart.items)
            }
        }
        console.log(order);
        return order;
    }

    _buildItemsArray = (items) => {
        let arrayItems = [];
        items.forEach(item => {
            arrayItems.push(
                {
                    // id:,
                    price: item.price,
                    price_checked: item.check_price,
                    product_id: item.product.id,
                    qty: item.qty,
                    subtotal: item.subtotal,
                    options: [],
                }
            );
        });
        return arrayItems;
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Appbar.Header style={[MyTheme.style.toolbar]}>
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
                        // this.setState({ currentPage: position });
                    }}
                    scrollEnabled={true}
                    style={styles.viewPager}
                    initialPage={0}>
                    <ProductosStep key='1' />
                    <EnvioStep onRef={ref => (this.envioStep = ref)} login={this.state.login} key='2' />
                    <PagoStep key='3' />
                </ViewPager>
                <StepperNavigation
                    steppers={this.state.steppers}
                    currentPage={this.state.currentPage}
                    back={this._lastStep}
                    next={this._nextStep}
                    end={this._endStep} />
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
    login: state.login
});

const mapDispatchToProps = {
    // setCart: setCart
};

export default connect(mapStateToProps, mapDispatchToProps)(Carrito);