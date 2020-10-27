import React, { Component, Fragment } from 'react';
import { View, BackHandler, StatusBar, Image, Text, Dimensions, Platform } from 'react-native';
import Inicio from './fragments/inicio';
import Categorias from './fragments/categorias';
import { Snackbar } from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerHeader from '../../components/drawer-header'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Theme from '../../assets/styles/theme';
import CookieManager from '@react-native-community/cookies';

export default class Principal extends Component {
    window = Dimensions.get('window');
    Screen = {
        width: Dimensions.get('window').width,
        height: Platform.OS !== 'ios' && Dimensions.get('screen').height !== Dimensions.get('window').height && StatusBar.currentHeight > 24
            ? Dimensions.get('screen').height
            : Dimensions.get('window').height
    };
    constructor(props) {
        super(props);
        this.state = {
            snackBarVisibility: false,
            opacityDrawer: 0,
            showViews: true
        };
        this.backHandler = null;
        this.blurEvents = null;
        this.focusEvents = null;
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.onDismmisSnackBar = this.onDismmisSnackBar.bind(this);
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                opacityDrawer: 1,
            })
        }, 1000);
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
            <Fragment>
                <StatusBar backgroundColor='rgba(0,0,0,0)' barStyle='dark-content' translucent />
                <View style={{ opacity: this.state.opacityDrawer, flex: 1 }}>
                    <Drawer.Navigator
                        drawerType='front'
                        drawerContent={(props) => <DrawerHeader {...props} />}
                        initialRouteName='inicio'
                        drawerStyle={{
                            opacity: this.state.opacityDrawer
                        }}
                        drawerContentOptions={{
                            activeBackgroundColor: Theme.colors.primary,
                            activeTintColor: '#ffffff',
                        }}>
                        <Drawer.Screen
                            name='inicio'
                            component={Inicio}
                            options={{
                                drawerIcon: ({ focused }) => (
                                    <Icon name='home' size={24} color={focused ? Theme.colors.white : Theme.colors.black} />
                                ),
                                drawerLabel: ({ focused }) => (
                                    <Text style={focused ? { color: Theme.colors.white } : { color: Theme.colors.black }}>Inicio</Text>
                                ),
                            }} />
                        <Drawer.Screen
                            name='Categorias'
                            component={Categorias}
                            options={{
                                drawerIcon: ({ focused, size }) => (
                                    <Icon name='shopping' size={24} color={focused ? Theme.colors.white : Theme.colors.black} />
                                ),
                                drawerLabel: ({ color, focused }) => (
                                    <Text style={focused ? { color: Theme.colors.white } : { color: Theme.colors.black }}>Categorias</Text>
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
            </Fragment>
        );
    }
}