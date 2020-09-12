
import * as React from 'react';
import { Appbar } from 'react-native-paper';
import MyTheme from '../../assets/styles';
import { StatusBar } from 'react-native';

export default class Buscar extends React.Component {

    render() {
        return (
            <Appbar.Header style={MyTheme.style.toolbar}>
                <Appbar.Action
                    icon="arrow-left"
                    onPress={() => this.props.navigation.goBack()}
                />
                <Appbar.Content title='Buscar' />
            </Appbar.Header>
        );
    }
}