import React, { Component, Fragment } from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Theme from '../assets/styles/theme';
import CarroService from '../services/carro.service';
import EmptyScreen from './empty-screen';
import ItemList from './itemList';

class ListadoProductosVertical extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            productos: this.props.productos
        };
    }

    _keyExtractor = (item, index) => item.id;

    _onPressItem = (item) => {
        CarroService.instance.addItemToCart(item, 1);
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
                {
                    this.props.productos.length == 0
                        ?
                        <EmptyScreen
                            icon='shopping'
                            titulo='No Hay productos que mostrar' />
                        :
                        <FlatList
                            style={{ marginHorizontal: 8 }}
                            numColumns={2}
                            data={this.props.productos}
                            renderItem={this._renderItem}
                            keyExtractor={this._renderMyKeyExtractor}
                        />}
            </Fragment>

        );
    }
}



export default ListadoProductosVertical;