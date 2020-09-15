import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Dialog, Paragraph, Portal } from 'react-native-paper';
import Theme from '../assets/styles/theme';

function LoadingDialog({ visible }) {
    return (
        <Portal>
            <Dialog
                visible={visible}
                dismissable={false}>
                <Dialog.Content style={{ flexDirection: 'row' }}>
                    <ActivityIndicator size='small' animating={true} color={Theme.colors.primary} />
                    <Paragraph style={{ marginLeft: 16 }}>Cargando...</Paragraph>
                </Dialog.Content>
            </Dialog>
        </Portal>
    );
}

export default LoadingDialog;