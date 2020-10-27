import CookieManager from '@react-native-community/cookies';
import React, { Component, Fragment } from 'react';
import { StatusBar, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Appbar, Avatar, Button, Card, Dialog, Paragraph, Portal, Title, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import Theme from '../../assets/styles/theme';
import ApiService from '../../services/api.service';
import ReduxService from '../../services/redux.service';
import Utiles from '../../utiles/funciones_utiles';

class Usuario extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.login.login.customer.user,
            customer: this.props.login.login.customer,
            logoutDialog: false
        }
    }

    _logout = () => {
        this.setState({
            logoutDialog: false
        })
        ReduxService.instance.getRedux().setLogin({});
        this.props.navigation.goBack();
    }

    render() {
        const { user, customer } = this.state;
        const billing_information = customer.customer_billing_information;
        const shipping_information = customer.customer_shipping_information;
        return (
            <View style={{ flex: 1 }}>
                <Appbar.Header style={[Theme.style.toolbar]}>
                    <Appbar.Action
                        icon="arrow-left"
                        onPress={() => this.props.navigation.goBack()}
                    />
                    <Appbar.Content title='Usuario' />
                    <Appbar.Action
                        icon="logout"
                        onPress={() => {
                            this.setState({
                                logoutDialog: true
                            })
                        }}
                    />

                </Appbar.Header>

                <ScrollView>
                    <View style={[Theme.style.alingHorizontal, { margin: 16 }]}>
                        <Avatar.Text size={72} label={Utiles._getFirstLetter(user.first_name) + ''} color='#ffffff' />
                        <View style={{ flexDirection: 'column', padding: 16, alignSelf: 'center' }}>
                            <Text style={{ fontSize: 18 }}>{user.first_name + ' ' + user.last_name}</Text>
                            <Text style={{ fontSize: 14, color: Theme.colors.subtitle }}>{user.email}</Text>
                        </View>
                    </View>
                    <View style={{ marginHorizontal: 16 }}>
                        <Card style={{ marginBottom: 16 }}>
                            <View style={[Theme.style.alingHorizontal, { margin: 16, justifyContent: 'space-between' }]}>
                                <Text style={Theme.style.titleBold}>Información de Pago</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.navigate('edit-information', {
                                            title: 'Información de Pago:',
                                            data: billing_information,
                                            url: ApiService.instance.buildUrlById(ApiService.EDIT_BILLING, customer.id)
                                        });
                                    }}>
                                    <Icon name='pencil' size={24} />
                                </TouchableOpacity>
                            </View>
                            <Card.Content>
                                <InformacionBillingAndShipping information={billing_information} />
                            </Card.Content>
                        </Card>
                        <Card style={{ marginBottom: 16 }}>
                            <View style={[Theme.style.alingHorizontal, { margin: 16, justifyContent: 'space-between' }]}>
                                <Text style={Theme.style.titleBold}>Información de Envio</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.navigate('edit-information', {
                                            title: 'Información de Envio:',
                                            data: shipping_information,
                                            url: ApiService.instance.buildUrlById(ApiService.EDIT_SHIPPING, customer.id)
                                        })
                                    }}>
                                    <Icon name='pencil' size={24} />
                                </TouchableOpacity>
                            </View>
                            <Card.Content>
                                <InformacionBillingAndShipping information={shipping_information} />
                            </Card.Content>
                        </Card>
                        <Card
                            style={{ marginBottom: 16, }}
                            onPress={() => {
                                this.props.navigation.navigate('edit-informacion-acceso',
                                    {
                                        email: user.email,
                                        id: customer.id
                                    });
                            }}
                        >
                            <View style={[Theme.style.alingHorizontal, { margin: 16, justifyContent: 'space-between' }]}>
                                <Text style={Theme.style.titleBold}>Información de Acceso</Text>
                                <Icon name='chevron-right' size={24} />
                            </View>
                        </Card>
                        <Card
                            style={{ marginBottom: 16 }}
                            onPress={() => {
                                this.props.navigation.navigate('lista-direcciones',
                                    {
                                        direcciones: customer.address,
                                        id: customer.id
                                    });
                            }}>
                            <View style={[Theme.style.alingHorizontal, { margin: 16, justifyContent: 'space-between' }]}>
                                <Text style={Theme.style.titleBold}>Mi Libreta de Direcciones</Text>
                                <Icon name='chevron-right' size={24} />
                            </View>
                        </Card>
                        <Card
                            style={{ marginBottom: 16 }}
                            onPress={() => {
                                this.props.navigation.navigate('lista-pedidos',
                                    {
                                        email: user.email,
                                        id: customer.id
                                    });
                            }}
                        >
                            <View style={[Theme.style.alingHorizontal, { margin: 16, justifyContent: 'space-between' }]}>
                                <Text style={Theme.style.titleBold}>Lista de Pedidos</Text>
                                <Icon name='chevron-right' size={24} />
                            </View>
                        </Card>

                    </View>
                </ScrollView>
                <Portal>
                    <Dialog
                        visible={this.state.logoutDialog}
                        dismissable={false}>
                        <Dialog.Title >Cerrar Sesión</Dialog.Title>
                        <Dialog.Content style={{ flexDirection: 'row' }}>
                            <Paragraph>¿Estás seguro que quiere cerrar sesión?</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button
                                onPress={() => {
                                    this.setState({
                                        logoutDialog: false
                                    })
                                }}
                                uppercase>
                                cancelar
                            </Button>
                            <Button
                                onPress={this._logout}
                                uppercase>
                                cerrar sesión
                            </Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        );
    }
}

function InformacionBillingAndShipping({ information }) {
    return (
        <Fragment>
            <LabelAndValue label='Nombre:' value={information.first_name} />
            <LabelAndValue label='Apellido:' value={information.last_name} />
            <LabelAndValue label='Teléfono:' value={information.phone} />
            <LabelAndValue label='País:' value={information.country.name} />
            <LabelAndValue label='Estado:' value={information.state.name} />
            <LabelAndValue label='Ciudad:' value={information.city.name} />
            <LabelAndValue label='Dirección:' value={information.address} />
        </Fragment>
    )
}

function LabelAndValue({ label, value }) {
    return (
        <View style={Theme.style.alingHorizontal}>
            <Text style={[Theme.style.subtitleBold, { marginRight: 8 }]}>{label}</Text>
            <Text style={Theme.style.subtitle}>{value}</Text>
        </View>
    )
}

const mapStateToProps = state => ({
    login: state.login
});

const mapDispatchToProps = {
    // setCart: setCart
};

export default connect(mapStateToProps, mapDispatchToProps)(Usuario);