import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//navigation things

import Home from '../screens/Home';
import Search from '../screens/Search';
//screens on navigation


const Stack = createNativeStackNavigator();

export function Navigator() {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
                <Stack.Screen name="Search" component={Search} options={{headerShown:false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}