import React, { Fragment, useState } from 'react';
import { View, Image, Text } from "react-native";
import { Card, Divider, Button, TouchableRipple } from "react-native-paper";
import Shimmer from "./shimmer";
import { useNavigation } from '@react-navigation/native';
import ApiService from '../services/api.service';
import Theme from '../assets/styles/theme';


function ItemProductCart(props) {
    var item = props.item;
    var urlImagen = ApiService.IMAGE_BASE_URL + item.producto.product_image_main;
    var [showShimmer, setShowShimmer] = useState(false);
    var navigation = useNavigation();
    return (
        <View>
            <TouchableRipple
                style={{ width: '100%' }}
                rippleColor={Theme.colors.ripple}
                onPress={() => {
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
                                style={[Theme.style.title,]}
                                numberOfLines={2}>
                                {item.producto.name}
                            </Text>
                            <View style={[Theme.style.alingHorizontal]}>
                                <Text
                                    style={{ fontSize: 14, marginRight: 16, color: Theme.colors.primary }}
                                    >
                                    ${item.producto.product_pricing.real_price}
                                </Text>
                            </View>
                            <View style={[Theme.style.alingHorizontal, { justifyContent: 'space-between', marginTop: 8 }]}>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ color: Theme.colors.subtitle }}>cantidad</Text>
                            <Text style={{ color: Theme.colors.subtitle }}>{item.cantidad}</Text>
                                </View>
                                <View style={{alignItems: 'flex-end'}}>
                                    <Text style={{ color: Theme.colors.subtitle }}>Impuesto($)</Text>
                                    <Text style={{ color: Theme.colors.subtitle }}>00.00</Text>
                                </View>
                                <View style={{alignItems: 'flex-end'}}>
                                    <Text style={{ color: Theme.colors.subtitle }}>Total($)</Text>
                            <Text style={{ color: Theme.colors.subtitle }}>{item.total}</Text>
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

export default ItemProductCart;