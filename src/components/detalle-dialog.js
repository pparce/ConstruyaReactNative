import React, { useState } from 'react';
import { Image } from 'react-native';
import { Button, Dialog } from 'react-native-paper';
import ApiService from '../services/api.service';
import Shimmer from './shimmer';

export default function DetalleDialog({ visible, onDismiss, item }) {
    var urlImagen = ApiService.IMAGE_BASE_URL + item.product_image_main;
    var [showShimmer, setShowShimmer] = useState(false);
    return (
        <Dialog
            visible={visible}
            onDismiss={onDismiss}>
            <Dialog.Content>
                <Shimmer
                    style={{ width: '100%', height: 150 }}
                    autoRun={!showShimmer}
                    visible={showShimmer}>
                    <Image
                        onLoad={() => {
                            setShowShimmer(true);
                        }}
                        style={{
                            width: '100%',
                            height: 150,
                            borderTopLeftRadius: 5,
                            borderTopRightRadius: 5
                        }}
                        source={{ uri: urlImagen }} />
                </Shimmer>
            </Dialog.Content>
            <Dialog.Actions>
                <Button
                    onPress={onDismiss}
                    uppercase>
                    Aceptar
                </Button>
            </Dialog.Actions>
        </Dialog>
    );
}