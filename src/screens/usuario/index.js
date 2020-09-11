import * as React from 'react';
import { Text, View } from "react-native";
import { Appbar } from 'react-native-paper';
import MyTheme from '../../assets/styles';

class Usuario {
    render() {
        return (
            <View>
                <Appbar style={MyTheme.style.toolbar}>
                    <Appbar.Action
                        icon="arrow-left"
                        onPress={() => props.navigation.goBack()}
                    />
                    <Appbar.Content title='Usuario' />
                </Appbar>
                <Text>pepe</Text>
            </View>
        );
    }
}
export default Usuario;