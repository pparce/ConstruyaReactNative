import React, { useState } from 'react';
import { View, Image, Text } from "react-native";
import { Card, Divider, Button, Portal, Dialog, Paragraph, TouchableRipple } from "react-native-paper";
import MyTheme from "../assets/styles";
import Shimmer from "./shimmer";
import { useNavigation } from '@react-navigation/native';
import ApiService from '../services/api.service';
import CarroService from '../services/carro.service';
import Cantidad from './cantidad';
import Theme from '../assets/styles/theme';
import ItemMenuDialog from './item-menu-dialog';
import RBSheet from 'react-native-raw-bottom-sheet';
import RNBottomActionSheet from 'react-native-bottom-action-sheet';
import ReduxService from '../services/redux.service';
import OpcionesProducto from './opciones-producto';


function ItemList(props) {
    const [item, setItem] = useState(props.item);
    const [dialog, setDialog] = useState(false);
    const [opciones, setOpciones] = useState(false);
    const [response, setResponse] = useState();
    var cantidad = 1;
    var urlImagen = ApiService.IMAGE_BASE_URL + item.product_image_main;
    var [showShimmer, setShowShimmer] = useState(false);
    var navigation = useNavigation();
    let [sheetView, setsheetView] = useState(false);

    const _onAdd = () => {
        const url = ApiService.instance.buildUrlById(
            ApiService.PRODUCTS_BY_ID,
            item.id)
        ApiService.instance.get(url).then(
            response => {
                if (response.id) {
                    console.log(item);
                    setDialog(true);
                    setResponse(response);
                }
                // CarroService.instance.addItemToCart(response, 1);
            }).catch(error => {
                ReduxService.instance.getRedux().hideLoading();
                if (!ReduxService.instance.getRedux().app.showErrorConnectionDialog) {
                    ReduxService.instance.getRedux().showErrorConnectionDialog({
                        action: () => {
                            this._onAdd();
                        },
                        cancel: () => {
                            // this.props.navigation.goBack();
                        },
                        params: 'vista producto'
                    });
                }
            });
    };
    return (
        <View>
            <Card
                style={Theme.style.verticalCard}
                onPress={() => {
                    navigation.push('vista_producto', { item: item, urlImagen: urlImagen });
                }}
                onLongPress={() => {
                    props.onLongPress(item)
                }}>
                <Card.Content style={{ paddingHorizontal: 0, paddingTop: 0 }}>
                    <Shimmer
                        style={{ width: '100%', height: 150 }}
                        autoRun={!showShimmer}
                        visible={showShimmer}>
                        <Image
                            onLoad={() => {
                                setShowShimmer(true);
                            }}
                            style={{
                                width: '100%',
                                height: 150,
                                borderTopLeftRadius: 5,
                                borderTopRightRadius: 5
                            }}
                            source={{ uri: urlImagen }} />
                    </Shimmer>
                    <Divider />
                    <View style={{ paddingHorizontal: 8 }}>
                        <Text
                            style={[MyTheme.style.title, { minHeight: 40, marginTop: 8 }]}
                            numberOfLines={2}>
                            {item.name}
                        </Text>
                        <Text
                            style={[MyTheme.style.subtitle, { minHeight: 35 }]}
                            numberOfLines={2}>
                            {item.description}
                        </Text>
                        <View style={[{ marginTop: 8 }, MyTheme.style.alingHorizontal]}>
                            <Text
                                style={{ fontSize: 14, marginRight: 16, color: MyTheme.colors.primary }}
                                numberOfLines={2}>
                                ${item.product_pricing.real_price}
                            </Text>
                            <Text
                                style={{ fontSize: 14, color: '#616161', textDecorationLine: 'line-through' }}
                                numberOfLines={2}>
                                ${item.product_pricing.price}
                            </Text>
                        </View>

                    </View>
                </Card.Content>
                <Card.Actions>
                    <Button
                        style={{
                            flex: 1
                        }}
                        labelStyle={{
                            fontSize: 12
                        }}
                        onPress={() => {
                            _onAdd()
                        }}
                        icon='cart'
                        mode='outlined'
                        uppercase>Agregar</Button>
                </Card.Actions>
            </Card>
            <Portal>
                <Dialog
                    visible={dialog}
                    dismissable={true}
                    onDismiss={() => {
                        setDialog(false);
                    }}>
                    <Dialog.Title>{item.name}</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph >{item.description}</Paragraph>
                        <OpcionesProducto
                            producto={response}
                            onChangeOptions={(opciones) => {
                                setOpciones(opciones)
                            }} />
                        <View style={[Theme.style.alingHorizontal, { alignItems: 'center', marginTop: 16 }]}>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text
                                    style={{ fontSize: 20, color: MyTheme.colors.primary, flex: 1 }}
                                    numberOfLines={2}>
                                    ${item.product_pricing.real_price}
                                </Text>
                                <Text
                                    style={{ fontSize: 18, color: Theme.colors.disabled, textDecorationLine: 'line-through', flex: 1 }}
                                    numberOfLines={2}>
                                    ${item.product_pricing.price}
                                </Text>
                            </View>
                            <Cantidad
                                onChange={(value) => {
                                    cantidad = value;
                                }}
                                style={{ flex: 1, alignSelf: 'flex-end' }} />
                        </View>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button
                            onPress={() => {
                                setDialog(false);
                            }}
                            uppercase>
                            cancelar
                        </Button>
                        <Button
                            onPress={() => {
                                setDialog(false);
                                CarroService.instance.addItemToCart(response, parseInt(cantidad), opciones);
                                setOpciones(false);
                            }}
                            uppercase>
                            Agregar
                        </Button>
                    </Dialog.Actions>
                </Dialog>

            </Portal>
        </View>
    );
}



export default ItemList;