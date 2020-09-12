
import React, { Component, Fragment } from 'react';
import { Appbar, Divider, Title, Subheading, Button } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { Image, View, Text } from 'react-native';
import MyTheme from '../../assets/styles';
import Cantidad from '../../components/cantidad';
import ListadoProductosHorizontal from '../../components/listado-productos-horizontal';
import { StatusBar } from 'react-native';
import ShimmerPlaceHolder from '../../components/shimmer-placeholder';
import ApiService from '../../services/api.service';

export default class VistaProducto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.route.params.item.id,
            title: this.props.route.params.item.name,
            item: this.props.route.params.item,
            imagen: this.props.route.params.urlImagen,
            onLoadData: true,
            imageShimmer: false,
            productosRelacionados: []
        }
        this._getData(ApiService.instance.buildUrlById(ApiService.PRODUCTS_RELATED, this.state.id));
    }

    _onImageLoaded = () => {
        this.setState({ onLoadData: true })
    }

    _getData = (url) => {
        ApiService.instance.get(url).then(
            (response) => {
                this.setState({ productosRelacionados: response.data });
            },
            (error) => {
            });
    }

    render() {
        var item = this.state.item;
        var imageShimmer = this.state.imageShimmer;
        console.log(this.state.imagen);
        var onLoadData = this.state.onLoadData;
        return (
            <Fragment>
                <Appbar.Header style={[MyTheme.style.toolbar, { marginTop: StatusBar.currentHeight }]}>
                    <Appbar.Action
                        icon="arrow-left"
                        onPress={() => this.props.navigation.goBack()}
                    />
                    <Appbar.Content title={this.state.title} />
                </Appbar.Header>
                <ScrollView style={{ flexGrow: 1 }}>
                    <ShimmerPlaceHolder style={{ display: onLoadData ? 'flex' : 'none' }} autoRun={onLoadData} />

                    <View style={{ display: onLoadData ? 'none' : 'flex', flex: 1, paddingBottom: 16 }}>
                        <Image
                            onLoad={() => {
                                this.setState({ onLoadData: false });
                            }}
                            resizeMode='cover'
                            style={{
                                width: '100%',
                                height: 300,
                                borderTopLeftRadius: 5,
                                borderTopRightRadius: 5
                            }}
                            source={{ uri: this.state.imagen }} />
                        <Divider style={{ height: 1 }} />
                        <View style={MyTheme.style.container}>
                            <Title>{this.state.title}</Title>
                            <Subheading>{item.description}</Subheading>
                            <View style={[MyTheme.style.alingHorizontal, { alignItems: 'center', marginTop: 16 }]}>
                                <Text
                                    style={{ fontSize: 20, marginRight: 16, color: MyTheme.colors.primary, }}
                                    numberOfLines={2}>
                                    ${item.product_pricing.real_price}
                                </Text>
                                <Text
                                    style={{ fontSize: 20, color: '#616161', textDecorationLine: 'line-through', flex: 1 }}
                                    numberOfLines={2}>
                                    ${item.product_pricing.price}
                                </Text>
                                <Cantidad style={{ flex: 1, }} />
                            </View>
                            <Button
                                style={{ marginTop: 16 }}
                                labelStyle={{ fontSize: 16 }}
                                mode="contained"
                                uppercase='true'
                                icon="cart"
                                onPress={() => {
                                    this.props.navigation.navigate('registro');
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