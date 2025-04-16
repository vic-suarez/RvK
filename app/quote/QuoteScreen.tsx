import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { styled } from 'nativewind';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSettings } from '../../context/SettingsContext';
import { useCart } from '../../context/CartContext';
import { Ionicons } from '@expo/vector-icons';
import SearchBar from '../../components/SearchBar';
import { useNavigation } from '@react-navigation/native';
import { useSearchContext } from '../../context/SearchContext';

// Define the CardSet interface to match the one in CartContext
interface CardSet {
  id?: string;
  name: string;
  number?: string;
  series?: string;
  printedTotal?: number;
  releaseDate?: string;
}

// Define the CardItem interface to match the one in CartContext
interface CardItem {
  id: number;
  name: string;
  set: string | CardSet;
  price: number;
  image: string;
  images?: {
    small: string;
    large: string;
  };
  cardmarket?: {
    prices: {
      averageSellPrice: number;
      lowPrice?: number;
      trendPrice?: number;
      germanProLow?: number | null;
      suggestedPrice?: number | null;
    };
  };
  quantity: number;
}

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledScrollView = styled(ScrollView);

export default function QuoteScreen() {
  const { currency, exchangeRate } = useSettings();
  const { cartItems, clearCart, updateQuantity, removeItem } = useCart();
  const navigation = useNavigation();
  const { setSearchQuery } = useSearchContext();
  const [inputValue, setInputValue] = useState('');

  // On submit: relay search to Home with a slight delay
  const onSubmit = () => {
    setSearchQuery(inputValue);
    setTimeout(() => {
      (navigation as any).navigate('Home');
    }, 10);
  };

  const totalCards = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.cardmarket?.prices?.averageSellPrice || item.price || 0;
    return sum + (price * item.quantity);
  }, 0);
  const totalConverted = subtotal * exchangeRate;

  return (
    <StyledSafeAreaView className="flex-1 bg-white" edges={['top']}>
      <SearchBar
        searchQuery={inputValue}
        setSearchQuery={setInputValue}
        handleSearch={onSubmit}
        clearSearch={() => setInputValue('')}
      />
      <StyledScrollView 
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Title and Clear All */}
        <StyledView className="flex-row justify-between items-center mt-4 mb-2">
          <StyledText className="text-xl font-bold text-gray-900">Quote</StyledText>
          {cartItems.length > 0 && (
            <StyledTouchableOpacity 
              className="border border-red-500 px-3 py-1 rounded-lg"
              onPress={clearCart}
            >
              <StyledText className="text-sm text-red-500 font-semibold">Clear All</StyledText>
            </StyledTouchableOpacity>
          )}
        </StyledView>

        {cartItems.length === 0 ? (
          <StyledView className="flex-1 items-center justify-center py-20">
            <StyledView className="items-center mb-6">
              <StyledImage
                source={require('../../assets/Empty-Cart.png')}
                className="w-40 h-40"
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                }}
                resizeMode="contain"
              />
            </StyledView>
            <StyledText className="text-gray-500 text-base text-center mt-4">Your cart is empty</StyledText>
            <StyledText className="text-gray-400 text-sm mt-2 text-center">Add some cards from the Home tab</StyledText>
          </StyledView>
        ) : (
          <>
            {/* Cart Items */}
            {cartItems.map((item) => (
              <StyledView key={item.id} className="pb-4 mb-4 border-b border-gray-200 flex-row items-center space-x-4">
                <StyledImage
                  source={{ uri: item.images?.small || item.image }}
                  className="w-14 h-20 rounded-md bg-gray-50"
                  resizeMode="cover"
                />

                <StyledView className="flex-1">
                  <StyledView className="flex-row justify-between">
                    <StyledView>
                      <StyledText className="text-sm font-semibold text-gray-800">{item.name}</StyledText>
                      <StyledText className="text-xs text-gray-500">
                        {typeof item.set === 'object' && item.set?.name 
                          ? `${item.set.name}${item.set.number ? ` · ${item.set.number}` : ''}` 
                          : String(item.set)}
                      </StyledText>
                    </StyledView>
                    <StyledTouchableOpacity onPress={() => removeItem(item.id)}>
                      <StyledText className="text-gray-400 text-lg">✕</StyledText>
                    </StyledTouchableOpacity>
                  </StyledView>

                  <StyledView className="flex-row items-center justify-between mt-2">
                    <StyledView className="flex-row items-center bg-gray-100 rounded-full px-3 py-1 space-x-3">
                      <StyledTouchableOpacity onPress={() => updateQuantity(item.id, item.quantity - 1)}>
                        <StyledText className="text-lg text-gray-600">−</StyledText>
                      </StyledTouchableOpacity>
                      <StyledText className="text-sm font-medium text-gray-800">{item.quantity}</StyledText>
                      <StyledTouchableOpacity onPress={() => updateQuantity(item.id, item.quantity + 1)}>
                        <StyledText className="text-lg text-gray-600">+</StyledText>
                      </StyledTouchableOpacity>
                    </StyledView>

                    <StyledView className="items-end">
                      <StyledText className="text-sm font-semibold text-gray-700">
                        ${((item.cardmarket?.prices?.averageSellPrice || item.price) * item.quantity).toFixed(2)}
                      </StyledText>
                      {currency !== 'USD' && (
                        <StyledText className="text-xs text-[#45B3B4]">
                          S/ {((item.cardmarket?.prices?.averageSellPrice || item.price) * item.quantity * exchangeRate).toFixed(2)}
                        </StyledText>
                      )}
                    </StyledView>
                  </StyledView>
                </StyledView>
              </StyledView>
            ))}

            {/* Totals */}
            <StyledView className="border-t border-gray-200 pt-4 mt-4">
              <StyledView className="flex-row justify-between mb-1">
                <StyledText className="text-gray-600">Total Cards:</StyledText>
                <StyledText className="text-gray-800 font-medium">{totalCards}</StyledText>
              </StyledView>

              <StyledView className="flex-row justify-between mb-1">
                <StyledText className="text-gray-600">Subtotal:</StyledText>
                <StyledText className="text-gray-800 font-medium">${subtotal.toFixed(2)}</StyledText>
              </StyledView>

              {currency !== 'USD' && (
                <StyledView className="flex-row justify-between mt-1">
                  <StyledText className="text-[#45B3B4] font-medium">Total in {currency}:</StyledText>
                  <StyledText className="text-[#45B3B4] font-semibold">S/ {totalConverted.toFixed(2)}</StyledText>
                </StyledView>
              )}
            </StyledView>
          </>
        )}
      </StyledScrollView>
    </StyledSafeAreaView>
  );
} 