import React, { Component, Fragment } from 'react';
import { Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import Theme from '../assets/styles/theme';

class CustomInput extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isFormValid: this.props.isFormValid,
            style: this.props.style,
            label: this.props.label,
            secureTextEntry: this.props.secureTextEntry ? this.props.secureTextEntry : false,
            value: this.props.value ? this.props.value : '',
            onChangeText: this.props.onChangeText,
            error: this.props.error,
            reglas: this.props.reglas ? this.props.reglas : [],
        };
        this.mensajes = [];
    }
    render() {
        return (
            <View style={[Theme.style.alingVertical], { flex: 1, marginTop: 8 }}>
                <TextInput
                    {...this.props}
                    style={[this.state.style,]}
                    mode='outlined'
                    dense
                    label={this.state.label}
                    value={this.props.value}
                    onChangeText={this.state.onChangeText}
                    error={this.state.error}
                    onChangeText={(text) => {
                        this._setValue(text)
                    }}
                />
                {
                    this._getErrorMesagge()
                }
            </View >
        );
    }

    _setValue = (texto) => {
        this.setState({
            value: texto
        });
        this.state.onChangeText(texto);
    }

    _getErrorMesagge = () => {
        this.mensajes = [];
        this.state.reglas.some(element => {
            if (this._validarRegla(this.state.value, element.regex)) {
                this.mensajes.push(
                    <Text
                        key={this.state.label}
                        style={{
                            marginLeft: 8,
                            marginTop: 4,
                            display: this.props.error ? 'flex' : 'none',
                            color: Theme.colors.error
                        }}>{element.mensaje}</Text>

                );
                return true;
            }
        });
        this.state.isFormValid(this.state.label, this.mensajes.length != 0)
        return this.mensajes;
    }

    _validarRegla = (cadena, regla) => {
        if (typeof (regla) === 'object') {
            return (!cadena.trim().match(regla))
        } else {
            return cadena === regla
        }
    }
}

export default CustomInput;