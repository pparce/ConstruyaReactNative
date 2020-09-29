import { configureFonts } from "react-native-paper";
import { StyleSheet, Dimensions, StatusBar } from "react-native";

const Theme = {
    dark: false,
    roundness: 4,
    colors: {
        primary: '#1976D2',
        accent: '#2196F3',
        background: '#f6f6f6',
        surface: '#ffffff',
        error: '#B00020',
        text: '#000000',
        onBackground: '#ffffff',
        onSurface: '#212121',
        disabled: '#BDBDBD',
        placeholder: '#757575',
        backdrop: 'rgba(0,0,0,0.5)',
        notification: '#F44336',
        black: '#000000',
        white: '#ffffff',
        ripple: '#BDBDBD',
        gris: '#616161',
        grisClaro: '#E0E0E0',
        subtitle: '#757575',
    },
    fonts: configureFonts(),
    animation: {
        scale: 0.5,
    },
    style: StyleSheet.create({
        toolbar: {
            backgroundColor: '#ffffff',
            marginTop: StatusBar.currentHeight
        },
        container: {
            paddingHorizontal: 16,
            paddingTop: 8,
            paddingBottom: 16
        },
        drawerHeaderContainer: {
            padding: 16,
            flexDirection: 'row',
            justifyContent: 'center'
        },
        alingHorizontal: {
            flexDirection: 'row',
        },
        alingVertical: {
            flexDirection: 'column',
        },
        horizontalCard: {
            marginHorizontal: 8,
            marginVertical: 16,
            width: 170
        },
        verticalCard: {
            marginHorizontal: 8,
            marginVertical: 16,
            width: Dimensions.get('window').width / 2 - 24
        },
        title: {
            fontSize: 18,
            color: '#000000'
        },
        titleBold: {
            fontSize: 18,
            color: '#000000',
            fontWeight: '900',
        },
        subtitle: {
            fontSize: 14,
            color: '#616161',
        },
        subtitleBold: {
            fontSize: 14,
            color: '#000000',
        }
    })
};

export default Theme;
