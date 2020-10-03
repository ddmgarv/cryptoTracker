import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CoinsScreen from './CoinsScreen';
import CoinsDetailsScreen from './CoinsDetailsScreen';
import Colors from '../../resources/colors';


const Stack = createStackNavigator();
function CoinsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.blackPearl,
          shadowOpacity: Colors.blackPearl
        },
        headerTintColor: Colors.white
      }}
    >
      <Stack.Screen
        name="Coins"
        component={CoinsScreen}
      />
      <Stack.Screen
        name="CoinDetail"
        component={CoinsDetailsScreen}
      />
    </Stack.Navigator>
  )
}

export default CoinsStack;
