import React, { Fragment } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import MyTheme from '../assets/styles';
import { Appbar } from 'react-native-paper';
import { ThemeProvider } from '@react-navigation/native';

function StepperIndicator({ steppSelected = 0, titulos = ['Productos', 'Envío', 'Pago'] }) {
    return (
        <Appbar.Header style={{
            backgroundColor: '#ffffff',
            height: 72
        }}>
            <View style={style.container}>
                {
                    buldSteps(steppSelected, titulos)

                }
            </View>
        </Appbar.Header>

    );
}

const buldSteps = (steppSelected, titulos) => {
    var steps = [];
    for (let index = 0; index < titulos.length; index++) {
        steps.push(
            <Fragment key={index + ''}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={[style.indicador, {
                        backgroundColor: index <= steppSelected ? MyTheme.colors.primary : MyTheme.colors.disabled
                    }]} >
                        <Text style={style.numero}>{index + 1}</Text>
                    </View>
                    <Text
                        style={[
                            index <= steppSelected ? style.labelSelected : style.label
                            , steppSelected == index && { fontWeight: 'bold' }
                        ]}>{titulos[index]}</Text> 
                </View>
                {
                    index < titulos.length - 1 && <View style={style.linea}></View>
                }
            </Fragment>);
    }
    return steps;
}

export default StepperIndicator;

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        padding: 16,
    },
    indicador: {
        flexDirection: 'column',
        height: 24,
        width: 24,
        margin: 8,
        borderRadius: 50,
        backgroundColor: MyTheme.colors.disabled,
        justifyContent: 'center'
    },
    indicadordisabled: {
        flexDirection: 'column',
        height: 24,
        width: 24,
        margin: 8,
        borderRadius: 50,
        backgroundColor: MyTheme.colors.disabled,
        justifyContent: 'center'
    },
    numero: {
        alignSelf: 'center',
        color: MyTheme.colors.white
    },
    label: {
        color: MyTheme.colors.disabled,
        fontSize: 14,
        display: 'flex'
    },
    labelSelected: {
        fontSize: 14,
        display: 'flex',
        color: MyTheme.colors.black,

    },
    linea: {
        alignSelf: 'center',
        flex: 0.5,
        height: 1,
        marginLeft: 8,
        backgroundColor: MyTheme.colors.disabled
    }
});