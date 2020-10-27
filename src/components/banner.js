import React, { Component, Fragment, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { View, Image, Dimensions } from 'react-native';
import Shimmer from './shimmer';
import ViewPager from '@react-native-community/viewpager';
import PaginationDot from 'react-native-animated-pagination-dot';

class Banner extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
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

    _buildItems = () => {
        let items = [];
        for (let index = 0; index < this.state.imagenes.length; index++) {
            items.push(
                this._renderItem(this.state.imagenes[index])
            );
        }
        return items;
    }

    _renderMyKeyExtractor = (item, index) => item.id.toString();

    _renderItem = (item) => {
        return (
            <MyListItem item={item} onPressItem={this._onPressItem}  key={item.id.toString()}/>
        );
    }

    render() {
        return (
            <Fragment>
                <ViewPager
                    onPageSelected={(e) => {
                        var position = e.nativeEvent.position;
                        this.setState({ currentPage: position });
                        // this.setState({ currentPage: position });
                    }}
                    style={{ height: 200 }}>
                    {
                        this._buildItems()
                    }
                </ViewPager>
                <View style={{flex:1, alignItems: 'center', paddingTop: 8}}>
                    <PaginationDot
                        activeDotColor='black'
                        curPage={this.state.currentPage}
                        maxPage={3}
                        sizeRatio={1.0}
                    />
                </View>
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


export default Banner;