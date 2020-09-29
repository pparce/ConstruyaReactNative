
import React, { Component } from 'react';
import { Appbar, Title, Button, Checkbox, Caption, Paragraph, Portal, Dialog } from 'react-native-paper';
import { Keyboard, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import Theme from './../../assets/styles/theme';
import CustomInput from '../../components/custom-input';
import { reglas } from '../../utiles/reglas-formulario';
import InputCountry from '../../components/input-country';
import ApiService from '../../services/api.service';
import DialogCountry from '../../components/dialog-country';
import ReduxService from '../../services/redux.service';

export default class EditInfo extends Component {

    constructor(props) {
        super(props);
        this.paises = [];
        this.estados = [];
        this.ciudades = [];
        this.isFormValid = [];
        let data = this.props.route.params.data;
        this.state = {
            data: this.props.route.params,
            reglas: reglas,
            nombre: data.first_name,
            apellidos: data.last_name,
            direccion: data.address,
            codigoZip: data.zip_code,
            pais: { id: data.country.id, name: data.country.name, name2: data.country.name2, code: data.country.code },
            estado: { id: data.state.id, name: data.state.name, name2: data.state.name2, code: data.state.code },
            ciudad: { id: data.city.id, name: data.city.name, name2: data.city.name2, code: data.city.code },
            telefono: data.phone,
            impuesto: data.tax,
            id: data.id,
            error: false,
            dialog: {
                show: false,
                title: '',
                listado: []
            },
        }
    }

    componentDidMount() {
        // this._getCountry();
    }

    _getCountry = () => {
        ApiService.instance.get(ApiService.PAISES).then(
            response => {
                console.log(response);
                this._showDialog({
                    show: true,
                    title: 'Seleccione un País:',
                    listado: response,
                    onItemClick: (country) => {
                        this.setState({
                            pais: {
                                id: country.id,
                                name: country.name,
                                name2: country.name2
                            },
                            estado: { id: 0, name: '', name2: '', code: '' },
                            ciudad: { id: 0, name: '', name2: '', code: '' },
                        });
                        this._hideDialog();
                    }
                });
            },
            error => {
                console.log(error);
            }
        );
    }

    _getState = (id) => {
        ApiService.instance.get(ApiService.instance.buildUrlById(ApiService.PROVINCIAS, id)).then(
            response => {
                console.log('pepe: ' + response);
                if (response.length) {
                    this._showDialog({
                        show: true,
                        title: 'Seleccione un Estado:',
                        listado: response,
                        onItemClick: (estado) => {
                            this.setState({
                                estado: {
                                    id: estado.id,
                                    name: estado.name,
                                    name2: estado.name2
                                },
                                ciudad: { id: 0, name: '', name2: '', code: '' }
                            });
                            this._hideDialog();

                        }
                    });
                }
            },
            error => {
                console.log(error);
            }
        );
    }

    _getCity = (id) => {
        ApiService.instance.get(ApiService.instance.buildUrlById(ApiService.CIUDADES, id)).then(
            response => {
                if (response.length) {
                    this._showDialog({
                        show: true,
                        title: 'Seleccione una Ciudad:',
                        listado: response,
                        onItemClick: (ciudad) => {
                            this.setState({
                                ciudad: {
                                    id: ciudad.id,
                                    name: ciudad.name,
                                    name2: ciudad.name2
                                }
                            });
                            this._hideDialog();

                        }
                    });
                }
            },
            error => {
                console.log(error);
            }
        );
    }

    _onSubmit = () => {
        if (this.isFormValid.length) {
            this.setState({
                error: true
            })
        } else {
            this._saveInformation();
        }
    }

    _saveInformation = () => {
        ApiService.instance.post(this.state.data.url, this._buildJSON()).then(
            response => {
                console.log(response);
                if (response.id) {
                    console.log(response);
                    let login = ReduxService.instance.getRedux().login.login;
                    if (login.customer.customer_billing_information.id == this.state.id) {
                        login.customer.customer_billing_information = response;
                    } else {
                        login.customer.customer_shipping_information = response;
                    }
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
        let customer_billing_information = {
            address: this.state.direccion,
            city: this.state.ciudad.id,
            country: this.state.pais.id,
            first_name: this.state.nombre,
            last_name: this.state.apellidos,
            phone: this.state.telefono,
            state: this.state.estado.id,
            tax: this.state.impuesto,
            zip_code: this.state.codigoZip,
            id: this.state.id
        }
        return customer_billing_information;
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

    _showDialog = (dialog) => {
        Keyboard.dismiss();
        this.setState({
            dialog: dialog
        });
    }

    _hideDialog = () => {
        this.setState({
            dialog: {
                listado: [],
                show: false,
                title: '',
            }
        });
    }

    render() {
        const { data, nombre, apellidos, direccion, codigoZip, pais, estado, ciudad, telefono, impuesto } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <Appbar.Header style={[Theme.style.toolbar]}>
                    <Appbar.Action
                        icon="arrow-left"
                        onPress={() => this.props.navigation.goBack()}
                    />
                    <Appbar.Content title={data.title} />
                </Appbar.Header>
                <ScrollView
                    keyboardShouldPersistTaps='handled'
                    style={{ alignSelf: 'stretch' }}>
                    <View style={Theme.style.container}>
                        <View>
                            <View style={Theme.style.alingHorizontal}>
                                <CustomInput
                                    style={{ marginRight: 8, height: 40, flex: 1 }}
                                    label='Nombre'
                                    value={nombre}
                                    error={this.state.error}
                                    onChangeText={(text) => {
                                        this.setState({ nombre: text })
                                    }}
                                    isFormValid={(clave, error) => {
                                        this._addFormError(clave, error);
                                    }}
                                    reglas={reglas.nombre}
                                />
                                <CustomInput
                                    style={{ height: 40, flex: 1 }}
                                    label='Apellidos'
                                    value={apellidos}
                                    error={this.state.error}
                                    onChangeText={(text) => {
                                        this.setState({ apellidos: text })
                                    }}
                                    isFormValid={(clave, error) => {
                                        this._addFormError(clave, error);
                                    }}
                                    reglas={reglas.apellidos}
                                />
                            </View>
                            <View style={Theme.style.alingHorizontal}>
                                <CustomInput
                                    style={{

                                        height: 40,
                                        marginRight: 8,
                                        flex: 2
                                    }}
                                    mode='outlined'
                                    label='Dirección'
                                    value={direccion}
                                    error={this.state.error}
                                    onChangeText={(text) => {
                                        this.setState({ direccion: text })
                                    }}
                                    isFormValid={(clave, error) => {
                                        this._addFormError(clave, error);
                                    }}
                                    reglas={reglas.direccion}
                                />
                                <CustomInput
                                    style={{ height: 40, flex: 1 }}
                                    mode='outlined'
                                    label='Código ZIP'
                                    value={codigoZip}
                                    error={this.state.error}
                                    onChangeText={(text) => {
                                        this.setState({ codigoZip: text })
                                    }}
                                    isFormValid={(clave, error) => {
                                        this._addFormError(clave, error);
                                    }}
                                    reglas={reglas.codigoZip}
                                />
                            </View>
                            <View style={Theme.style.alingHorizontal}>
                                <InputCountry
                                    onPress={() => {
                                        this._getCountry();
                                    }}
                                    style={{
                                        height: 40,
                                        marginRight: 8,
                                        flex: 1
                                    }}
                                    mode='outlined'
                                    label='País'
                                    value={pais.name}
                                    editable={true}
                                    error={this.state.error}
                                    onChangeText={(text) => {
                                        this.setState()
                                    }}
                                    isFormValid={(clave, error) => {
                                        this._addFormError(clave, error);
                                    }}
                                    reglas={reglas.pais}
                                />
                                <InputCountry
                                    onPress={() => {
                                        this._getState(this.state.pais.id);
                                    }}
                                    style={{

                                        height: 40,
                                        marginRight: 8,
                                        flex: 1
                                    }}
                                    mode='outlined'
                                    label='Estado'
                                    value={estado.name}
                                    editable={false}
                                    error={this.state.error}
                                    disabled={!this.state.pais.id}
                                    onChangeText={(text) => {
                                        this.setState({ apellidos: text })
                                    }}
                                    isFormValid={(clave, error) => {
                                        this._addFormError(clave, error);
                                    }}
                                    reglas={reglas.estado}
                                />
                                <InputCountry
                                    onPress={() => {
                                        this._getCity(this.state.estado.id);
                                    }}
                                    style={{ height: 40, flex: 1 }}
                                    mode='outlined'
                                    label='Ciudad'
                                    value={ciudad.name}
                                    editable={false}
                                    error={this.state.error}
                                    disabled={!this.state.estado.id}
                                    onChangeText={(text) => {
                                        this.setState({ ciudad: text })
                                    }}
                                    isFormValid={(clave, error) => {
                                        this._addFormError(clave, error);
                                    }}
                                    reglas={reglas.ciudad}
                                />
                            </View>
                            <CustomInput
                                
                                mode='outlined'
                                label='Teléfono'
                                value={telefono}
                                error={this.state.error}
                                onChangeText={(text) => {
                                    this.setState({ telefono: text })
                                }}
                                isFormValid={(clave, error) => {
                                    this._addFormError(clave, error);
                                }}
                                reglas={reglas.telefono}
                            />
                            <CustomInput
                                
                                mode='outlined'
                                label='Impuesto'
                                value={impuesto}
                                error={this.state.error}
                                onChangeText={(text) => {
                                    this.setState({ impuesto: text })
                                }}
                                isFormValid={(clave, error) => {
                                    this._addFormError(clave, error);
                                }}
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
                    </View>
                </ScrollView>
                <DialogCountry
                    onDismiss={() => {
                        this.setState({
                            dialog: {
                                ...this.state.dialog,
                                show: false,
                            }
                        })
                    }}
                    dialog={this.state.dialog} />
            </View>
        );
    }

}