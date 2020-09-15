import * as React from 'react';
import { Appbar, TextInput, Title, Button, Portal, Dialog, Paragraph, ActivityIndicator, Colors, Snackbar } from 'react-native-paper';
import { View, Text } from 'react-native';
import MyTheme from '../../assets/styles';
import { StatusBar } from 'react-native';
import ApiService from '../../services/api.service';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            usuario: '',
            contrasena: '',
            dialogVisibility: false,
            snackBarVisibility: false
        };
        this.login = this.login.bind(this);
        this.showDialog = this.showDialog.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.onDismmisSnackBar = this.onDismmisSnackBar.bind(this);
    }

    componentDidMount() {
    }

    login() {
        const { usuario } = this.state;
        const { contrasena } = this.state;
        this.setState({ dialogVisibility: true });
        ApiService.instance.get(connections.USER).then(
            (request) => {
                // this.setState({ dialogVisibility: false });
            },
            (error) => {
                // this.setState({
                //     dialogVisibility: false,
                //     snackBarVisibility: true
                // });
            });
    }

    showDialog() {
        this.setState({ dialogVisibility: true });
    }

    hideDialog() {
        this.setState({ dialogVisibility: false });
    }

    onDismmisSnackBar() {
        this.setState({ snackBarVisibility: false });
    }

    render() {
        return (
            <View>
                <Appbar.Header style={[MyTheme.style.toolbar, {marginTop: StatusBar.currentHeight} ]}>
                    <Appbar.Action
                        icon="arrow-left"
                        onPress={() => this.props.navigation.goBack()}
                    />
                    <Appbar.Content title='Iniciar Sesion' />

                </Appbar.Header>
                <View style={{ marginTop: 50, flexDirection: 'column', padding: 16 }}>
                    <Text style={{ fontSize: 36, marginBottom: 16 }}>Bienvenido</Text>
                    <TextInput
                        style={{ marginBottom: 16, height: 40 }}
                        mode='outlined'
                        label='Usuario'
                        value=''
                        onChangeText={text => ''}
                    />
                    <TextInput
                        style={{ marginBottom: 16, height: 40 }}
                        secureTextEntry
                        mode='outlined'
                        label='Contraseña'
                        value=''
                        onChangeText={text => ''}
                    />
                    <Button
                        style={{ width: '100%' }}
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
                    <Dialog
                        visible={this.state.dialogVisibility}
                        dismissable={false}
                        onDismiss={this.hideDialog}>
                        <Dialog.Content style={{ flexDirection: 'row' }}>
                            <ActivityIndicator size='small' animating={true} color={Colors.blue800} />
                            <Paragraph style={{ marginLeft: 16 }}>Cargando...</Paragraph>
                        </Dialog.Content>
                    </Dialog>
                    <Snackbar
                        onDismiss={this.onDismmisSnackBar}
                        duration={2000}
                        visible={this.state.snackBarVisibility}>
                        Ha ocurrido un error
                    </Snackbar>
                </Portal>

            </View>
        );
    }
}