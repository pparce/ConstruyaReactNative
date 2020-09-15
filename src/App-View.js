import React, { Component } from 'react';
import { Provider } from 'react-native-paper';
import MyTheme from './assets/styles';
import AppStack from './routes/stacks';
import { connect } from 'react-redux';
import { getCart } from './redux/cart/selectors';
import CarroService from './services/carro.service';
import { setCart } from './redux/cart/actions';

class AppView extends Component {
    constructor(props) {
        super(props);
        CarroService.instance.setActionRedux(this.props)
    }

    render() {
        return (
            <Provider theme={MyTheme}>
                <AppStack />
            </Provider>
        );
    }
}

const mapStateToProps = state => ({
    cart: state.cart
});

const mapDispatchToProps = {
    setCart: setCart
};

export default connect(mapStateToProps, mapDispatchToProps)(AppView);