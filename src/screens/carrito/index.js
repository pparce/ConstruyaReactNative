import React, { Component } from 'react';
import { View, Text, StatusBar, StyleSheet } from 'react-native';
import ViewPagerAndroid from '@react-native-community/viewpager';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { Appbar } from 'react-native-paper';
import MyTheme from "../../assets/styles";
import StepperIndicator from '../../components/stepper-indicator';
import StepperNavigation from '../../components/stepper-navigation';

class Carrito extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            steppers: ['Productos', 'Envío', 'Pago']
        };
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Appbar.Header style={[MyTheme.style.toolbar]}>
                    <Appbar.Action
                        icon="arrow-left"
                        onPress={() => this.props.navigation.goBack()}
                    />
                    <Appbar.Content title='Carro de Compras' />
                </Appbar.Header>

                <StepperIndicator
                    steppSelected={this.state.currentPage}
                    titulos={this.state.steppers} />
                <ViewPagerAndroid
                    ref={(viewpager) => {
                        this.viewPager = viewpager;
                    }}
                    onPageSelected={(e) => {
                        var position = e.nativeEvent.position;
                        // this.setState({ currentPage: position });
                    }}
                    scrollEnabled={true}
                    style={styles.viewPager}
                    initialPage={this.state.currentPage}>
                    <View style={styles.pageStyle} key="1f">
                        <Text>First page</Text>
                    </View>
                    <View style={styles.pageStyle} key="2f">
                        <Text>Second page</Text>
                    </View>
                    <View style={styles.pageStyle} key="3">
                        <Text>Second page</Text>
                    </View>
                </ViewPagerAndroid>
                <StepperNavigation
                    steppers={this.state.steppers}
                    currentPage={this.state.currentPage}
                    back={this.lastStep}
                    next={this.nextStep}
                    end={this.endStep} />
            </View>
        );
    };

    nextStep = () => {
        this.setState({currentPage: this.state.currentPage + 1})
        this.viewPager.setPage(this.state.currentPage + 1)
    }

    lastStep = () => {
        this.viewPager.setPage(this.state.currentPage - 1)
        this.setState({currentPage: this.state.currentPage - 1})
    }

    endStep = () => {

    }
}

var styles = StyleSheet.create({
    viewPager: {
        flex: 1
    },
    pageStyle: {

        alignItems: 'center',
        padding: 20,
    }
});

export default Carrito;