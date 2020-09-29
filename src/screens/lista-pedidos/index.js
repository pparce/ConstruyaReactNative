
import React, { Component, Fragment } from 'react';
import { Appbar, Divider } from 'react-native-paper';
import MyTheme from '../../assets/styles';
import { Text, View } from 'react-native';
import EmptyScreen from '../../components/empty-screen';
import ApiService from '../../services/api.service';
import { FlatList } from 'react-native-gesture-handler';
import ItemPedido from '../../components/item-pedidos';
import Theme from '../../assets/styles/theme';

class ListaPedidos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pedidos: [],
            next: '',
            count: 0
        }
    }

    componentDidMount() {
        this._getPedidos();
    }

    _getPedidos = () => {
        ApiService.instance.get(ApiService.ORDER_LAST).then(
            response => {
                this.setState({
                    pedidos: response.results,
                    next: response.next,
                    count: response.count
                })
            }, error => {
                console.log(error)
            }
        );
    }

    _keyExtractor = (item, index) => item.id;

    _onPressItem = (item) => {
        this.props.navigation.navigate('vista-pedido', item.id);
    };

    _renderMyKeyExtractor = (item, index) => item.id.toString();

    _renderItem = ({ item }) => {
        return (
            <ItemPedido item={item} onPressItem={this._onPressItem} />
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Appbar.Header style={MyTheme.style.toolbar}>
                    <Appbar.Action
                        icon="arrow-left"
                        onPress={() => this.props.navigation.goBack()}
                    />
                    <Appbar.Content
                        title='Lista Pedidos' />
                </Appbar.Header>
                {
                    this.state.pedidos.length
                        ?
                        <Fragment>
                            <Fragment>
                                <Text style={{
                                    padding: 16,
                                    textAlign: 'center',
                                    color: Theme.colors.subtitle
                                }}>Mantén presionado para más opciones</Text>
                                <View
                                    style={[Theme.style.alingHorizontal,
                                    {
                                        justifyContent: 'space-between',
                                        paddingHorizontal: 16,
                                        paddingVertical: 16,
                                        backgroundColor: Theme.colors.grisClaro
                                    }]}>
                                    <Text style={{ flex: 1, color: Theme.colors.black, fontSize: 16 }}>Pedido</Text>
                                    <Text style={{ flex: 2, color: Theme.colors.black, fontSize: 16 }}>Actualización</Text>
                                    <Text style={{ flex: 2, color: Theme.colors.black, fontSize: 16 }}>Estado</Text>
                                    <Text style={{ flex: 1, color: Theme.colors.black, fontSize: 16, textAlign: 'right' }}>Monto</Text>
                                </View>
                                <Divider style={{ height: 1 }} />
                            </Fragment>
                            <FlatList
                                style={{}}
                                data={this.state.pedidos}
                                renderItem={this._renderItem}
                                keyExtractor={this._renderMyKeyExtractor}
                            />
                        </Fragment>

                        :
                        <EmptyScreen icon='cart' titulo='No hay pedidos que mostrar' />
                }
            </View>
        );
    }
}

export default ListaPedidos;