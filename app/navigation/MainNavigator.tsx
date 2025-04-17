import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import { CardDetailScreen } from '../screens/CardDetailScreen';

// Define the type for our stack navigation parameters
export type MainStackParamList = {
  MainTabs: undefined;
  CardDetail: {
    card: {
      id: number | string;
      name: string;
      set: string;
      price: number;
      image: string;
      images?: {
        small: string;
        large: string;
      };
      cardmarket?: {
        prices: {
          averageSellPrice: number;
        };
      };
      number?: string;
      rarity?: string;
      type?: string;
      artist?: string;
      releaseDate?: string;
    };
  };
};

const Stack = createStackNavigator<MainStackParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="MainTabs" 
        component={TabNavigator}
      />
      <Stack.Screen 
        name="CardDetail" 
        component={CardDetailScreen}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator; 