import Axios from 'axios';
import React from 'react';
import { Component } from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import { Chip, Title } from 'react-native-paper';
import Theme from '../assets/styles/theme';
import ApiService from '../services/api.service';

export default class FiltroBusqueda extends Component {
    constructor(props) {
        super(props);
        this._getFilters();
        this.state = {
            categories: [],
            manufacturer: [],
            price: [],
            filtro: this.props.filtro ? this.props.filtro : []
        }
    }

    _getFilters = () => {
        let categories = ApiService.instance.getWwithoutLoading(ApiService.CATEGORIES_FILTER);
        let manufacturer = ApiService.instance.getWwithoutLoading(ApiService.MANUFACTURER_FILTER);
        let price = ApiService.instance.getWwithoutLoading(ApiService.PRECIO_FILTER);

        Axios.all([categories, manufacturer, price]).then(Axios.spread((...response) => {
            this.setState({
                categories: response[0],
                manufacturer: response[1],
                price: response[2],
            });
        }))
            .catch(error => {
                console.log(error);
            });
    }

    _onFilterPress = (item) => {
        let auxFiltro = this.state.filtro;
        if (auxFiltro.map((element) => { return element.cadena }).indexOf(item.cadena) === -1) {
            auxFiltro.push(item);
        }
        this.setState({
            filtro: auxFiltro
        })
    }

    _buildCadena = () => {
        let cadena = '';
        this.state.filtro.forEach(element => {
            cadena += element.cadena;
        });
        return cadena;
    }

    _renderCategoriesItem = ({ item }) => {
        let selected = this.state.filtro.map((element) => { return element.item.id }).indexOf(item.id) != -1;
        return (
            <Chip
                selected={selected}
                style={{ marginRight: 8, marginVertical: 8 }}
                onPress={() =>
                    // this._onFilterPress(item)
                    this._onFilterPress({
                        item: item,
                        cadena: '&_c=' + item.id
                    })
                }>
                {item.name}</Chip>
        );
    }
    _renderManufactureItem = ({ item }) => {
        let selected = this.state.filtro.map((element) => { return element.item.id }).indexOf(item.id) != -1;
        return (
            <Chip
                selected={selected}
                style={{ marginRight: 8, marginVertical: 8 }}
                onPress={() =>
                    // this._onFilterPress(item)
                    this._onFilterPress({
                        item: item,
                        cadena: '&_m=' + item.id
                    })
                }>{item.name}</Chip>
        );
    }
    _renderFiltroItem = ({ item }) => {
        return (
            <Chip
                selected
                style={{ marginRight: 8, marginVertical: 8 }}
                onClose={() => {
                    this.setState({
                        filtro: this.state.filtro.filter(element => element.item.id != item.item.id)
                    })
                }}
            >{item.item.name}</Chip>
        );
    }

    _keyExtractor = (item, index) => item.id;

    _onPressItem = (item) => {

    };

    _renderMyKeyExtractor = (item, index) => item.id.toString();
    _renderMyKeyExtractorFiltro = (item, index) => item.item.id.toString();

    render() {
        this.props.onChange(this.state.filtro, this._buildCadena())
        return (
            <View>
                <Title style={{ fontSize: 16 }}>Filtro de Busqueda:</Title>
                {
                    this.state.filtro.length > 0 &&
                    <FlatList
                        style={{ marginVertical: 8 }}
                        horizontal
                        data={this.state.filtro}
                        renderItem={this._renderFiltroItem}
                        keyExtractor={this._renderMyKeyExtractorFiltro}
                    />
                }
                <Text style={[Theme.style.subtitle, { marginTop: 16 }]}>Categorias:</Text>
                <FlatList
                    style={{ marginVertical: 8 }}
                    horizontal
                    data={this.state.categories}
                    renderItem={this._renderCategoriesItem}
                    keyExtractor={this._renderMyKeyExtractor}
                />
                <Text style={[Theme.style.subtitle, { marginTop: 16 }]}>Fabricantes:</Text>
                <FlatList
                    style={{ marginVertical: 8 }}
                    horizontal
                    data={this.state.manufacturer}
                    renderItem={this._renderManufactureItem}
                    keyExtractor={this._renderMyKeyExtractor}
                />
                {/* <Text style={[Theme.style.subtitle, {marginTop: 16}]}>Precios:</Text>
                <FlatList
                    style={{ marginVertical: 8 }}
                    horizontal
                    data={this.state.price}
                    renderItem={this._renderItem}
                    keyExtractor={this._renderMyKeyExtractor}
                /> */}
            </View>
        );
    }
} 