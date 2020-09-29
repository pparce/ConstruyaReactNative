import React from 'react';
import RNBottomActionSheet from 'react-native-bottom-action-sheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Theme from '../assets/styles/theme';

export default function BottomSheetProducto({ visible, onSelection }) {
    // let facebook = <Icon family='FontAwesome' name='facebook' color={'#000000'} size={30} />
    // let instagram = <Icon family='FontAwesome' name='instagram' color={'#000000'} size={30} />
    return (
        <RNBottomActionSheet.SheetView visible={visible} theme={"light"} onSelection={onSelection}>
            <RNBottomActionSheet.SheetView.Item
                title={"Agregar a Favoritos"}
                icon={
                    <Icon family='MaterialIcons' name='favorite-border' color={Theme.colors.black} size={10} />
                } />
            <RNBottomActionSheet.SheetView.Item
                title={"Detalles"}
                icon={
                    <Icon family='MaterialIcons' name='info' color={Theme.colors.black} size={10} />
                } />
        </RNBottomActionSheet.SheetView>
    );
}