import React, { Component, Fragment } from 'react';
import { Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ItemProductCart from './item-product-cart';
import ItemList from './itemList';

class ListadoProductosCarrito extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            items: this.props.productos
        };
    }

    _keyExtractor = (item, index) => item.id;

    _onPressItem = (item) => {
        alert(item.name);
    };

    _renderMyKeyExtractor = (item, index) => index + '';

    _renderItem = ({ item }) => {
        return (
            <ItemProductCart item={item} onPressItem={this._onPressItem} onLongPressItem={this.props.onLongPressItem} />
        );
    }

    render() {
        return (
            <Fragment>
                <FlatList
                    style={{}}
                    data={this.props.productos}
                    renderItem={this._renderItem}
                    keyExtractor={this._renderMyKeyExtractor}
                    ListFooterComponentStyle={{}}
                    ListFooterComponent={this.props.footer}
                    ListHeaderComponent={this.props.header}
                />
            </Fragment>

        );
    }
}



export default ListadoProductosCarrito;