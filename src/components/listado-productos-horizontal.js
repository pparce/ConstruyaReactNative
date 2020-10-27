import React, { Component, Fragment, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import ItemList from './itemList';
import { Title } from 'react-native-paper';
import { showLoading, hideLoading } from '../redux/app/actions';
import { connect } from 'react-redux';
import CarroService from '../services/carro.service';
import ApiService from '../services/api.service';
import ReduxService from '../services/redux.service';

class ListadoProductosHorizontal extends Component {
    constructor(props) {
        var ls = [];
        ls.length
        super(props);
        this.state = {
            title: this.props.title,
            productos: this.props.productos ? this.props.productos : [],
            showLoading: this.props.loginOn,
            hideLoading: this.props.loginOff,
            sheetView: false
        };
    }

    _keyExtractor = (item, index) => item.id;

    _onPressItem = (item) => {
        const url = ApiService.instance.buildUrlById(
            ApiService.PRODUCTS_BY_ID,
            item.id)
        ApiService.instance.get(url).then(
            response => {
                CarroService.instance.addItemToCart(response, 1);
            }, error => {

            }
        ).catch(error => {
            ReduxService.instance.getRedux().hideLoading();
            if (!ReduxService.instance.getRedux().app.showErrorConnectionDialog) {
                ReduxService.instance.getRedux().showErrorConnectionDialog({
                    action: () => {
                        this._onPressItem();
                    },
                    cancel: () => {
                    },
                    params: item
                });
            }
        });
    };

    _renderMyKeyExtractor = (item, index) => item.id.toString();

    _renderItem = ({ item }) => {
        return (
            <ItemList item={item} onPressItem={this.props.onItemPress} onLongPress={this.props.onItemLongPress} />
        );
    }


    render() {
        return (
            <Fragment>
                <Title
                    style={{
                        marginHorizontal: 16,
                        marginTop: 16,
                        alignSelf: 'center',
                        display: this.props.productos.length ? 'flex' : 'none'
                    }}>
                    {this.state.title}
                </Title>
                <FlatList
                    style={{ marginHorizontal: 8 }}
                    horizontal
                    data={this.props.productos}
                    renderItem={this._renderItem}
                    keyExtractor={this._renderMyKeyExtractor}
                />
            </Fragment>

        );
    }
}

const mapStateToProps = null;
const mapDispatchToProps = {
    loginOn: showLoading,
    loginOff: hideLoading,
};


export default connect(mapStateToProps, mapDispatchToProps)(ListadoProductosHorizontal);
