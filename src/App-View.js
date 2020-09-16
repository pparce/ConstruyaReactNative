import React, { Component } from 'react';
import { Provider, Snackbar } from 'react-native-paper';
import MyTheme from './assets/styles';
import AppStack from './routes/stacks';
import { connect } from 'react-redux';
import { getCart } from './redux/cart/selectors';
import CarroService from './services/carro.service';
import { hideSnackBar, setCart, showSnackBar, showSnakBar } from './redux/cart/actions';
import { useNavigation } from '@react-navigation/native';
import * as RootNavigation from './utiles/navigation/root-navigation';
import ConnectionsDialogs from './components/connections-dialogs';
import { hideErrorConnectionDialog, hideLoading, showErrorConnectionDialog, showLoading } from './redux/app/actions';
import ReduxService from './services/redux.service';

class AppView extends Component {
    constructor(props) {
        super(props);
        ReduxService.instance.setRedux(this.props);
    }

    render() {
        var showSnack = this.props.cart.showSnackBar;
        var app = this.props.app;
        console.log(this.props);
        return (
            <Provider theme={MyTheme}>
                <AppStack />
                <Snackbar
                    onDismiss={() => {
                        this.props.hideSnackBar();
                    }}
                    action={{
                        label: 'ver',
                        onPress: () => {
                            RootNavigation.navigate('carrito');
                        }
                    }}
                    duration={2000}
                    visible={showSnack}>
                    Producto agregado al carrito.
                </Snackbar>
                <ConnectionsDialogs
                    onLoading={app.showLoading}
                    onError={app.showErrorConnectionDialog}
                    onCancel={() => {
                        this.props.hideErrorConnectionDialog();
                        // this.props.navigation.goBack()
                    }}
                    onRetry={() => {
                        this.props.hideErrorConnectionDialog();
                        app.retryAction.action(app.retryAction.params)
                    }} />
            </Provider>
        );
    }
}

const mapStateToProps = state => ({
    cart: state.cart,
    // showSnackBar: state.cart,
    app: state.app
});

const mapDispatchToProps = {
    setCart: setCart,
    showSnackBar: showSnackBar,
    hideSnackBar: hideSnackBar,
    showLoading: showLoading,
    hideLoading: hideLoading,
    showErrorConnectionDialog: showErrorConnectionDialog,
    hideErrorConnectionDialog: hideErrorConnectionDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppView);