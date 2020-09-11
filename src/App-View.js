import React, { Component, Fragment } from 'react';
import { Provider, Dialog, Portal, Paragraph, Colors } from 'react-native-paper';
import MyTheme from './assets/styles';
import { ActivityIndicator } from 'react-native';
import AppStack from './routes/stacks';
import { getShowLoading } from './redux/app/selectors';
import { connect } from 'react-redux';
import { hideLoading } from './redux/app/actions';

class AppView extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Provider theme={ MyTheme }>
                <AppStack />
                <Portal>
                    <Dialog
                        visible={this.props.showLoading}
                        onDismiss={() => {
                            this.props.loadingOff();
                        }}>
                        <Dialog.Content style={{ flexDirection: 'row' }}>
                            <ActivityIndicator size='small' animating={true} color={Colors.blue800} />
                            <Paragraph style={{ marginLeft: 16 }}>Cargando...</Paragraph>
                        </Dialog.Content>
                    </Dialog>
                </Portal>
            </Provider>
        );
    }
}

const mapStateToProps = state => ({
    showLoading: getShowLoading(state),
});

const mapDispatchToProps = {
    loadingOff: hideLoading
};

export default connect(mapStateToProps, mapDispatchToProps)(AppView);