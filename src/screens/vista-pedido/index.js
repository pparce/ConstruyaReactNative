
import React, { Component, Fragment } from 'react';
import { Appbar, Divider, TextInput } from 'react-native-paper';
import MyTheme from '../../assets/styles';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Theme from '../../assets/styles/theme';
import ApiService from '../../services/api.service';
import Utiles from '../../utiles/funciones_utiles';
import TablaResumenCarro from '../../components/tabla-resumen-carro';

class VistaPedido extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.route.params,
            pedido: {}
        }
    }

    componentDidMount() {
        this._getPedido();
    }

    _getPedido() {
        ApiService.instance.get(ApiService.instance.buildUrlById(ApiService.ORDER_BY_ID, this.state.id)).then(
            response => {
                console.log(response);
                this.setState({
                    pedido: response,
                })
            }, error => {
                console.log(error)
            }
        );
    }

    _addItems = () => {
        let items = [];
        let productos = this.state.pedido.items;
        for (let index = 0; index < productos.length; index++) {
            items.push(
                <Fragment key={index + ''}>
                    <View
                        style={[Theme.style.alingHorizontal,
                        {
                            justifyContent: 'space-between',
                            paddingHorizontal: 16,
                            paddingVertical: 16,
                        }]}>
                        <Text style={{ flex: 2, color: Theme.colors.gris, fontSize: 16 }}>{productos[index].product_name}</Text>
                        <Text style={{ flex: 1, color: Theme.colors.gris, fontSize: 16 }}>{productos[index].price}</Text>
                        <Text style={{ flex: 0.5, color: Theme.colors.gris, fontSize: 16 }}>{productos[index].qty}</Text>
                        <Text style={{ flex: 1, color: Theme.colors.gris, fontSize: 16, textAlign: 'right' }}>{productos[index].subtotal}</Text>
                    </View>
                    <Divider style={{ height: 1 }} />
                </Fragment>
            );
        }
        console.log(items);
        return items;
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Appbar.Header style={MyTheme.style.toolbar}>
                    <Appbar.Action
                        icon="arrow-left"
                        onPress={() => this.props.navigation.goBack()}
                    />
                    <Appbar.Content
                        title={'Pedido: ' + this.state.id} />
                </Appbar.Header>
                {
                    this.state.pedido.id &&
                    <ScrollView>
                        <View style={Theme.style.container}>
                            <View style={{ marginBottom: 16 }}>
                                <Text style={style.textoResaltado}>{'Orden: ' + this.state.id}</Text>
                                <Text style={style.texto}>{'Fecha: ' + Utiles._formatDate(this.state.pedido.update_at)}</Text>
                            </View>
                            <View style={{ marginBottom: 16 }}>
                                <Text style={style.textoResaltado}>Dirección de Envío</Text>
                                <Text style={style.texto}>{this.state.pedido.customer.customer_billing_information.address}</Text>
                            </View>
                            <View style={{ marginBottom: 16 }}>
                                <Text style={style.textoResaltado}>Dirección de Facturación</Text>
                                <Text style={style.texto}>{this.state.pedido.customer.customer_shipping_information.address}</Text>
                            </View>
                            <Divider style={{ height: 1 }} />
                            <View style={{ marginVertical: 16 }}>
                                <Text style={[style.textoResaltado, { marginBottom: 16 }]}>Detalle del Pedido</Text>
                                <View
                                    style={[Theme.style.alingHorizontal,
                                    {
                                        justifyContent: 'space-between',
                                        paddingHorizontal: 16,
                                        paddingVertical: 8,
                                        backgroundColor: Theme.colors.grisClaro
                                    }]}>
                                    <Text style={{ flex: 2, color: Theme.colors.black, fontSize: 16 }}>PRODUCTO</Text>
                                    <Text style={{ flex: 1, color: Theme.colors.black, fontSize: 16 }}>PRECIO</Text>
                                    <Text style={{ flex: 0.5, color: Theme.colors.black, fontSize: 16 }}>CANT.</Text>
                                    <Text style={{ flex: 1, color: Theme.colors.black, fontSize: 16, textAlign: 'right' }}>TOTAL</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    {
                                        this._addItems()
                                    }
                                </View>
                                <TablaResumenCarro
                                    cart={this.state.pedido}
                                    style={{ margin: 16 }} />
                            </View>
                            <Divider style={{ height: 1 }} />
                            <View style={{ marginVertical: 16 }}>
                                <Text style={Theme.style.title}>Enviar Mensaje</Text>
                                <Text style={Theme.style.subtitle}>Si desea hacer algún comentario respecto a su pedido, envíalo usando el siguiente formulario</Text>
                                <TextInput
                                    mode='outlined'
                                    label='Productos'
                                    dense
                                    onChangeText={() => {

                                    }}
                                />
                                <TextInput
                                    mode='outlined'
                                    dense
                                    multiline
                                    label='Comentario'
                                    onChangeText={() => {

                                    }}
                                />
                            </View>
                        </View>
                    </ScrollView>
                }
            </View>
        );
    }
}

const style = StyleSheet.create({
    textoResaltado: {
        color: Theme.colors.primary,
        fontSize: 20,
    },
    texto: {
        color: Theme.colors.gris,
        fontSize: 18,
    }
});

export default VistaPedido;