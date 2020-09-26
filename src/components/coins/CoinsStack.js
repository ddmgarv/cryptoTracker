import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CoinsScreen from './CoinsScreen';
import CoinsDetailsScreen from './CoinsDetailsScreen';

const Stack = createStackNavigator();

function CoinsStack() {
  return (
    <Stack.Navigator>

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
