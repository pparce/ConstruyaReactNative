
import React, { Component, Fragment } from 'react';
import { Appbar } from 'react-native-paper';
import ListadoProductosVertical from '../../components/listado-productos-vertical';
import MyTheme from '../../assets/styles';
import { Dimensions, Platform, StatusBar, View } from 'react-native';
import ApiService from '../../services/api.service';
import { connect } from 'react-redux';
import { hideLoading, showErrorConnectionDialog, showLoading } from '../../redux/app/actions';
import ErrorConnectionDialog from '../../components/error-connection-dialog';
import LoadingDialog from '../../components/loading-dialog';
import ConnectionsDialogs from '../../components/connections-dialogs';
import ReduxService from '../../services/redux.service';
import BoottomSheetComponent from '../../components/bottom-sheet';
import Theme from '../../assets/styles/theme';

class Productos extends Component {

    window = Dimensions.get('window');
    Screen = {
        width: Dimensions.get('window').width,
        height: Platform.OS !== 'ios' && Dimensions.get('screen').height !== Dimensions.get('window').height && StatusBar.currentHeight > 24
            ? Dimensions.get('screen').height
            : Dimensions.get('window').height
    };
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.route.params.id,
            title: this.props.route.params.title,
            productos: [],
            onError: false,
            onLoading: false,
            url: ApiService.instance.buildUrlById(ApiService.PRODUCTS_BY_CATEGORIES, this.props.route.params.id),
        }
    }

    componentDidMount() {
        this._getProductos();
    }

    _getProductos = () => {
        ApiService.instance.get(this.state.url).then(
            (response) => {
                console.log(response);
                this.setState({ productos: response.products });
            }).catch(error => {
                ReduxService.instance.getRedux().hideLoading();
                if (!ReduxService.instance.getRedux().app.showErrorConnectionDialog) {
                    ReduxService.instance.getRedux().showErrorConnectionDialog({
                        action: () => {
                            this._getProductos();
                        },
                        cancel: () => {
                            this.props.navigation.goBack();
                        },
                        params: 'vista producto'
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
                break;
        }
    }

    _addToFavorites = (item) => {
        ReduxService.instance.getRedux().addFavorites(item);
        ReduxService.instance.getRedux().showSnackBarFavorite();
    }

    render() {
        return (
            <View style={{ height: this.Screen.height }}>
                <Appbar.Header style={[Theme.style.toolbar, { marginTop: StatusBar.currentHeight }]}>
                    <Appbar.Action
                        icon="arrow-left"
                        onPress={() => this.props.navigation.goBack()}
                    />
                    <Appbar.Content title={this.state.title} />
                </Appbar.Header>
                <ListadoProductosVertical
                    title='Productos en oferta'
                    url={ApiService.instance.buildUrlById(ApiService.PRODUCTS_BY_CATEGORIES, this.state.id)}
                    productos={this.state.productos}
                    onItemLongPress={(item) => {
                        this.bottomSheet._show(item);
                    }} />
                <ConnectionsDialogs
                    onLoading={this.state.onLoading}
                    onError={this.state.onError}
                    onCancel={() => {
                        this.setState({ onError: false })
                        this.props.navigation.goBack()
                    }}
                    onRetry={() => {
                        this.setState({ onError: false });
                        this._getProductos();
                    }} />
                <BoottomSheetComponent onRef={ref => (this.bottomSheet = ref)} onMenuPress={this._onMenuPress} />
            </View>
        );
    }
}

const mapStateToProps = null;
const mapDispatchToProps = {
    showLoading: showLoading,
    hideLoading: hideLoading,
    showErrorConnectionDialog: showErrorConnectionDialog
};

export default connect(mapStateToProps, mapDispatchToProps)(Productos);