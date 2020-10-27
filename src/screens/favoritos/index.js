
import * as React from 'react';
import { Appbar } from 'react-native-paper';
import MyTheme from '../../assets/styles';
import { StatusBar, Text, View } from 'react-native';
import ListadoProductosVertical from '../../components/listado-productos-vertical';
import ReduxService from '../../services/redux.service';

class Favoritos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            favorites: ReduxService.instance.getRedux().favorites.favorites ?
                ReduxService.instance.getRedux().favorites.favorites : [],
        }
    }

    _clearFavorites = () => {
        ReduxService.instance.getRedux().setFavorites([]);
        this.props.navigation.goBack();
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
                        title='Favoritos' />
                    <Appbar.Action
                        icon="delete-sweep"
                        onPress={this._clearFavorites}
                    />
                </Appbar.Header>
                <ListadoProductosVertical
                    title='Productos en oferta'
                    productos={this.state.favorites}
                    onItemLongPress={()=>{}} />
            </View>
        );
    }
}

export default Favoritos;