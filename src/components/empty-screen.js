import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Paragraph, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Theme from '../assets/styles/theme';

export default function EmptyScreen({ icon, titulo, subtitulo, accionTitulo, accion = null }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Icon name={icon} size={48} color={Theme.colors.disabled} style={style.icon} />
            <Paragraph style={style.titulo}>{titulo}</Paragraph>
            <Text>{subtitulo}</Text>
            {
                accion &&
                <Button mode='contained'
                    style={{ margin: 16 }}
                    uppercase
                    onPress={accion}>{accionTitulo}</Button>
            }
        </View>
    );
}

const style = StyleSheet.create({
    icon: {
        alignSelf: 'center'
    },
    titulo: {
        color: Theme.colors.disabled
    },
    subtitulo: {

    }
});