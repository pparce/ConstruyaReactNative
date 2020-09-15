import React, { Component } from 'react';
import { View, BackHandler, StatusBar, Image, Text } from 'react-native';
import Inicio from './fragments/inicio';
import Categorias from './fragments/categorias';
import { Snackbar } from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerHeader from '../../components/drawer-header'
import MyTheme from '../../assets/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CarroService from '../../services/carro.service';

export default class Principal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            snackBarVisibility: false
        };
        this.backHandler = null;
        this.blurEvents = null;
        this.focusEvents = null;
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.onDismmisSnackBar = this.onDismmisSnackBar.bind(this);
    }

    componentDidMount() {
        this.blurEvents = this.props.navigation.addListener('blur', e => {
            // Prevent default action
            if (this.backHandler)
                this.backHandler.remove();
        });
        this.focusEvents = this.props.navigation.addListener('focus', e => {
            // Prevent default action
            this.backHandler = BackHandler.addEventListener('backPress', this.handleBackButtonClick.bind(this));
        });
    }

    componentWillUnmount() {
        this.focusEvents();
        this.blurEvents();
        if (this.backHandler)
            this.backHandler.remove();
    }

    handleBackButtonClick() {
        if (this.state.snackBarVisibility) {
            BackHandler.exitApp();
        } else {
            this.setState({ snackBarVisibility: true });
        }
        return true;
    }

    onDismmisSnackBar() {
        this.setState({ snackBarVisibility: false });
    }

    render() {
        const Drawer = createDrawerNavigator();
        return (
            <View style={{ flex: 1 }}>
                <StatusBar backgroundColor='rgba(0,0,0,0)' barStyle='dark-content' translucent />
                <Drawer.Navigator
                    drawerType='front'
                    drawerContent={(props) => <DrawerHeader {...props} />}
                    initialRouteName="inicio"
                    drawerContentOptions={{
                        activeBackgroundColor: MyTheme.colors.primary,
                        activeTintColor: '#ffffff',
                    }}>
                    <Drawer.Screen
                        name="inicio"
                        component={Inicio}
                        options={{
                            drawerIcon: ({ focused }) => (
                                <Icon name="home" size={24} color={focused ? MyTheme.colors.white : MyTheme.colors.black} />
                            ),
                            drawerLabel: ({ focused }) => (
                                <Text style={focused ? { color: MyTheme.colors.white } : { color: MyTheme.colors.black }}>Inicio</Text>
                            )
                        }} />
                    <Drawer.Screen
                        name="Categorias"
                        component={Categorias}
                        options={{
                            drawerIcon: ({ focused, size }) => (
                                <Icon name="shopping" size={24} color={focused ? MyTheme.colors.white : MyTheme.colors.black} />
                            ),
                            drawerLabel: ({ color, focused }) => (
                                <Text style={focused ? { color: MyTheme.colors.white } : { color: MyTheme.colors.black }}>Categorias</Text>
                            )
                        }} />
                </Drawer.Navigator>
                <Snackbar
                    onDismiss={this.onDismmisSnackBar}
                    duration={2000}
                    visible={this.state.snackBarVisibility}>
                    Presione una vez más para cerrar
                    </Snackbar>
            </View>
        );
    }

    Principal() {
        const ColorPrimary = style.ColorPrimary;
        return (
            <View style={{ flex: 1 }}>
                <Drawer.Navigator
                    drawerContent={(props) => <DrawerHeader {...props} />}
                    initialRouteName="inicio"
                    drawerContentOptions={{
                        activeBackgroundColor: MyTheme.colors.primary,
                        activeTintColor: '#ffffff',
                    }}>
                    <Drawer.Screen
                        name="Inicio"
                        component={Inicio} />
                    <Drawer.Screen
                        name="Productos"
                        component={Categorias} />
                </Drawer.Navigator>
            </View>
        );
    }
}