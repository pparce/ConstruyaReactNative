
import React, { Component } from 'react';
import { ActivityIndicator, Appbar, Button, Dialog, Paragraph, Searchbar, Title, TouchableRipple } from 'react-native-paper';
import { Dimensions, Platform, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import Theme from '../../assets/styles/theme';
import ApiService from '../../services/api.service';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ListadoProductosVertical from '../../components/listado-productos-vertical';
import CustomBoottomSheetComponent from '../../components/custom-bottom-sheet';
import FiltroBusqueda from '../../components/filtro-busqueda';
import BoottomSheetComponent from '../../components/bottom-sheet';
import ReduxService from '../../services/redux.service';
import DetalleDialog from '../../components/detalle-dialog';

export default class Buscar extends Component {
    window = Dimensions.get('window');
    Screen = {
        width: Dimensions.get('window').width,
        height: Platform.OS !== 'ios' && Dimensions.get('screen').height !== Dimensions.get('window').height && StatusBar.currentHeight > 24
            ? Dimensions.get('screen').height
            : Dimensions.get('window').height
    };
    constructor(props) {
        super(props);
        this.timeout;
        this.filtro = ''
        this.listaFiltro = []
        this.busquedaAnterior = '';
        this.state = {
            cadena: '',
            loading: false,
            products: [],
            url: '',
            next: '',
            count: 0,
            filterDialog: false,
            listaFiltro: [],
            item: {},
            detalleDialog: false
        }
    }

    componentDidMount() {
        this._findProduct('')
    }

    _onTextChange = (cadena = '') => {
        this.setState({
            cadena: cadena
        });
        // console.log(ApiService.instance.cancelarBusqueda());
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            if (cadena.length) {
                this._findProduct(cadena);
            } else {
                this._clearCadenaBusqueda();
            }
        }, 500);
    }

    _clearCadenaBusqueda = () => {
        this.setState({
            loading: false,
            cadena: '',
            products: [],
            next: '',
            count: 0
        })
        this._findProduct('')
    }

    _findProduct = (cadena) => {
        let url = ApiService.BASE_URL + ApiService.PRODUCTS + '?' + (cadena.length ? ('_q=' + cadena + '&') : '') + '_o=PRECIO_ASC' + this.filtro;
        this.setState({
            loading: true,
            url: url
        });
        ApiService.instance.getWithPaginator(url).then(
            response => {
                this.setState({
                    loading: false,
                    next: response.next,
                    count: response.count,
                    products: response.results ? response.results : []
                });
            }
        ).catch((error) => {
            console.log(error);
            this.setState({
                loading: false
            });
        });
    }
    _findMoreProduct = (cadena) => {
        let url = this.state.next && this.state.next.length ? this.state.next : ApiService.PRODUCTS + '?' + (cadena.length ? ('_q=' + cadena + '&') : '') + '_o=PRECIO_ASC' + this.filtro;
        this.setState({
            loading: true,
            url: url
        });
        ApiService.instance.getWithPaginator(url).then(
            response => {
                this.setState({
                    loading: false,
                    next: response.next,
                    count: response.count,
                    products: [...this.state.products, ...response.results]
                })
            }
        ).catch((error) => {
            console.log(error);
            this.setState({
                loading: false
            });
        });
    }

    _getdMoreProducts = () => {
        if (this.state.products.length < this.state.count) {
            this._findMoreProduct()
        }
    }

    _onMenuPress = (item, position) => {
        switch (position) {
            case 0:
                this._addToFavorites(item)
                break;
            case 1:
                this.setState({
                    item: item,
                    detalleDialog: true
                })
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
                <Appbar.Header style={Theme.style.toolbar}>
                    <Appbar.Action
                        icon="arrow-left"
                        onPress={() => this.props.navigation.goBack()}
                    />
                    <View style={style.cajonBuscar}>
                        <TextInput
                            style={{ flex: 1 }}
                            value={this.state.cadena}
                            placeholder='Buscar...'
                            onChangeText={(text) => {
                                this._onTextChange(text);
                            }} />
                        {
                            (this.state.cadena.length > 0) &&
                            <TouchableOpacity
                                style={{
                                    marginHorizontal: 16
                                }}
                                onPress={() => {
                                    this._clearCadenaBusqueda();
                                }}>
                                <Icon name='close' color={Theme.colors.black} size={24} />
                            </TouchableOpacity>
                        }
                    </View>
                    {
                        this.state.loading
                            ?
                            <ActivityIndicator
                                size='small'
                                animating={true}
                                color={Theme.colors.primary}
                                style={{ marginHorizontal: 16 }} />
                            :
                            <Appbar.Action
                                icon="filter-variant"
                                onPress={() => this.setState({ filterDialog: true })}
                            />
                    }
                </Appbar.Header>
                <ListadoProductosVertical
                    title='Buscar'
                    productos={this.state.products}
                    onScrollEnd={this._getdMoreProducts}
                    onItemLongPress={(item) => {
                        this.bottomSheet._show(item);
                    }} />
                <Dialog
                    visible={this.state.filterDialog}
                    onDismiss={() => {
                        this.setState({ filterDialog: false })
                    }}>
                    <Dialog.Content>
                        <FiltroBusqueda filtro={this.listaFiltro} onChange={(listaFiltro, cadena) => {
                            this.filtro = cadena;
                            this.listaFiltro = listaFiltro;
                        }} />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button
                            onPress={() => {
                                this.setState({ filterDialog: false })
                            }}
                            uppercase>
                            cancelar
                </Button>
                        <Button
                            onPress={() => {
                                this._findProduct('')
                                this.setState({ filterDialog: false })
                            }}
                            uppercase>
                            Aceptar
                </Button>
                    </Dialog.Actions>
                </Dialog>
                <BoottomSheetComponent onRef={ref => (this.bottomSheet = ref)} onMenuPress={this._onMenuPress} />
                <DetalleDialog visible={this.state.detalleDialog} item={this.state.item} />
            </View>
        );
    }
}

const style = StyleSheet.create({
    cajonBuscar: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: Theme.colors.grisClaro,
        borderRadius: 50,
        marginVertical: 8,
        paddingLeft: 16,
        fontSize: 16
    }
});