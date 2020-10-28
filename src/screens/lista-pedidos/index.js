
import React, { Component, Fragment } from 'react';
import { ActivityIndicator, Appbar, Divider } from 'react-native-paper';
import MyTheme from '../../assets/styles';
import { Dimensions, Platform, StatusBar, Text, View } from 'react-native';
import EmptyScreen from '../../components/empty-screen';
import ApiService from '../../services/api.service';
import { FlatList } from 'react-native-gesture-handler';
import ItemPedido from '../../components/item-pedidos';
import Theme from '../../assets/styles/theme';
import CustomBoottomSheetComponent from '../../components/custom-bottom-sheet';
import ItemMenuDialog from '../../components/item-menu-dialog';

class ListaPedidos extends Component {
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
            loading: false,
            pedidos: [],
            url: '',
            next: '',
            count: 0,
            item: {}
        }
    }

    componentDidMount() {
        this._getPedidos();
    }

    _getPedidos = () => {
        this.setState({
            loading: true
        });
        let url = this.state.next.length ? this.state.next : ApiService.ORDER_NEW;
        ApiService.instance.getWithPaginator(url).then(
            response => {
                console.log(response);
                this.setState({
                    pedidos: [...this.state.pedidos, ...response.results],
                    next: response.next,
                    count: response.count,
                    loading: false
                })
            }).catch((error) => {
                console.log(error);
                this.setState({
                    loading: false
                });
            });
    }

    _keyExtractor = (item, index) => item.id;

    _onPressItem = (item) => {
        this.props.navigation.navigate('vista-pedido', item.id);
    };

    _onLongPressItem = (item) => {
        this.setState({
            item: item
        })
        this.bottomSheet._show();
    }

    _renderMyKeyExtractor = (item, index) => item.id.toString();

    _renderItem = ({ item }) => {
        return (
            <ItemPedido item={item} onPressItem={this._onPressItem} onLongPressItem={this._onLongPressItem} />
        );
    }

    _getMorePedidos = () => {
        if (this.state.pedidos.length < this.state.count) {
            this._getPedidos()
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Appbar.Header style={[Theme.style.toolbar, { elevation: 0 }]}>
                    <Appbar.Action
                        icon="arrow-left"
                        onPress={() => this.props.navigation.goBack()}
                    />
                    <Appbar.Content
                        title='Lista Pedidos' />
                    {
                        this.state.loading &&
                        <ActivityIndicator
                            size='small'
                            animating={true}
                            color={Theme.colors.primary}
                            style={{ marginHorizontal: 16 }} />
                    }
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
                                    <Text style={{ flex: 1, color: Theme.colors.black, fontSize: 14 }}>Pedido</Text>
                                    <Text style={{ flex: 2, color: Theme.colors.black, fontSize: 14 }}>Actualización</Text>
                                    <Text style={{ flex: 2, color: Theme.colors.black, fontSize: 14 }}>Estado</Text>
                                    <Text style={{ flex: 1, color: Theme.colors.black, fontSize: 14, textAlign: 'right' }}>Monto</Text>
                                </View>
                                <Divider style={{ height: 1 }} />
                            </Fragment>
                            <FlatList
                                data={this.state.pedidos}
                                renderItem={this._renderItem}
                                keyExtractor={this._renderMyKeyExtractor}
                                onEndReachedThreshold={3}
                                onEndReached={this._getMorePedidos}
                                removeClippedSubviews={true}
                                maxToRenderPerBatch={20}
                            />
                        </Fragment>

                        :
                        <EmptyScreen icon='cart' titulo='No hay pedidos que mostrar' />
                }
                <CustomBoottomSheetComponent onRef={ref => (this.bottomSheet = ref)} >
                    <ItemMenuDialog
                        icon='information-outline'
                        label='Detalles'
                        onPress={() => {
                            this.props.navigation.navigate('vista-pedido', this.state.item.id);
                            this.bottomSheet._dismiss();
                        }} />
                    <ItemMenuDialog
                        icon='content-duplicate'
                        label='Duplicar Pedido'
                        onPress={() => {
                            this.bottomSheet._dismiss();
                        }} />
                </CustomBoottomSheetComponent>
            </View>
        );
    }
}

export default ListaPedidos;