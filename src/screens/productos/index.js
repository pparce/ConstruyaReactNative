
import React, { Component, Fragment } from 'react';
import { Appbar } from 'react-native-paper';
import ListadoProductosVertical from '../../components/listado-productos-vertical';
import connections from '../../connections';
import MyTheme from '../../assets/styles';
import { StatusBar } from 'react-native';

export default class Productos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.route.params.id,
            title: this.props.route.params.title,
            productos: []
        }
        this._getProductos(connections.buildUrlById(connections.PRODUCTS_BY_CATEGORIES, this.state.id));
    }

    _getProductos = (url) => {
        connections.get(url).then(
            (response) => {
                console.log(response.data.products[0]);
                this.setState({ productos: response.data.products });
            },
            (error) => {
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
                    url={connections.buildUrlById(connections.PRODUCTS_BY_CATEGORIES, this.state.id)}
                    productos={this.state.productos} />
            </Fragment>
        );
    }

}