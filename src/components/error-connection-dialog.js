import React from 'react';
import { Button, Dialog, Paragraph, Portal } from 'react-native-paper';

function ErrorConnectionDialog({ visible, onCancel, onRetry }) {
    return (
        <Portal>
            <Dialog
                visible={visible}
                dismissable={false}>
                <Dialog.Content style={{ flexDirection: 'row' }}>
                    <Paragraph>Error de conexión. Revise su conexión a internet.</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button
                        onPress={onCancel}
                        uppercase>
                        cancelar
                </Button>
                    <Button
                        onPress={onRetry}
                        uppercase>
                        Reintentar
                </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}

export default ErrorConnectionDialog;