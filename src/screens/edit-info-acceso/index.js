
import React, { Component } from 'react';
import { Appbar, Button } from 'react-native-paper';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Theme from '../../assets/styles/theme';
import CustomInput from '../../components/custom-input';
import ApiService from '../../services/api.service';
import ReduxService from '../../services/redux.service';
import { reglas } from '../../utiles/reglas-formulario';

export default class EditInformacionAcceso extends Component {

    constructor(props) {
        super(props);
        this.isFormValid = [];
        this.state = {
            reglas: reglas,
            correo: this.props.route.params.email,
            contrasena: '',
            repetirContrasena: '',
            nuevaContrasena: '',
            id: this.props.route.params.id,
            error: false,
        }
    }

    componentDidMount() {
        // this._getCountry();
    }

    _onSubmit = () => {
        if (this.isFormValid.length) {
            this.setState({
                error: true
            })
        } else {
            this._salvarInformacion();
        }
    }

    _salvarInformacion = () => {
        console.log(this._buildJSON());
        let url = ApiService.instance.buildUrlById(ApiService.EDIT_ACCES_INFORNATION, this.state.id)
        ApiService.instance.post(url, this._buildJSON()).then(
            response => {
                if (response.id) {
                    let login = ReduxService.instance.getRedux().login.login;
                    login.customer = response;
                    ReduxService.instance.getRedux().setLogin(login);
                    this.props.navigation.goBack();
                } else {
                    console.log(response.error);
                }
            },
            error => {
                console.log(error);
            }
        );
    }

    _buildJSON = () => {
        let informacion_acceso = {
            customer: this.state.id,
            email: this.state.correo,
            password: this.state.contrasena,
            password_new: this.state.nuevaContrasena,
            password_repeat: this.state.repetirContrasena
        }
        return informacion_acceso;
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
        const { correo, contrasena, repetirContrasena, nuevaContrasena } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <Appbar.Header style={[Theme.style.toolbar]}>
                    <Appbar.Action
                        icon="arrow-left"
                        onPress={() => this.props.navigation.goBack()}
                    />
                    <Appbar.Content title='Información de Acceso' />
                </Appbar.Header>
                <ScrollView
                    keyboardShouldPersistTaps='handled'
                    style={{ alignSelf: 'stretch' }}>
                    <View ref={(ref) => {
                        this.formContainer = ref;
                    }} style={[Theme.style.container]}>
                        <CustomInput
                            
                            label='Correo'
                            value={correo}
                            error={this.state.error}
                            onChangeText={(text) => {
                                this.setState({ correo: text })
                            }}
                            isFormValid={(clave, error) => {
                                this._addFormError(clave, error);
                            }}
                            reglas={reglas.correo}
                            required
                        />
                        <CustomInput
                            
                            label='Contraseña'
                            secureTextEntry
                            value={contrasena}
                            error={this.state.error}
                            onChangeText={(text) => {
                                this.setState({ contrasena: text })
                            }}
                            isFormValid={(clave, error) => {
                                this._addFormError(clave, error);
                            }}
                            reglas={reglas.contrasena}
                        />
                        <CustomInput
                            
                            label='Nueva Contraseña'
                            secureTextEntry
                            value={nuevaContrasena}
                            error={this.state.error}
                            onChangeText={(text) => {
                                this.setState({ nuevaContrasena: text })
                            }}
                            isFormValid={(clave, error) => {
                                this._addFormError(clave, error);
                            }}
                            reglas={reglas.contrasena}
                        />
                        <CustomInput
                            
                            label='Repetir Contraseña'
                            secureTextEntry
                            value={repetirContrasena}
                            error={this.state.error}
                            onChangeText={(text) => {
                                this.setState({ repetirContrasena: text })
                            }}
                            isFormValid={(clave, error) => {
                                this._addFormError(clave, error);
                            }}
                            reglas={reglas.contrasena}
                        />
                        <Button
                            style={{
                                width: '50%',
                                alignSelf: 'flex-end',
                                marginTop: 16
                            }}
                            onPress={() => {
                                this._onSubmit();
                            }}
                            mode='contained'>
                            Guardar
                            </Button>
                    </View>
                </ScrollView>
            </View>
        );
    }

}