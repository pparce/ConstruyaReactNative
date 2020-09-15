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
        subtitle: '#757575',
        onBackground: '#ffffff',
        onSurface: '#212121',
        disabled: '#BDBDBD',
        placeholder: '#000000',
        backdrop: 'rgba(0,0,0,0.5)',
        notification: '#F44336',
        black: '#000000',
        white: '#ffffff',
        ripple: '#BDBDBD'
    },
    fonts: configureFonts(),
    animation: {
        scale: 1.0,
    },
    style: StyleSheet.create({
        toolbar: {
            backgroundColor: '#ffffff',
            marginTop: StatusBar.currentHeight
        },
        container: {
            paddingHorizontal: 16,
            paddingTop: 8
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
            color: '#000000'
        },
        subtitle: {
            color: '#616161'
        }
    })
};

export default Theme;
