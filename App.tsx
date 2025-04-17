import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SettingsProvider } from './context/SettingsContext';
import { CartProvider } from './context/CartContext';
import { SearchProvider } from './context/SearchContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MainNavigator from './app/navigation/MainNavigator';

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SearchProvider>
        <SettingsProvider>
          <CartProvider>
            <NavigationContainer>
              <MainNavigator />
            </NavigationContainer>
          </CartProvider>
        </SettingsProvider>
      </SearchProvider>
    </GestureHandlerRootView>
  );
}
