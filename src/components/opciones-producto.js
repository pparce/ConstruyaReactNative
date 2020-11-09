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
        this.opcionesSeleccionadas = [];
        this.state = {
            opciones: this.props.producto ? this.props.producto.product_option_product : []
        };
    }

    _addView = () => {
        let views = [];
        let opciones = this.props.producto ? this.props.producto.product_option_product : []
        // console.log(opciones);
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
        let label = opcion.name + (opcion.required ? '*' : '');
        return (
            <View key={opcion.id + ''} style={{ height: 100 }}>
                <Dropdown
                    onChangeText={data => {
                        this._onOptionSelect(data, opcion);
                    }}
                    label={label}
                    data={this._buildDataDropdown(opcion.product_product_item_option)}
                />
            </View>
        );
    }

    _onOptionSelect = (optionSelected, option) => {
        let posicion = this.opcionesSeleccionadas.map(e => { return e.product_option_id }).indexOf(option.id);
        if (optionSelected != null) {
            if (posicion != -1) {
                this.opcionesSeleccionadas[posicion] = {
                    option: option,
                    product_option_id: option.id,
                    items_option: [
                        {
                            item: optionSelected,
                            product_item_option_id: optionSelected.id,
                            value: optionSelected.description
                        }
                    ]
                }
            } else {
                this.opcionesSeleccionadas.push({
                    option: option,
                    product_option_id: option.id,
                    items_option: [
                        {
                            item: optionSelected,
                            product_item_option_id: optionSelected.id,
                            value: optionSelected.description
                        }
                    ]
                });
            }
        } else {
            this.opcionesSeleccionadas.splice(posicion, 1);
        }
        this.props.onChangeOptions(this.opcionesSeleccionadas);
    }

    _buildDataDropdown = (opciones) => {
        let data = [];
        data.push({
            value: null,
            label: '---'
        });
        for (let i = 0; i < opciones.length; i++) {
            data.push({
                value: opciones[i],
                label: opciones[i].description
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