import React from 'react';
import { createStackNavigator, TransitionPresets, CardStyleInterpolators } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Route from './routes'

const Stack = createStackNavigator();

function AppStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="principal"
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
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppStack;