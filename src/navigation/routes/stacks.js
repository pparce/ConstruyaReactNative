import React from 'react';
import { createStackNavigator, TransitionPresets, TransitionSpecs } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Route from './routes'
import { navigationRef } from '../root-navigation';

const Stack = createStackNavigator();
const config = {
    animation: 'spring',
    config: {
        stiffness: 1000,
        damping: 500,
        mass: 3,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
    },
};

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
                    key='principal'
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
                    name="lista-direcciones"
                    component={Route.ListaDirecciones}
                />
                <Stack.Screen
                    name="edit-direccion"
                    component={Route.EditDireccion}
                />
                <Stack.Screen
                    name="add-direccion"
                    component={Route.AddDireccion}
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