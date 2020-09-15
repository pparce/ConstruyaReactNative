import React, { Component } from 'react';
import { Text, Image, StyleSheet, View, StatusBar, ToolbarAndroid } from 'react-native';
import { StackActions } from '@react-navigation/native';
import ApiService, { baseUrl } from '../../services/api.service';
import Axios from 'axios';
import CarroService from '../../services/carro.service';


export default class Splash extends Component {


    goToScreen(routeName) {
        // this.props.navigation.navigate(routeName)
        this.props.navigation.dispatch(
            StackActions.replace('principal', {
                user: 'jane',
            })
        );
    }

    componentDidMount() {
        //Esta configuracion es solo para la version de desarrollo
        ApiService.instance.get(ApiService.PRODUCTS_MOST_SALED).then(response => {
            setTimeout(() => {
                this.goToScreen('principal')
            }, 1000);

        }, error => {
            ApiService.instance.changeBaseUrl();
            this.goToScreen('principal')
        })
        /* setTimeout(() => {
            this.goToScreen('principal')
        }, 1000); */
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
                <Text>Construya Al Costo</Text>
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

