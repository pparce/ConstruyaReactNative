
import * as React from 'react';
import { Appbar } from 'react-native-paper';
import MyTheme from '../../assets/styles';
import { StatusBar, Text, View } from 'react-native';

class Favoritos extends React.Component {

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Appbar.Header style={MyTheme.style.toolbar}>
                <Appbar.Action
                    icon="arrow-left"
                    onPress={() => this.props.navigation.goBack()}
                />
                <Appbar.Content
                    title='Favoritos' />

            </Appbar.Header>
            </View>
        );
    }
}

export default Favoritos;