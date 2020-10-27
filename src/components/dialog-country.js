import React, { useState } from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
import { Button, Dialog, Portal, TouchableRipple } from "react-native-paper";
import Theme from "../assets/styles/theme";

function DialogCountry({ dialog, onDismiss }) {
    return (
            <Dialog
                visible={dialog.show}
                dismissable={true}
                onDismiss={onDismiss}>
                <Dialog.Title>{dialog.title}</Dialog.Title>
                <Dialog.Content>
                    <View style={{ maxHeight: Dimensions.get('window').height / 1.5 }}>
                        <ScrollView>
                            {
                                _getListItems(dialog.listado, dialog.onItemClick)
                            }
                        </ScrollView>
                    </View>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button
                        onPress={onDismiss}
                        uppercase>
                        cancelar
                        </Button>
                </Dialog.Actions>
            </Dialog>
    );
}

_getListItems = (listado, onItemClick) => {
    let item = [];
    for (let index = 0; index < listado.length; index++) {
        item.push(
            <ItemDialog item={listado[index]} onItemClick={onItemClick} key={index + ''} />
        )
    }
    return item;
}

export function ItemDialog({ item, onItemClick }) {
    console.log(item);
    return (
        <TouchableRipple
            style={{
                paddingHorizontal: 16,
                paddingVertical: 8
            }}
            onPress={() => {
                onItemClick(item)
            }}>
            <Text style={Theme.style.title}>{item.name || item.alias}</Text>
        </TouchableRipple>
    );
}

export default DialogCountry;