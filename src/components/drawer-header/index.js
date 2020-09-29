import React, { Fragment } from 'react';
import { View, SafeAreaView, Text, ScrollView, StatusBar } from "react-native";
import { Avatar, Button, TouchableRipple } from 'react-native-paper';
import { DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import MyTheme from '../../assets/styles';
import Theme from '../../assets/styles/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ReduxService from '../../services/redux.service';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Utiles from '../../utiles/funciones_utiles';

function DrawerHeader(props) {
    let user;
    if (props.login.isLogin) {
        user = props.login.login.customer.user;
    }
    return (
        <View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
            <ScrollView style={{ flex: 1 }}>
                <SafeAreaView
                    forceInset={{ top: 'always', horizontal: 'never' }}>
                    <View>
                        {
                            props.login.isLogin
                                ?
                                <TouchableRipple
                                    onPress={() => {
                                        props.navigation.closeDrawer();
                                        props.navigation.navigate('usuario');
                                    }}
                                    style={{ flexDirection: 'row', alignContent: 'center', padding: 16 }}>
                                    <Fragment>
                                        <Avatar.Text size={48} label={Utiles._getFirstLetter(user.first_name) + ''} color='#ffffff' />
                                        <View style={{ flexDirection: 'column', padding: 8 }}>
                                            <Text>{user.first_name + ' ' + user.last_name}</Text>
                                            <Text>{user.email}</Text>
                                        </View>
                                    </Fragment>
                                </TouchableRipple>
                                :
                                <View style={MyTheme.style.drawerHeaderContainer}>
                                    <Button
                                        style={{ alignSelf: 'baseline' }}
                                        mode="text"
                                        uppercase
                                        onPress={() => {
                                            props.navigation.closeDrawer();
                                            props.navigation.navigate('login');
                                        }}>
                                        Iniciar Sesión
                                </Button>
                                </View>
                        }
                    </View>
                    <DrawerItemList {...props} />
                    <View
                        style={{
                            borderColor: Theme.colors.disabled,
                            borderTopWidth: 0.5,
                            paddingTop: 8,

                            height: '100%'
                        }}>
                        <Text style={{ marginLeft: 16, marginBottom: 8, fontSize: 14, color: Theme.colors.subtitle }}>Opciones</Text>
                        <DrawerItem
                            onPress={() => {
                                setTimeout(() => {
                                    props.navigation.navigate('favoritos');
                                }, 0);
                                props.navigation.closeDrawer();
                            }}
                            label={({ color, focused }) => (
                                <Text style={{ color: Theme.colors.black }}>Favoritos</Text>
                            )}
                            icon={({ focused, size }) => (
                                <Icon name='heart' size={24} color={focused ? Theme.colors.white : Theme.colors.black} />
                            )} />
                        <DrawerItem
                            onPress={() => {
                                // props.navigation.navigate('buscar')
                            }}
                            label={({ color, focused }) => (
                                <Text style={{ color: Theme.colors.black }}>Acerca de</Text>
                            )}
                            icon={({ focused, size }) => (
                                <Icon name='information' size={24} color={focused ? Theme.colors.white : Theme.colors.black} />
                            )} />

                    </View>
                </SafeAreaView>
            </ScrollView>
            <Text
                style={{
                    position: 'absolute',
                    bottom: 0,
                    margin: 16,
                    alignSelf: 'center',
                    fontSize: 12,
                    color: Theme.colors.disabled
                }}>
                CONSTRUYA AL COSTO ®</Text>
        </View>
    );
}

const mapStateToProps = state => ({
    login: state.login
});

const mapDispatchToProps = {
    // setCart: setCart
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerHeader);