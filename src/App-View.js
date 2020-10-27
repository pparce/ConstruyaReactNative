import React, { Component } from 'react';
import { Provider, Snackbar } from 'react-native-paper';
import MyTheme from './assets/styles';
import { connect } from 'react-redux';
import { hideSnackBar, setCart, showSnackBar } from './redux/cart/actions';
import * as RootNavigation from './navigation/root-navigation';
import ConnectionsDialogs from './components/connections-dialogs';
import { hideErrorConnectionDialog, hideLoading, setSnackInfo, showErrorConnectionDialog, showLoading } from './redux/app/actions';
import ReduxService from './services/redux.service';
import AppStack from './navigation/routes/stacks';
import { getLogin, setCredentials, setLogin } from './redux/login/actions';
import { setFavorites, addFavorites, removeFavorites, showSnackBarFavorites, hideSnackBarFavorites } from './redux/favorites/actions';
import Theme from './assets/styles/theme';

class AppView extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        ReduxService.instance.setRedux(this.props);
        var showSnackCart = this.props.cart.showSnackBar;
        var showSnackFavorites = this.props.favorites.showSnackBar;
        var snackbarInfo = this.props.app.snackInfo;
        var app = this.props.app;
        return (
            <Provider theme={Theme}>
                <AppStack />
                <Snackbar
                    onDismiss={() => {
                        this.props.hideSnackBarCart();
                    }}
                    action={{
                        label: 'ver',
                        onPress: () => {
                            RootNavigation.navigate('carrito');
                        }
                    }}
                    duration={2000}
                    visible={showSnackCart}>
                    Producto agregado al carrito.
                </Snackbar>
                <Snackbar
                    onDismiss={() => {
                        this.props.hideSnackBarFavorite();
                    }}
                    duration={2000}
                    visible={showSnackFavorites}>
                    Producto agregado a Favoritos
                </Snackbar>
                <Snackbar
                    onDismiss={() => {
                        this.props.setSnackInfo({
                            show: false,
                            message: ''
                        });
                    }}
                    duration={2000}
                    visible={snackbarInfo.show}>
                    {snackbarInfo.message}
                </Snackbar>
                <ConnectionsDialogs
                    onLoading={app.showLoading}
                    onError={app.showErrorConnectionDialog}
                    onCancel={() => {
                        this.props.hideErrorConnectionDialog();
                        app.retryAction.cancel(app.retryAction.params)
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
    app: state.app,
    favorites: state.favorites,
    getFavorites: state.favorites.favorites
});

const mapDispatchToProps = {
    setCart: setCart,
    setLogin: setLogin,
    setCredentials: setCredentials,
    setFavorites: setFavorites,
    setSnackInfo: setSnackInfo,
    addFavorites: addFavorites,
    removeFavorites: removeFavorites,
    showSnackBarCart: showSnackBar,
    hideSnackBarCart: hideSnackBar,
    showSnackBarFavorite: showSnackBarFavorites,
    hideSnackBarFavorite: hideSnackBarFavorites,
    showLoading: showLoading,
    hideLoading: hideLoading,
    showErrorConnectionDialog: showErrorConnectionDialog,
    hideErrorConnectionDialog: hideErrorConnectionDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppView);