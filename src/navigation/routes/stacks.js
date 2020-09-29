import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Route from './routes'
import { navigationRef } from '../root-navigation';

const Stack = createStackNavigator();

function AppStack() {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
                initialRouteName="splash"
                screenOptions={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS
                }}>
                <Stack.Screen
                    name="splash"
                    component={Route.Splash} />
                <Stack.Screen
                    name="principal"
                    component={Route.Principal}
                    options={{
                        drawerLockMode: 'locked-closed'
                    }}
                />
                <Stack.Screen
                    name="usuario"
                    component={Route.Usuario}
                />
                <Stack.Screen
                    name="login"
                    component={Route.Login}
                />
                <Stack.Screen
                    name="edit-information"
                    component={Route.EditInfo}
                />
                <Stack.Screen
                    name="edit-informacion-acceso"
                    component={Route.EditInformacionAcceso}
                />
                <Stack.Screen
                    name="lista-pedidos"
                    component={Route.ListaPedidos}
                />
                <Stack.Screen
                    name="vista-pedido"
                    component={Route.VistaPedido}
                />
                <Stack.Screen
                    name="registro"
                    component={Route.Registro}
                />
                <Stack.Screen
                    name="buscar"
                    component={Route.Buscar}
                />
                <Stack.Screen
                    name="productos"
                    component={Route.Productos}
                />
                <Stack.Screen
                    name="vista_producto"
                    component={Route.VistaProducto}
                />
                <Stack.Screen
                    name="carrito"
                    component={Route.Carrito}
                />
                <Stack.Screen
                    name="favoritos"
                    component={Route.Favoritos}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppStack;