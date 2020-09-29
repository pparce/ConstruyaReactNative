import React, { Component, Fragment, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import ItemList from './itemList';
import { Dialog, Portal, Title } from 'react-native-paper';
import { showLoading, hideLoading } from '../redux/app/actions';
import { connect } from 'react-redux';
import CarroService from '../services/carro.service';
import ApiService from '../services/api.service';
import RNBottomActionSheet from 'react-native-bottom-action-sheet';
import Icon from 'react-native-vector-icons';
import BottomSheetProducto from './bottom-sheet-producto';

class ListadoProductosHorizontal extends Component {
    bottomSheet = React.createRef(null);
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
        );
    };

    _onLongPress = (item) => {
        this.setState({
            sheetView: true
        })
    }

    _renderMyKeyExtractor = (item, index) => item.id.toString();

    _renderItem = ({ item }) => {
        return (
            <ItemList item={item} onPressItem={this._onPressItem} onLongPress={this._onLongPress} />
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
                <BottomSheetProducto
                    visible={this.state.sheetView}
                    onSelection={(index, value) => {
                        alert(index)
                    }} />
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
