import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Dropdown } from 'react-native-material-dropdown';
// import { Dropdown } from 'react-native-material-dropdown';
import { Card } from 'react-native-paper';
import Theme from '../assets/styles/theme';

export default class OpcionesProducto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opciones: this.props.producto ? this.props.producto.product_option_product : []
        };
    }

    _addView = () => {
        let views = [];
        let opciones = this.props.producto ? this.props.producto.product_option_product : []
        for (let i = 0; i < opciones.length; i++) {
            views.push(this._buildView(opciones[i]));
        }
        return views;
    }

    _buildView = (opcion) => {
        let code = opcion.type.code;
        if (code == 'DROPDOWN') {
            return this._getDropDown(opcion);
        }
    }

    _getDropDown = (opcion) => {
        return (
            <View key={opcion.id + ''} style={{ height: 100 }}>
                <Text>{opcion.name} {opcion.required ? '*' : ''}</Text>
                <Dropdown
                    label='color'
                    data={this._buildDataDropdown(opcion.product_product_item_option)}
                />
            </View>
        );
    }

    _buildDataDropdown = (opciones) => {
        let data = [];
        for (let i = 0; i < opciones.length; i++) {
            data.push({
                value: i,
                label: opcions[i].description
            });
        }
        return data;
    }

    render() {
        return (
            <Card style={{
            }}>
                <Card.Content>
                    <ScrollView>
                        {
                            this._addView()
                        }
                    </ScrollView>
                </Card.Content>

            </Card>
        );
    }
}