import React, { useState } from 'react';
import { View, Image, Text } from "react-native";
import { Card, Divider, Button } from "react-native-paper";
import MyTheme from "../assets/styles";
import Shimmer from "./shimmer";
import { useNavigation } from '@react-navigation/native';
import connections from '../connections';


function ItemList(props) {
    var item = props.item;
    var urlImagen = connections.IMAGE_BASE_URL + item.product_image_main;
    var [showShimmer, setShowShimmer] = useState(false);
    var navigation = useNavigation();
    console.log();
    return (
        <View>
            <Card
                style={MyTheme.style.verticalCard}
                onPress={() => {
                    navigation.push('vista_producto', { item: item, urlImagen: urlImagen });
                }}>
                <Card.Content style={{ paddingHorizontal: 0, paddingTop: 0 }}>
                    <Shimmer style={{ width: '100%', height: 150 }} autoRun={!showShimmer} visible={showShimmer}>
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
                            props.onPressItem(props.item)
                        }}
                        icon="cart"
                        mode="contained"
                        uppercase>Agregar</Button>
                </Card.Actions>
            </Card>
        </View>
    );
}

export default ItemList;