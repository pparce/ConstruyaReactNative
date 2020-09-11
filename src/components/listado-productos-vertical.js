import React, { Component, Fragment } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import ItemList from './itemList';

class ListadoProductosHorizontal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            productos: this.props.productos
        };
    }

    _keyExtractor = (item, index) => item.id;

    _onPressItem = (item) => {
        alert(item.name);
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
                <FlatList
                    style={{ marginHorizontal: 8 }}
                    numColumns={2}
                    data={this.props.productos}
                    renderItem={this._renderItem}
                    keyExtractor={this._renderMyKeyExtractor}
                />
            </Fragment>

        );
    }
}



export default ListadoProductosHorizontal;