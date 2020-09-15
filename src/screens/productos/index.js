
import React, { Component, Fragment } from 'react';
import { Appbar } from 'react-native-paper';
import ListadoProductosVertical from '../../components/listado-productos-vertical';
import MyTheme from '../../assets/styles';
import { StatusBar } from 'react-native';
import ApiService from '../../services/api.service';
import { connect } from 'react-redux';
import { hideLoading, showErrorConnectionDialog, showLoading } from '../../redux/app/actions';
import ErrorConnectionDialog from '../../components/error-connection-dialog';
import LoadingDialog from '../../components/loading-dialog';
import ConnectionsDialogs from '../../components/connections-dialogs';

class Productos extends Component {

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
        this.setState({onLoading: true});
        ApiService.instance.get(this.state.url).then(
            (response) => {
                this.setState({ productos: response.products, onLoading: false });
                // this.state.hideLoading();
            },
            (error) => {
                // this.state.hideLoading();
                this.setState({ onLoading: false, onError: true });
            });
    }

    render() {
        return (
            <Fragment>
                <Appbar.Header style={[MyTheme.style.toolbar, { marginTop: StatusBar.currentHeight }]}>
                    <Appbar.Action
                        icon="arrow-left"
                        onPress={() => this.props.navigation.goBack()}
                    />
                    <Appbar.Content title={this.state.title} />
                </Appbar.Header>
                <ListadoProductosVertical
                    title='Productos en oferta'
                    url={ApiService.instance.buildUrlById(ApiService.PRODUCTS_BY_CATEGORIES, this.state.id)}
                    productos={this.state.productos} />
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
            </Fragment>
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