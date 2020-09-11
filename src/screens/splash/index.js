import React, { Component } from 'react';
import { Text, Image, StyleSheet, View, StatusBar, ToolbarAndroid } from 'react-native';
import { StackActions } from '@react-navigation/native';


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
        setTimeout(() => {
            this.goToScreen('principal')
        }, 2000);
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

