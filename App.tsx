import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SettingsProvider } from './context/SettingsContext';
import { CartProvider } from './context/CartContext';
import { SearchProvider } from './context/SearchContext';
import TabNavigator from './app/navigation/TabNavigator';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Nunito-Regular': require('./assets/fonts/NunitoSans-Regular.ttf'),
    'Nunito-SemiBold': require('./assets/fonts/NunitoSans-SemiBold.ttf'),
    'Nunito-Bold': require('./assets/fonts/NunitoSans-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SearchProvider>
      <SettingsProvider>
        <CartProvider>
          <NavigationContainer>
            <TabNavigator />
          </NavigationContainer>
        </CartProvider>
      </SettingsProvider>
    </SearchProvider>
  );
}
