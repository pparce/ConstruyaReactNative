import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import BottomSheetBehavior from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import Theme from '../assets/styles/theme';
import { Dialog } from 'react-native-paper';
import Easing from 'react-native/Libraries/Animated/src/Easing';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import ItemMenuDialog from './item-menu-dialog';

export default class CustomBoottomSheetComponent extends Component {
    sheetRef = React.createRef(null);
    Screen = {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    };
    constructor(props) {
        super(props);
        this._deltaY = new Animated.Value(this.Screen.height);

        this.state = {
            fadeAnim: new Animated.Value(0),
            show: false,
            item: {}
        }
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    _show = () => {
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 0.5,
                duration: 200,
                useNativeDriver: false,
                easing: Easing.in
            },
        ).start();
        setTimeout(() => {
            this.sheetRef.current.snapTo(1);
        }, 200);
        this.setState({
            show: true,
        })
    }

    _dismiss = () => {
        this.sheetRef.current.snapTo(0);
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 0,
                duration: 100,
                useNativeDriver: false,
                easing: Easing.in
            },
        ).start();
        this.setState({
            show: false
        })
    }

    _renderContent = () => (
        <View
            style={{
                backgroundColor: 'white',
                height: 500
            }}>
            {
                this.props.children
            }
        </View>
    );

    render() {
        return (
            <View style={[style.panelContainer, {  }]} >
                <Animated.View
                    pointerEvents={'box-none'}
                    style={[
                        style.panelContainer,
                        {
                            height: '100%',
                            backgroundColor: 'black',
                            opacity: this.state.fadeAnim
                        },
                    ]}
                />
                {
                    this.state.show &&
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this._dismiss()
                        }}
                        style={[{ height: '100%', width: 500, }]}>

                    </TouchableWithoutFeedback>
                }

                <BottomSheetBehavior
                    ref={this.sheetRef}
                    snapPoints={[0, this.props.altura ? this.props.altura : '18%']}
                    initialSnap={0}
                    enabledBottomInitialAnimation={false}
                    enabledInnerScrolling={false}
                    renderContent={this._renderContent}
                    enabledContentTapInteraction={true}
                    enabledContentGestureInteraction={true}
                    enabledGestureInteraction={true}
                    onCloseEnd={() => {
                        this._dismiss()
                    }}
                />
            </View >
        );
    }
}

const style = StyleSheet.create({
    panelContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }
})