import React, { Fragment, useState } from 'react';
import { View, Image, Text } from "react-native";
import { Card, Divider, Button, TouchableRipple } from "react-native-paper";
import Shimmer from "./shimmer";
import { useNavigation } from '@react-navigation/native';
import ApiService from '../services/api.service';
import Theme from '../assets/styles/theme';
import Utiles from '../utiles/funciones_utiles';


function ItemDireccion({ item, onPressItem, onLongPressItem }) {
    var navigation = useNavigation();
    let date = new Date();
    let fecha = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    return (
        <View>
            <TouchableRipple
                style={{ width: '100%' }}
                rippleColor={Theme.colors.ripple}
                onPress={() => {
                    onPressItem(item);
                }}
                onLongPress={()=>{
                    onLongPressItem(item)
                }}>
                <Fragment>
                    <View
                        style={[Theme.style.alingHorizontal,
                        {
                            justifyContent: 'space-between',
                            paddingHorizontal: 16,
                            paddingVertical: 16,
                        }]}>
                        <Text numberOfLines={1} style={{ flex: 1, color: Theme.colors.gris, fontSize: 14, paddingRight: 8 }}>{item.alias}</Text>
                        <Text numberOfLines={1} style={{ flex: 1, color: Theme.colors.gris, fontSize: 14, paddingRight: 8 }}>{item.address}</Text>
                        <Text numberOfLines={1} style={{ flex: 1, color: Theme.colors.gris, fontSize: 14, paddingRight: 8 }}>{item.country.name}</Text>
                        <Text numberOfLines={1} style={{ flex: 1, color: Theme.colors.gris, fontSize: 14, paddingRight: 8 }}>{item.state.name}</Text>
                        <Text numberOfLines={1} style={{ flex: 1, color: Theme.colors.gris, fontSize: 14, paddingRight: 8 }}>{item.city.name}</Text>
                    </View>
                    <Divider style={{ height: 1 }} />
                </Fragment>
            </TouchableRipple>
        </View>
    );
}

export default ItemDireccion;