
import React, { Component, Fragment } from 'react';
import { Appbar, Divider, Title, Subheading, Button } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { Image, View, Text, BackHandler } from 'react-native';
import MyTheme from '../../assets/styles';
import Cantidad from '../../components/cantidad';
import { StatusBar } from 'react-native';
import ShimmerPlaceHolder from '../../components/shimmer-placeholder';
import ApiService from '../../services/api.service';
import ListadoProductosHorizontal from '../../components/listado-productos-horizontal';
import ReduxService from '../../services/redux.service';
import Theme from '../../assets/styles/theme';
import CarroService from '../../services/carro.service';
import { Slider } from '../../components/slider';

export default class VistaProducto extends Component {

    constructor(props) {
        super(props);
        var cantidad = 1;
        this.state = {
            id: this.props.route.params.item.id,
            title: this.props.route.params.item.name,
            item: this.props.route.params.item,
            imagen: this.props.route.params.urlImagen,
            onLoadData: true,
            imageShimmer: false,
            productosRelacionados: [],
            isFavorite: this._isFavorite()
        }
        console.log(this._isFavorite());
        this._getData();
    }

    _onImageLoaded = () => {
        this.setState({ onLoadData: true })
    }

    _getData = () => {
        let urlProducto = ApiService.instance.buildUrlById(ApiService.PRODUCTS_BY_ID, this.state.id);
        let url = ApiService.instance.buildUrlById(ApiService.PRODUCTS_RELATED, this.state.id);
        Promise.all(
            [
                ApiService.instance.get(urlProducto),
                ApiService.instance.get(url)
            ]
        ).then((response) => {
            this.setState({
                item: response[0],
                productosRelacionados: response[1]
            });
        }).catch(error => {
            ReduxService.instance.getRedux().hideLoading();
            if (!ReduxService.instance.getRedux().app.showErrorConnectionDialog) {
                ReduxService.instance.getRedux().showErrorConnectionDialog({
                    action: () => {
                        this._getData();
                    },
                    cancel: () => {
                        this.props.navigation.goBack();
                    },
                    params: 'vista producto'
                });
            }
        });
    }

    _addToFavorites = () => {
        if (this._isFavorite()) {
            ReduxService.instance.getRedux().removeFavorites(this.state.id);
            this.setState({
                isFavorite: false
            });
        } else {
            ReduxService.instance.getRedux().addFavorites(this.state.item);
            ReduxService.instance.getRedux().showSnackBarFavorite();
            this.setState({
                isFavorite: true
            });
        }
    }

    _isFavorite = () => {
        if (ReduxService.instance.getRedux().getFavorites.map(
            (item) => { return item.id }).indexOf(this.props.route.params.item.id) != -1) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        var item = this.state.item;
        var imageShimmer = this.state.imageShimmer;
        var onLoadData = this.state.onLoadData;
        console.log(item);
        return (
            <Fragment>
                <Appbar.Header style={[Theme.style.toolbar, { marginTop: StatusBar.currentHeight }]}>
                    <Appbar.Action
                        icon="arrow-left"
                        onPress={() => this.props.navigation.goBack()}
                    />
                    <Appbar.Content title={this.state.title} />
                    <Appbar.Action
                        icon={this.state.isFavorite ? 'heart' : 'heart-outline'}
                        onPress={this._addToFavorites}
                    />
                </Appbar.Header>
                <ScrollView style={{}}>
                    <View style={{ flex: 1, paddingBottom: 16 }}>
                        <Slider
                            images={item.product_image_gallery}
                            onLoad={() => {
                                this.setState({ onLoadData: false });
                            }} />

                        <View style={Theme.style.container}>
                            <Title>{item.name}</Title>
                            <Subheading>{item.description}</Subheading>
                            <View style={[Theme.style.alingHorizontal, { alignItems: 'center', marginTop: 16 }]}>
                                <Text
                                    style={{ fontSize: 20, marginRight: 16, color: Theme.colors.primary, }}
                                    numberOfLines={2}>
                                    ${item.product_pricing.real_price}
                                </Text>
                                <Text
                                    style={{ fontSize: 20, color: '#616161', textDecorationLine: 'line-through', flex: 1 }}
                                    numberOfLines={2}>
                                    ${item.product_pricing.price}
                                </Text>
                                <Cantidad
                                    onChange={(value) => {
                                        this.cantidad = value;
                                    }} style={{ flex: 1, }} />
                            </View>
                            <Button
                                style={{ marginTop: 16 }}
                                labelStyle={{ fontSize: 16 }}
                                mode="contained"
                                uppercase='true'
                                icon="cart"
                                onPress={() => {
                                    CarroService.instance.addItemToCart(this.props.route.params.item, parseInt(this.cantidad));
                                }}>
                                Agregar al Carrito
                                </Button>
                        </View>
                        <ListadoProductosHorizontal
                            title='Productos Relacionados'
                            productos={this.state.productosRelacionados} />

                    </View>
                </ScrollView>
            </Fragment>
        );
    }

}