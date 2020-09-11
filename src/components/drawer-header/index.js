import React from 'react';
import { View, SafeAreaView, Text, ScrollView, StatusBar } from "react-native";
import { Avatar, Button } from 'react-native-paper';
import { DrawerItemList } from '@react-navigation/drawer';
import MyTheme from '../../assets/styles';

function DrawerHeader(props) {
    let isLoged = false;
    return (
        <View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
            <ScrollView>
                <SafeAreaView
                    forceInset={{ top: 'always', horizontal: 'never' }}>
                    <View >
                        {
                            isLoged
                                ?
                                <View style={{ flexDirection: 'row', alignContent: 'center', padding: 16 }}>
                                    <Avatar.Text size={64} label="E" color='#ffffff' />
                                    <View style={{ flexDirection: 'column', padding: 8 }}>
                                        <Text>Ernesto Martinez</Text>
                                        <Text>paquito@gmail.com</Text>
                                    </View>
                                </View>
                                :
                                <View style={MyTheme.style.drawerHeaderContainer}>
                                    <Button
                                        style={{ alignSelf: 'baseline' }}
                                        mode="text"
                                        uppercase
                                        onPress={() => {
                                            setTimeout(() => {
                                                props.navigation.navigate('login');
                                            }, 0);
                                            props.navigation.closeDrawer();
                                        }}>
                                        Iniciar Sesión
                                </Button>
                                </View>
                        }
                    </View>
                    <DrawerItemList {...props} />
                </SafeAreaView>
            </ScrollView>
        </View>
    );
}

export default DrawerHeader;