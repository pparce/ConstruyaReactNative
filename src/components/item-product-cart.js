import React, { Fragment, useState } from 'react';
import { View, Image, Text } from "react-native";
import { Card, Divider, Button, TouchableRipple } from "react-native-paper";
import Shimmer from "./shimmer";
import { useNavigation } from '@react-navigation/native';
import ApiService from '../services/api.service';
import Theme from '../assets/styles/theme';
import Utiles from '../utiles/funciones_utiles';


function ItemProductCart(props) {
    var item = props.item;
    console.log(item.options);
    var urlImagen = ApiService.IMAGE_BASE_URL + item.product.product_image_main;
    var [showShimmer, setShowShimmer] = useState(false);
    var navigation = useNavigation();

    return (
        <View>
            <TouchableRipple
                style={{ width: '100%' }}
                rippleColor={Theme.colors.ripple}
                onPress={() => {
                }}
                onLongPress={() => {
                    props.onLongPressItem(item)
                }}>
                <Fragment>
                    <View
                        style={[Theme.style.alingHorizontal,
                        {
                            paddingVertical: 8,
                            paddingHorizontal: 16,
                            alignItems: 'center'
                        }]}>
                        <Shimmer
                            style={{ width: 70, height: 70 }}
                            autoRun={!showShimmer}
                            visible={showShimmer}>
                            <Image
                                onLoad={() => {
                                    setShowShimmer(true);
                                }}
                                style={{
                                    width: 70,
                                    height: 70
                                }}
                                source={{ uri: urlImagen }} />
                        </Shimmer>
                        <View style={{ paddingLeft: 16, flex: 1 }}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: '#000000'
                                }}
                                numberOfLines={2}>
                                {item.product.name}
                            </Text>

                            {
                                item.options && item.options.length > 0 &&
                                <View style={{
                                    borderColor: Theme.colors.grisClaro,
                                    borderWidth: 1,
                                    padding: 4,
                                    borderRadius: 10
                                }}>
                                    {
                                        _buildOptions(item)
                                    }
                                </View>
                            }
                            <View style={[Theme.style.alingHorizontal]}>
                                <Text
                                    style={{ fontSize: 14, marginRight: 16, color: Theme.colors.primary }}
                                >
                                    ${item.product.product_pricing.real_price}
                                </Text>
                            </View>
                            <View style={[Theme.style.alingHorizontal, { justifyContent: 'space-between', marginTop: 8 }]}>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ color: Theme.colors.subtitle }}>cantidad</Text>
                                    <Text style={{ color: Theme.colors.subtitle }}>{item.qty}</Text>
                                </View>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text style={{ color: Theme.colors.subtitle }}>Impuesto($)</Text>
                                    <Text style={{ color: Theme.colors.subtitle }}>00.00</Text>
                                </View>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text style={{ color: Theme.colors.subtitle }}>Total($)</Text>
                                    <Text style={{ color: Theme.colors.subtitle }}>{Utiles._redondearValorDecimal(item.subtotal)}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <Divider style={{ height: 1 }} />
                </Fragment>
            </TouchableRipple>
        </View>
    );
}

const _buildOptions = (item) => {
    let opciones = [];
    item.options.forEach(element => {
        let nombre = element.option.name;
        let value = element.items_option[0].value;
        opciones.push(
            <View style={[Theme.style.alingHorizontal]} key={nombre}>
                <Text style={[Theme.style.titleBold, { fontSize: 14 }]}>{nombre}: </Text>
                <Text>{value}</Text>
            </View>
        );
    });
    return opciones;
}

export default ItemProductCart;