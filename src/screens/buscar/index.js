
import * as React from 'react';
import { Appbar, Paragraph, Searchbar } from 'react-native-paper';
import { StatusBar, StyleSheet, Text, TextInput } from 'react-native';
import Theme from '../../assets/styles/theme';

export default class Buscar extends React.Component {

    render() {
        return (
            <Appbar.Header style={Theme.style.toolbar}>
                <Appbar.Action
                    icon="arrow-left"
                    onPress={() => this.props.navigation.goBack()}
                />
                <TextInput
                    style={style.cajonBuscar}
                    placeholder='Buscar...' />
                <Appbar.Action
                    icon="filter-variant"
                    onPress={() => this.props.navigation.goBack()}
                />
            </Appbar.Header>
        );
    }
}

const style = StyleSheet.create({
    cajonBuscar: {
        flex: 1,
        backgroundColor: Theme.colors.grisClaro,
        borderRadius: 50,
        marginVertical: 8,
        paddingLeft: 16,
        fontSize: 16
    }
});

/* <Appbar.Header style={MyTheme.style.toolbar}>
                <Appbar.Action
                    icon="arrow-left"
                    onPress={() => this.props.navigation.goBack()}
                />
                <Appbar.Content
                    children={
                        <Text>fsgdfgs</Text>
                    } />

            </Appbar.Header> */