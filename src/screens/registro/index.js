
import * as React from 'react';
import { Appbar, Title, TextInput, Button, Checkbox, Caption, Paragraph } from 'react-native-paper';
import { View } from 'react-native';
import MyTheme from '../../assets/styles'
import { ScrollView } from 'react-native-gesture-handler';
import { StatusBar } from 'react-native';

export default class Registro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <View>
                <Appbar.Header style={[MyTheme.style.toolbar, { marginTop: StatusBar.currentHeight }]}>
                    <Appbar.Action
                        icon="arrow-left"
                        onPress={() => this.props.navigation.goBack()}
                    />
                    <Appbar.Content title='Registrarse' />
                </Appbar.Header>
                <ScrollView
                    style={{ flexGrow: 1 }}>
                    <View style={MyTheme.style.container}>
                        <View>
                            <Title>Informacion de Acceso</Title>
                            <TextInput
                                style={{ marginBottom: 16, height: 40 }}
                                mode='outlined'
                                label='Correo'
                                value=''
                                onChangeText={text => ''}
                            />
                            <TextInput
                                style={{ marginBottom: 16, height: 40 }}
                                mode='outlined'
                                label='Contraseña'
                                value=''
                                onChangeText={text => ''}
                            />
                        </View>
                        <View>
                            <Title>Informacion Personal</Title>
                            <View style={MyTheme.style.alingHorizontal}>
                                <TextInput
                                    style={{
                                        marginBottom: 16,
                                        height: 40,
                                        marginRight: 8,
                                        flex: 1
                                    }}
                                    mode='outlined'
                                    label='Nombre'
                                    value=''
                                    onChangeText={text => ''}
                                />
                                <TextInput
                                    style={{ marginBottom: 16, height: 40, flex: 1 }}
                                    mode='outlined'
                                    label='Apellidos'
                                    value=''
                                    onChangeText={text => ''}
                                />
                            </View>
                            <View style={MyTheme.style.alingHorizontal}>
                                <TextInput
                                    style={{
                                        marginBottom: 16,
                                        height: 40,
                                        marginRight: 8,
                                        flex: 2
                                    }}
                                    mode='outlined'
                                    label='Dirección'
                                    value=''
                                    onChangeText={text => ''}
                                />
                                <TextInput
                                    style={{ marginBottom: 16, height: 40, flex: 1 }}
                                    mode='outlined'
                                    label='Código ZIP'
                                    value=''
                                    onChangeText={text => ''}
                                />
                            </View>
                            <View style={MyTheme.style.alingHorizontal}>
                                <TextInput
                                    style={{
                                        marginBottom: 16,
                                        height: 40,
                                        marginRight: 8,
                                        flex: 1
                                    }}
                                    mode='outlined'
                                    label='País'
                                    value=''
                                    onChangeText={text => ''}
                                />
                                <TextInput
                                    style={{
                                        marginBottom: 16,
                                        height: 40,
                                        marginRight: 8,
                                        flex: 1
                                    }}
                                    mode='outlined'
                                    label='Estado'
                                    value=''
                                    onChangeText={text => ''}
                                />
                                <TextInput
                                    style={{ marginBottom: 16, height: 40, flex: 1 }}
                                    mode='outlined'
                                    label='Ciudad'
                                    value=''
                                    onChangeText={text => ''}
                                />
                            </View>
                            <View style={MyTheme.style.alingVertical}>
                                <TextInput
                                    style={{ marginBottom: 16, height: 40 }}
                                    mode='outlined'
                                    label='Teléfono'
                                    value=''
                                    onChangeText={text => ''}
                                />
                                <TextInput
                                    style={{ marginBottom: 16, height: 40 }}
                                    mode='outlined'
                                    label='Impuesto'
                                    value=''
                                    onChangeText={text => ''}
                                />
                            </View>
                            <View>
                                <View style={MyTheme.style.alingHorizontal}>
                                    <Checkbox
                                        status='checked'
                                        onPress={() => {
                                            ''
                                        }}
                                    />
                                    <Caption style={{ alignSelf: 'center' }}>Deseo recibir actualizaciones y promociones por correo.</Caption>
                                </View>
                                <Button
                                    style={{
                                        width: '50%',
                                        alignSelf: 'flex-end',
                                        marginTop: 16
                                    }}

                                    mode='contained'>
                                    Registrarse
                            </Button>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

}