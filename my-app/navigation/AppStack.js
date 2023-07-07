import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import FavScreen from '../screens/FavScreen';

import DetailsMovie from '../screens/DetailsMovie';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function AppStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
                <Stack.Screen name="Fav" options={{ headerShown: false }} component={FavScreen} />
                <Stack.Screen name="Movie" options={{ headerShown: false }} component={DetailsMovie} />
            </Stack.Navigator>
        </NavigationContainer >

    )




}