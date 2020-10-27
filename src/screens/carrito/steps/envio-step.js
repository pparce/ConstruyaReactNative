import React, { Component } from 'react';
import { Keyboard, StyleSheet, Text, View } from 'react-native';
import { Button, Caption, Checkbox, Portal, TextInput, Title } from 'react-native-paper';
import Theme from '../../../assets/styles/theme';
import MapView, { PROVIDER_GOOGLE, AnimatedRegion, Marker } from 'react-native-maps';
import { ScrollView } from 'react-native-gesture-handler';
import CustomInput from '../../../components/custom-input';
import InputCountry from '../../../components/input-country';
import ApiService from '../../../services/api.service';
import ReduxService from '../../../services/redux.service';
import { reglas } from '../../../utiles/reglas-formulario';
import DialogCountry from '../../../components/dialog-country';
import Axios from 'axios';
import DialogAddress from '../../../components/dialog-address';
import EmptyScreen from '../../../components/empty-screen';
import { connect } from 'react-redux';

class EnvioStep extends Component {
    constructor(props) {
        super(props);
        this.paises = [];
        this.estados = [];
        this.ciudades = [];
        this.isFormValid = [];
        let data = this.props.login.isLogin ?
            this.props.login.login.customer.customer_billing_information : null;
        this.state = {
            scrollEnabled: true,
            mapa: this._getInitialStateCamera(),
            isMarked: false,
            markerCoordinates: {},
            reglas: reglas,
            nombre: data ? data.first_name : '',
            apellidos: data ? data.last_name : '',
            direccion: data ? data.address : '',
            codigoZip: data ? data.zip_code : '',
            pais: { id: data ? data.country.id : 0, name: data ? data.country.name : '', name2: data ? data.country.name2 : '', code: data ? data.country.code : '' },
            estado: { id: data ? data.state.id : 0, name: data ? data.state.name : '', name2: data ? data.state.name2 : '', code: data ? data.state.code : '' },
            ciudad: { id: data ? data.city.id : 0, name: data ? data.city.name : '', name2: data ? data.city.name2 : '', code: data ? data.city.code : '' },
            telefono: data ? data.phone : '',
            impuesto: data ? data.tax : '',
            id: data ? data.id : 0,
            error: false,
            addressDialog: {
                show: false,
                title: '',
                listado: []
            },
            dialog: {
                show: false,
                title: '',
                listado: []
            },
        }
    }

    componentDidMount() {
        // this.map.animateToRegion(this.state.mapa.region, 1000)
        this.props.onRef(this);
    }

    _getCountry = () => {
        ApiService.instance.get(ApiService.PAISES).then(
            response => {
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

    _getAddress = () => {
        ReduxService.instance.getRedux().showLoading();
        let url = ApiService.ADDRESS;
        ApiService.instance.get(url).then(
            response => {

                this._showAddressDialog({
                    show: true,
                    title: 'Listado de Direcciones',
                    listado: response,
                    onItemClick: (address) => {
                        this.setState({
                            addressDialog: {
                                listado: [],
                                show: false,
                                title: '',
                            },
                            nombre: address.first_name,
                            apellidos: address.last_name,
                            pais: address.country,
                            estado: address.state,
                            ciudad: address.city,
                            codigoZip: address.zip_code,
                            telefono: address.phone
                        });
                    }
                });
            }).catch((error) => {
                console.log(error);
            });
    }

    _onSubmit = () => {
        if (this.isFormValid.length) {
            this.setState({
                error: true
            })
            return {
                valid: false,
                data: {}
            };
        } else {
            return {
                valid: true,
                data: this._buildJSON()
            }
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

    _showDialog = (dialog) => {
        Keyboard.dismiss();
        this.setState({
            dialog: dialog
        });
    }

    _showAddressDialog = (dialog) => {
        Keyboard.dismiss();
        this.setState({
            addressDialog: dialog
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

    _getInitialState() {
        return {
            latitude: -38.4161,
            longitude: -63.6167,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,

        };
    }

    _getInitialStateCamera() {
        return {
            center:
            {
                latitude: -38.4161,
                longitude: -63.6167
            },
            pitch: 2,
            heading: 20,
            altitude: 500,
            zoom: 5
        };
    }

    onRegionChange = (region) => {
        this.setState({ region });
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

    _findAddress = () => {
        let address = this.state.address + ','
            + this.state.ciudad.name + ','
            + this.state.estado.name + ','
            + this.state.pais.name
        ApiService.instance._findAddress(address).then(
            (response) => {
                console.log(response);
                let latitud = response.data.items[0].position.lat;
                let longitud = response.data.items[0].position.lng;
                this._onPressMapView(latitud, longitud)
            })
            .catch((error) => {
                console.log('error' + error);
            })
    }

    _findAddressByCoordinates = (latitude, longitude) => {

    }

    _onPressMapView = (latitude, longitude) => {
        setTimeout(() => {

        }, 0);
        this.setState({
            isMarked: true,
            markerCoordinates: { latitude, longitude },

        });
        this.map.animateCamera({ center: { latitude, longitude }, pitch: 2, heading: 20, altitude: 100, zoom: 17 }, 200)

    }

    render() {
        const { data, nombre, apellidos, direccion, codigoZip, pais, estado, ciudad, telefono, impuesto } = this.state;
        return (
            <View style={{ flex: 1 }}>
                {
                    this.props.login.isLogin ?
                        <ScrollView
                            scrollEnabled={this.state.scrollEnabled}>
                            <View style={Theme.style.container}>
                                {this.props.login.isLogin && this.props.login.login.customer.address.length > 0 &&
                                    <Button mode='outlined'
                                        uppercase
                                        onPress={() => {
                                            this._getAddress();
                                        }}>escoger otra direccion</Button>}
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
                                </View>
                            </View>
                            {/* <MapView
                        zoomEnabled={true}
                        zoom={100000}
                        scrollEnabled={true}
                        onTouchStart={(event) => {
                            this.setState({
                                scrollEnabled: false
                            })
                        }}
                        onTouchEnd={(event) => {
                            this.setState({
                                scrollEnabled: true
                            })
                        }}
                        onPress={(event) => {
                            let latitude = event.nativeEvent.coordinate.latitude;
                            let longitude = event.nativeEvent.coordinate.longitude;
                            this._onPressMapView(latitude, longitude);
                        }}
                        ref={(map) => { this.map = map; }}
                        showsUserLocation={true}
                        camera={this.state.mapa}
                        provider={PROVIDER_GOOGLE}
                        style={{ height: 300, marginHorizontal: 16, marginBottom: 0 }}>
                        {
                            this.state.isMarked &&
                            <Marker
                                coordinate={this.state.markerCoordinates}
                            />
                        }
                    </MapView> */}
                        </ScrollView> :
                        <ScrollView>
                            <View style={[Theme.style.container, { backgroundColor: 'transparent', alignItems: 'center', alignContent: 'center' }]}>
                                <EmptyScreen
                                    key='2'
                                    icon='account-off'
                                    titulo='No esta registrado'
                                    subtitulo='Para poder completar la compra debe registrarse'
                                     />
                            </View>
                        </ScrollView>
                }
                <Portal>
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
                    <DialogAddress
                        onDismiss={() => {
                            this.setState({
                                addressDialog: {
                                    ...this.state.addressDialog,
                                    show: false,
                                }
                            })
                        }}
                        dialog={this.state.addressDialog} />
                </Portal>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    login: state.login,
    cart: state.cart
});

const mapDispatchToProps = {
    // setCart: setCart
};

export default connect(mapStateToProps, mapDispatchToProps)(EnvioStep);