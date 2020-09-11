import React, { Component, Fragment, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { View, Image, Dimensions } from 'react-native';
import Shimmer from './shimmer';

class Slider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imagenes: [
                {
                    id: '0',
                    imagen: 'http://construyaalcosto.storebow.scoutframe.com/assets/store/templates/construyaalcosto/1.png'
                },
                {
                    id: '1',
                    imagen: 'http://construyaalcosto.storebow.scoutframe.com/assets/store/templates/construyaalcosto/2.png'
                },
                {
                    id: '2',
                    imagen: 'http://construyaalcosto.storebow.scoutframe.com/assets/store/templates/construyaalcosto/3.png'
                }]
        }
    }

    _keyExtractor = (item, index) => item.id;

    _onPressItem = (item) => {

    };

    _renderMyKeyExtractor = (item, index) => item.id.toString();

    _renderItem = ({ item }) => {
        return (
            <MyListItem item={item} onPressItem={this._onPressItem} />
        );
    }

    render() {
        return (
            <Fragment>
                <FlatList
                    snapToAlignment='start'
                    horizontal
                    style={{ backgroundColor: '#deb887' }}
                    data={this.state.imagenes}
                    renderItem={this._renderItem}
                    keyExtractor={this._renderMyKeyExtractor}
                />
            </Fragment>

        );
    }
}

function MyListItem(props) {
    const item = props.item;
    const urlImagen = item.imagen;
    const [showShimmer, setShowShimmer] = useState();
    return (
        <View style={{ height: 200, width: Dimensions.get('window').width }}>
            <Shimmer style={{ backgroundColor: '#000000', height: 200, width: Dimensions.get('window').width }} autoRun={!showShimmer} visible={showShimmer}>
                <Image
                    onLoad={() => {
                        setShowShimmer(true);
                    }}
                    style={{
                        height: 200,
                        width: '100%'
                    }}
                    source={{ uri: urlImagen }} />
            </Shimmer>
        </View>
    );
}


export default Slider;