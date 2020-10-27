
import React, { Component, Fragment } from 'react';
import { ActivityIndicator, Appbar, Dialog, Button, Divider, Paragraph, Portal } from 'react-native-paper';
import MyTheme from '../../assets/styles';
import { Text, View } from 'react-native';
import EmptyScreen from '../../components/empty-screen';
import ApiService from '../../services/api.service';
import { FlatList } from 'react-native-gesture-handler';
import ItemPedido from '../../components/item-pedidos';
import Theme from '../../assets/styles/theme';
import CustomBoottomSheetComponent from '../../components/custom-bottom-sheet';
import ItemMenuDialog from '../../components/item-menu-dialog';
import ReduxService from '../../services/redux.service';
import ItemDireccion from '../../components/item-direccion';

class ListaDirecciones extends Component {

    constructor(props) {
        super(props);
        this.backHandler = null;
        this.blurEvents = null;
        this.focusEvents = null;
        this.actualizar = true;
        this.state = {
            direcciones: [],
            url: '',
            item: {},
            dialogEliminar: false
        }
    }

    componentDidMount() {
        this._getDirecciones();
    }

    _getDirecciones = () => {
        ReduxService.instance.getRedux().showLoading();
        let url = ApiService.ADDRESS;
        ApiService.instance.get(url).then(
            response => {
                let login = ReduxService.instance.getRedux().login.login;
                login.customer.address = response;
                ReduxService.instance.getRedux().setLogin(login)
                this.setState({
                    direcciones: response
                })
            }).catch((error) => {
                console.log(error);
                this.setState({
                    loading: false
                });
            });
    }

    _deleteDireccion = () => {
        ReduxService.instance.getRedux().showLoading();
        let url = ApiService.ADD_ADDRESS + this.state.item?.id;
        ApiService.instance.delete(url).then(
            response => {
                console.log(response);
                let auxDirecciones = this.state.direcciones.filter(element => element != this.state.item);
                this.setState({
                    direcciones: auxDirecciones
                });
            }).catch((error) => {
                console.log(error);
                this.setState({
                    loading: false
                });
            });
    }

    _keyExtractor = (item, index) => item.id;

    _onPressItem = (item) => {
        // this.props.navigation.navigate('vista-pedido', item.id);
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
            <ItemDireccion item={item} onPressItem={this._onPressItem} onLongPressItem={this._onLongPressItem} />
        );
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
                        title='Lista Direcciones' />
                    <Appbar.Action
                        icon="plus"
                        onPress={() => {
                            this.props.navigation.navigate('add-direccion', {
                                callBack: () => {
                                    this._getDirecciones();
                                }
                            });
                        }}
                    />
                </Appbar.Header>
                {
                    this.state.direcciones.length
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
                                    <Text style={{ flex: 1, color: Theme.colors.black, fontSize: 14 }}>Alias</Text>
                                    <Text style={{ flex: 1, color: Theme.colors.black, fontSize: 14 }}>Direccion</Text>
                                    <Text style={{ flex: 1, color: Theme.colors.black, fontSize: 14 }}>País</Text>
                                    <Text style={{ flex: 1, color: Theme.colors.black, fontSize: 14 }}>Provincia</Text>
                                    <Text style={{ flex: 1, color: Theme.colors.black, fontSize: 14 }}>Ciudad</Text>
                                </View>
                                <Divider style={{ height: 1 }} />
                            </Fragment>
                            <FlatList
                                data={this.state.direcciones}
                                renderItem={this._renderItem}
                                keyExtractor={this._renderMyKeyExtractor}
                                onEndReachedThreshold={3}
                                removeClippedSubviews={true}
                                maxToRenderPerBatch={20}
                            />
                        </Fragment>

                        :
                        <EmptyScreen icon='map-marker-radius' titulo='No hay direcciones que mostrar' />
                }
                <CustomBoottomSheetComponent onRef={ref => (this.bottomSheet = ref)} >
                    <ItemMenuDialog
                        icon='pencil'
                        label='Editar'
                        onPress={() => {
                            this.props.navigation.navigate('edit-direccion', {
                                data: this.state.item,
                                callBack: this._getDirecciones.bind(this)
                            });
                            this.bottomSheet._dismiss();
                        }} />
                    <ItemMenuDialog
                        icon='delete'
                        label='Eliminar'
                        onPress={() => {
                            this.setState({
                                dialogEliminar: true
                            });
                            this.bottomSheet._dismiss();
                        }} />
                </CustomBoottomSheetComponent>
                <Portal>
                    <Dialog
                        visible={this.state.dialogEliminar}
                        dismissable={true}>
                        <Dialog.Title >Eliminar</Dialog.Title>
                        <Dialog.Content style={{ flexDirection: 'row' }}>
                            <Paragraph>¿Estás seguro que desea eliminar la dirección {this.state.item.alias}?</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button
                                onPress={() => {
                                    this.setState({
                                        dialogEliminar: false
                                    })
                                }}
                                uppercase>
                                cancelar
                            </Button>
                            <Button
                                onPress={() => {
                                    this.setState({
                                        dialogEliminar: false
                                    });
                                    this._deleteDireccion()
                                }}
                                uppercase>
                                eliminar
                            </Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        );
    }
}

export default ListaDirecciones;