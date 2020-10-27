import React, { useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import MyTheme from '../assets/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableRipple } from 'react-native-paper';

function Cantidad({ onChange = () => { }, style, qty = 1 }) {
    const [cantidad, setCantidad] = useState(qty + '');
    onChange(cantidad);
    return (
        <View style={style}>
            {/* <Text style={{  marginBottom: 8 }}>Cantidad</Text> */}
            <View style={[{
                height: 40,
                flexDirection: 'row',
                borderWidth: 1,
                borderRadius: 5,
                borderColor: MyTheme.colors.primary,
                alignItems: 'center'
            }]}>
                <TouchableRipple
                    rippleColor={MyTheme.colors.primary}
                    style={{
                        height: '100%',
                        justifyContent: 'center',
                        borderColor: MyTheme.colors.primary,
                        borderRightWidth: 1,
                        flex: 1
                    }}
                    onPress={() => {
                        if (parseInt(cantidad) > 1) {
                            setCantidad((parseInt(cantidad) - 1) + '')
                        }
                    }}
                >
                    <Icon name='minus' size={24} style={{ alignSelf: 'center' }} />
                </TouchableRipple>
                <TextInput
                    selectTextOnFocus
                    keyboardType='numeric'
                    value={cantidad}
                    onChangeText={(value) => {
                        if (parseInt(value) >= 1) {
                            setCantidad(value)
                        } else {
                            setCantidad(1 + '')
                        }

                    }}
                    style={{
                        textAlign: 'center',
                        width: 60,
                        borderWidth: 0,
                        flex: 1
                    }}>
                </TextInput>
                <TouchableRipple
                    rippleColor={MyTheme.colors.primary}
                    style={{
                        height: '100%',
                        justifyContent: 'center',
                        borderColor: MyTheme.colors.primary,
                        borderLeftWidth: 1,
                        flex: 1
                    }}
                    onPress={() => {
                        setCantidad((parseInt(cantidad) + 1) + '')
                    }}
                >
                    <Icon name='plus' size={24} style={{ alignSelf: 'center' }} />
                </TouchableRipple>
            </View>
        </View>
    );
}

export default Cantidad;