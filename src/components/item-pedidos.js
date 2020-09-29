import React, { Fragment, useState } from 'react';
import { View, Image, Text } from "react-native";
import { Card, Divider, Button, TouchableRipple } from "react-native-paper";
import Shimmer from "./shimmer";
import { useNavigation } from '@react-navigation/native';
import ApiService from '../services/api.service';
import Theme from '../assets/styles/theme';
import Utiles from '../utiles/funciones_utiles';


function ItemPedido({ item, onPressItem }) {
    var navigation = useNavigation();
    let date = new Date();
    let fecha = date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();
    return (
        <View>
            <TouchableRipple
                style={{ width: '100%' }}
                rippleColor={Theme.colors.ripple}
                onPress={() => {
                    onPressItem(item);
                }}>
                <Fragment>
                    <View
                        style={[Theme.style.alingHorizontal,
                        {
                            justifyContent: 'space-between',
                            paddingHorizontal: 16,
                            paddingVertical: 16,
                        }]}>
                        <Text style={{ flex: 1, color: Theme.colors.gris, fontSize: 16 }}>{item.id}</Text>
                        <Text style={{ flex: 2, color: Theme.colors.gris, fontSize: 16 }}>{Utiles._formatDate(item.update_at)}</Text>
                        <Text style={{ flex: 2, color: Theme.colors.gris, fontSize: 16 }}>{item.status.status.name}</Text>
                        <Text style={{ flex: 1, color: Theme.colors.gris, fontSize: 16, textAlign: 'right' }}>{item.subtotal}</Text>
                    </View>
                    <Divider style={{ height: 1 }} />
                </Fragment>
            </TouchableRipple>
        </View>
    );
}

export default ItemPedido;