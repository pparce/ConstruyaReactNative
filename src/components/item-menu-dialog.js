import React, { Fragment } from 'react';
import { StyleSheet, Text } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Theme from '../assets/styles/theme';
import RBSheet from "react-native-raw-bottom-sheet";

export default function ItemMenuDialog({ icon, label, onPress }) {
    return (
        <TouchableRipple delayPressIn={0} delayLongPress={0} style={style.container} onPress={onPress}>
            <Fragment>
                <Icon name={icon} size={24} style={style.icon}/>
                <Text style={style.label}>{label}</Text>
            </Fragment>
        </TouchableRipple>
    );
}

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 16,
        alignItems: 'center'
    },
    icon: {
        color: Theme.colors.black,
        marginRight: 16
    },
    label:{
        color: Theme.colors.black
    }
});