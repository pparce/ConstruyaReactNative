import React, { Component } from 'react';
import { Provider, Snackbar } from 'react-native-paper';
import MyTheme from './assets/styles';
import { connect } from 'react-redux';
import { hideSnackBar, setCart, showSnackBar } from './redux/cart/actions';
import * as RootNavigation from './navigation/root-navigation';
import ConnectionsDialogs from './components/connections-dialogs';
import { hideErrorConnectionDialog, hideLoading, showErrorConnectionDialog, showLoading } from './redux/app/actions';
import ReduxService from './services/redux.service';
import AppStack from './navigation/routes/stacks';
import { getLogin, setLogin } from './redux/login/actions';
import Theme from './assets/styles/theme';

class AppView extends Component {
    constructor(props) {
        super(props);
        ReduxService.instance.setRedux(this.props);
    }

    render() {
        var showSnack = this.props.cart.showSnackBar;
        var app = this.props.app;
        return (
            <Provider theme={Theme}>
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
                        // RootNavigation.goBack();
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
    login: state.login,
    // showSnackBar: state.cart,
    app: state.app
});

const mapDispatchToProps = {
    setCart: setCart,
    setLogin: setLogin,
    getLogin: getLogin,
    showSnackBar: showSnackBar,
    hideSnackBar: hideSnackBar,
    showLoading: showLoading,
    hideLoading: hideLoading,
    showErrorConnectionDialog: showErrorConnectionDialog,
    hideErrorConnectionDialog: hideErrorConnectionDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppView);