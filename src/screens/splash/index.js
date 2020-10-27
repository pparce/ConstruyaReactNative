import React, { Component } from 'react';
import { Text, Image, StyleSheet, View, StatusBar, ToolbarAndroid, BackHandler } from 'react-native';
import { StackActions } from '@react-navigation/native';
import ApiService, { baseUrl } from '../../services/api.service';
import Axios from 'axios';
import CarroService from '../../services/carro.service';
import Theme from '../../assets/styles/theme';
import ReduxService from '../../services/redux.service';


export default class Splash extends Component {


    _goToScreen(screen) {
        // this.props.navigation.navigate(routeName)
        this.props.navigation.dispatch(
            StackActions.replace(screen)
        );

    }

    componentDidMount() {
        if (ReduxService.instance.getRedux().login.isLogin) {
            this._getLogin();
        } else {
            setTimeout(() => {
                this._goToScreen('principal');
            }, 1000);
        }
    }

    _getLogin = () => {
        let login = ReduxService.instance.getRedux().login.credentials;
        ApiService.instance.post(ApiService.LOGIN, login).then(
            (response) => {
                if (response.id) {
                    ReduxService.instance.getRedux().setLogin(response);
                    this._goToScreen('principal');
                } else {
                    this._goToScreen('login');
                }
            }).catch(error => {
                ReduxService.instance.getRedux().hideLoading();
                if (!ReduxService.instance.getRedux().app.showErrorConnectionDialog) {
                    ReduxService.instance.getRedux().showErrorConnectionDialog({
                        action: () => {
                            this._getLogin();
                        },
                        cancel: () => {
                            BackHandler.exitApp();
                        },
                        params: 'splash'
                    });
                }
            });
    }

    render() {
        return (
            <View
                backgroundColor='#ffffff'
                style={{
                    height: '100%',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                <StatusBar barStyle='dark-content' backgroundColor='#ffffff' />
                <Image resizeMode='contain' style={this.style.Image} source={require('./logo.png')}></Image>
                <Text style={{ marginTop: 8 }}>CONSTRUYA AL COSTO</Text>
            </View>
        )
    }

    style = StyleSheet.create({
        Image: {
            width: 100,
            height: 50
        }
    })
}

