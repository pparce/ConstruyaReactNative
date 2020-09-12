import React, { Component } from 'react';
import { View } from "react-native";
import { Appbar, List } from 'react-native-paper';
import MyTheme from '../../../assets/styles';
import { StatusBar } from 'react-native';
import ApiService from '../../../services/api.service';

export default class Categorias extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categorias: []
        };
        this.passData = this.passData.bind(this);
    }

    componentDidMount() {
        this._getCategorias();
    }

    passData(index, listado) {
        this.props.navigation.navigate('productos', { id: listado[index].id, title: listado[index].name })
    }

    _getCategorias = () => {
        ApiService.instance.get(ApiService.CATEGORIES).then(
            (response) => {
                this.setState({ categorias: response.data });
            },
            (error) => {
                // alert('error en peticionn');
            }
        );
    }

    _createViews = () => {
        var vistaCategorias = [];
        var vistaItems = [];
        const categoriasAux = this.state.categorias;
        var subCategories = [];
        for (let index = 0; index < categoriasAux.length; index++) {
            if (!categoriasAux[index].category) {
                subCategories = this._getSubCategories(categoriasAux[index].id);
                vistaItems = this._createItems(subCategories);
                var id = categoriasAux[index].id + '';
                var title = categoriasAux[index].name + '';
                vistaCategorias.push(
                    subCategories.length > 0
                        ?
                        <List.Accordion
                            key={id}
                            titleStyle={{ fontSize: 18 }}
                            title={categoriasAux[index].name}
                            id={id}>
                            {vistaItems}
                        </List.Accordion>
                        :
                        <List.Item
                            title={categoriasAux[index].name}
                            titleStyle={{ fontSize: 18 }}
                            key={id}
                            id={index.toString}
                            onPress={(data) => {
                                this.passData(index, categoriasAux)
                            }} />
                );
            }
        }
        return vistaCategorias;
    }

    _createItems = (subCategories) => {
        var vistaItems = [];
        for (let index = 0; index < subCategories.length; index++) {
            vistaItems.push(
                <List.Item
                    left={props => <List.Icon {...props} icon="rhombus-medium" />}
                    titleStyle={{ fontSize: 18 }}
                    key={subCategories[index].id + ''}
                    style={{ marginLeft: 0 }}
                    title={subCategories[index].name}
                    id={index.toString}
                    onPress={() => {
                        this.passData(index, subCategories)
                    }} />
            );
        }
        return vistaItems;
    }

    _getSubCategories = (id) => {
        var subCategories = this.state.categorias.filter(item => item.category == id);
        return subCategories ? subCategories : [];
    }

    render() {
        var viewListado = this._createViews();
        return (
            <View style={{ flex: 1 }}>
                <Appbar.Header style={[MyTheme.style.toolbar, { marginTop: StatusBar.currentHeight }]}>
                    <Appbar.Action
                        icon="menu"
                        onPress={() => this.props.navigation.openDrawer()}
                    />
                    <Appbar.Content title='Categorias' />
                    <Appbar.Action
                        style={{ alignSelf: 'flex-end' }}
                        icon="magnify"
                        onPress={() => navigation.navigate('buscar')}
                    />
                </Appbar.Header>
                <List.AccordionGroup>
                    {viewListado}
                </List.AccordionGroup>
            </View>
        );
    }
}