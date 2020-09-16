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
        super(props);
        this.state = {
            title: this.props.title,
            productos: this.props.productos ? this.props.productos : [],
            showLoading: this.props.loginOn,
            hideLoading: this.props.loginOff,

        };
    }

    _keyExtractor = (item, index) => item.id;

    _onPressItem = (item) => {
        ReduxService.instance.getRedux().showLoading();
        const url = ApiService.instance.buildUrlById(
            ApiService.PRODUCTS_BY_ID,
            item.id)
        ApiService.instance.get(url).then(
            response => {
                CarroService.instance.addItemToCart(response, 1);
                ReduxService.instance.getRedux().hideLoading();
            }, error => {
                console.log('error');
                ReduxService.instance.getRedux().hideLoading();
                ReduxService.instance.getRedux().showErrorConnectionDialog({
                    action: this._onPressItem,
                    params: item
                });
            }
        );
    };

    _renderMyKeyExtractor = (item, index) => item.id.toString();

    _renderItem = ({ item }) => {
        return (
            <ItemList item={item} onPressItem={this._onPressItem} />
        );
    }

    render() {
        return (
            <Fragment>
                <Title
                    style={{
                        marginHorizontal: 16,
                        marginTop: 16,
                        alignSelf: 'center'
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
