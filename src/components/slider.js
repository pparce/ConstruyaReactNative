import ViewPager from '@react-native-community/viewpager';
import React, { Component, Fragment } from 'react';
import { Image, View } from 'react-native';
import ApiService from '../services/api.service';
import PaginationDot from 'react-native-animated-pagination-dot';
import { Divider } from 'react-native-paper';

export class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            images: this.props.images ? this.props.images : []
        }
    }

    _buildItems = () => {
        let images = this.props.images ? this.props.images : [];
        let items = [];
        for (let index = 0; index < images.length; index++) {
            let imagenUrl = ApiService.IMAGE_BASE_URL_WITHOUT_MEDIA + images[index].file_manager.image;
            items.push(
                <Image
                    key={index.toString()}
                    resizeMode='cover'
                    style={{
                        width: '100%',
                        height: '80%',
                        borderTopLeftRadius: 5,
                        borderTopRightRadius: 5
                    }}
                    source={{ uri: imagenUrl }} />
            );
        }
        return items;
    }

    render() {
        let images = this.props.images ? this.props.images : [];
        console.log(this.state.currentPage);
        return (
            <View style={{ flex: 1 }}>
                <ViewPager
                    style={{ flex: 1, height: 300 }}
                    initialPage={0}
                    onPageSelected={(e) => {
                        var position = e.nativeEvent.position;
                        this.setState({ currentPage: position });
                        // this.setState({ currentPage: position });
                    }}>
                    {
                        this._buildItems()
                    }
                </ViewPager>
                <Divider style={{ height: 1 }} />
                {
                    images.length > 1 &&
                    <View style={{ flex: 1, alignItems: 'center', paddingTop: 8 }}>
                        <PaginationDot
                            activeDotColor='black'
                            curPage={this.state.currentPage}
                            maxPage={images.length}
                            sizeRatio={1.0}
                        />
                        </View>
                    }
            </View>
        );
    }
}

