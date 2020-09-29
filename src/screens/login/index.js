import React, { Component } from 'react';
import { Appbar, Button, Portal, Dialog, Paragraph, ActivityIndicator, Colors, Snackbar, TextInput } from 'react-native-paper';
import { View, Text, ScrollView, Keyboard } from 'react-native';
import MyTheme from '../../assets/styles';
import { StatusBar } from 'react-native';
import ApiService from '../../services/api.service';
import { reglas } from '../../utiles/reglas-formulario';
import CustomInput from '../../components/custom-input'
import ReduxService from '../../services/redux.service';
import Theme from '../../assets/styles/theme';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.isFormValid = [];
        this.state = {
            username: '',
            password: '',
            dialogVisibility: false,
            snackBarVisibility: false,
            error: false,
        };
    }

    componentDidMount() {
    }

    login = () => {
        if (this.isFormValid.length) {
            this.setState({
                error: true
            })
        } else {
            const { username, password } = this.state;
            ApiService.instance.post(ApiService.LOGIN, {
                'username': username,
                'password': password
            }).then(
                (response) => {
                    if (response.id) {
                        ReduxService.instance.getRedux().setLogin(response);
                        this.props.navigation.goBack();
                    } else {
                        this.setState({
                            snackBarVisibility: true
                        })
                    }
                },
                (error) => {
                    this.setState({
                        snackBarVisibility: true
                    })
                });
        }

    }

    _addFormError = (clave, error) => {
        if (error) {
            if (this.isFormValid.indexOf(clave) == -1) {
                this.isFormValid.push(clave);
            }
        } else {
            this.isFormValid = this.isFormValid.filter(value => value != clave);
        }
    }

    render() {
        const { username, password } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <Appbar.Header style={[Theme.style.toolbar]}>
                    <Appbar.Action
                        icon="arrow-left"
                        onPress={() => this.props.navigation.goBack()}
                    />
                    <Appbar.Content title='Iniciar Sesion' />

                </Appbar.Header>
                <ScrollView keyboardShouldPersistTaps='handled'>
                    <View>
                        <View style={{ marginTop: 50, padding: 16, flex: 1 }}>
                            <Text style={{ fontSize: 36, marginBottom: 16 }}>Bienvenido</Text>
                            <CustomInput
                                keyboardType='email-address'
                                textContentType='emailAddress'
                                label='Correo'
                                value={username}
                                error={this.state.error}
                                onChangeText={(text) => {
                                    this.setState({ username: text })
                                }}
                                isFormValid={(clave, error) => {
                                    this._addFormError(clave, error);
                                }}
                                reglas={reglas.correo}
                            />
                            <CustomInput

                                label='Contraseña'
                                secureTextEntry
                                value={password}
                                error={this.state.error}
                                onChangeText={(text) => {
                                    this.setState({ password: text })
                                }}
                                isFormValid={(clave, error) => {
                                    this._addFormError(clave, error);
                                }}
                                reglas={reglas.contrasena}
                            />
                            <Button
                                style={{ width: '100%', marginTop: 16 }}
                                labelStyle={{ color: '#ffffff' }}
                                mode="contained"

                                uppercase='true'
                                onPress={() => {
                                    this.login()
                                }}>
                                Entrar
                        </Button>
                        </View>
                        <View style={{ flexDirection: 'column', paddingHorizontal: 16, alignItems: 'flex-end' }}>
                            <View>
                                <Button
                                    style={{ alignSelf: 'baseline' }}
                                    labelStyle={{ fontSize: 14 }}
                                    mode="text"

                                    uppercase='true'
                                    onPress={() => {
                                        ''
                                    }}>
                                    Olvide mi Contraseña
                        </Button>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text>¿Erees nuevo por aquí?</Text>
                                <Button
                                    style={{ alignSelf: 'baseline' }}
                                    labelStyle={{ fontSize: 14 }}
                                    mode="text"
                                    uppercase='true'
                                    onPress={() => {
                                        this.props.navigation.navigate('registro');
                                    }}>
                                    Registrarse
                        </Button>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text>¿No quieres registrarte ahora?</Text>
                                <Button
                                    style={{ alignSelf: 'baseline' }}
                                    labelStyle={{ fontSize: 14 }}
                                    mode="text"
                                    uppercase='true'
                                    onPress={() => {
                                        ''
                                    }}>
                                    más tarde
                        </Button>
                            </View>
                        </View>
                        <Portal>
                            <Snackbar
                                onDismiss={() => {
                                    this.setState({
                                        snackBarVisibility: false
                                    })
                                }}
                                duration={2000}
                                visible={this.state.snackBarVisibility}>
                                Revisa los datos ingresados
                    </Snackbar>
                        </Portal>
                    </View>
                </ScrollView>
            </View>
        );
    }
}