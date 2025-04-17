import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../context/CartContext';
import { useSettings } from '../../context/SettingsContext';
import { MainStackParamList } from '../navigation/MainNavigator';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledScrollView = styled(ScrollView);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledTouchableOpacity = styled(TouchableOpacity);

type CardDetailScreenRouteProp = RouteProp<MainStackParamList, 'CardDetail'>;

const PriceRow = ({ source, price, trend, onAddToQuote, onViewExternal }) => {
  const { currency, exchangeRate } = useSettings();
  const trendColor = trend === 'up' ? 'text-green-500' : 'text-red-500';
  
  return (
    <StyledView className="flex-row items-center justify-between py-3 border-b border-gray-100">
      <StyledView className="flex-1">
        <StyledView className="flex-row items-center gap-2">
          <StyledText className="text-gray-800 font-semibold">{source}</StyledText>
          <Ionicons 
            name={trend === 'up' ? 'trending-up' : 'trending-down'} 
            size={16} 
            color={trend === 'up' ? '#22C55E' : '#EF4444'} 
          />
        </StyledView>
        <StyledView className="flex-row gap-2 mt-1">
          <StyledText className="text-gray-600">${price.toFixed(2)}</StyledText>
          {currency !== 'USD' && (
            <StyledText className="text-[#45B3B4]">
              S/ {(price * exchangeRate).toFixed(2)}
            </StyledText>
          )}
        </StyledView>
      </StyledView>
      <StyledView className="flex-row gap-2">
        <StyledTouchableOpacity 
          onPress={onViewExternal}
          className="w-8 h-8 rounded-full border border-gray-200 items-center justify-center"
        >
          <Ionicons name="open-outline" size={16} color="#666" />
        </StyledTouchableOpacity>
        <StyledTouchableOpacity 
          onPress={onAddToQuote}
          className="w-8 h-8 rounded-full bg-[#45B3B4] items-center justify-center"
        >
          <StyledText className="text-white text-sm font-bold">+</StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    </StyledView>
  );
};

const InfoItem = ({ label, value }) => (
  <StyledView className="flex-1">
    <StyledText className="text-gray-500 text-sm mb-1">{label}</StyledText>
    <StyledText className="text-gray-800">{value}</StyledText>
  </StyledView>
);

export const CardDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<CardDetailScreenRouteProp>();
  const { card } = route.params;
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleShare = () => {
    // Implement share functionality
  };

  const handleAddToQuote = () => {
    addToCart(card);
  };

  return (
    <StyledSafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <StyledView className="flex-row items-center justify-between px-4 py-2 bg-white border-b border-gray-100">
        <StyledTouchableOpacity 
          onPress={() => navigation.goBack()}
          className="w-10 h-10 items-center justify-center"
        >
          <Ionicons name="chevron-back" size={24} color="#45B3B4" />
        </StyledTouchableOpacity>
        <StyledText className="text-lg font-semibold text-gray-800">Card Details</StyledText>
        <StyledView className="flex-row gap-2">
          <StyledTouchableOpacity 
            onPress={() => setIsFavorite(!isFavorite)}
            className="w-10 h-10 items-center justify-center"
          >
            <Ionicons 
              name={isFavorite ? "heart" : "heart-outline"} 
              size={24} 
              color={isFavorite ? "#EF4444" : "#666"} 
            />
          </StyledTouchableOpacity>
          <StyledTouchableOpacity 
            onPress={handleShare}
            className="w-10 h-10 items-center justify-center"
          >
            <Ionicons name="share-outline" size={24} color="#666" />
          </StyledTouchableOpacity>
        </StyledView>
      </StyledView>

      <StyledScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Card Image */}
        <StyledView className="p-6 items-center">
          <StyledImage
            source={{ uri: card.images?.large || card.image }}
            className="w-[220px] h-[315px] rounded-xl shadow-lg"
            resizeMode="contain"
          />
        </StyledView>

        {/* Card Info */}
        <StyledView className="px-6">
          <StyledView className="flex-row items-start justify-between mb-4">
            <StyledView className="flex-1">
              <StyledText className="text-2xl font-bold text-gray-800 mb-1">
                {card.name}
              </StyledText>
              <StyledText className="text-gray-600">
                {card.set} · {card.number || 'N/A'}
              </StyledText>
            </StyledView>
            {card.rarity && (
              <StyledView className="bg-gray-100 px-3 py-1 rounded-full">
                <StyledText className="text-sm text-gray-600">{card.rarity}</StyledText>
              </StyledView>
            )}
          </StyledView>

          {/* Info Grid */}
          <StyledView className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <StyledView className="flex-row gap-4">
              <InfoItem label="Type" value={card.type || 'N/A'} />
              <InfoItem label="Artist" value={card.artist || 'N/A'} />
              <InfoItem label="Release Date" value={card.releaseDate || 'N/A'} />
            </StyledView>
          </StyledView>

          {/* Price Comparison */}
          <StyledView className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <StyledText className="text-lg font-semibold text-gray-800 mb-2">
              Price Comparison
            </StyledText>
            
            <PriceRow 
              source="TCGPlayer"
              price={card.cardmarket?.prices?.averageSellPrice || card.price}
              trend="up"
              onAddToQuote={handleAddToQuote}
              onViewExternal={() => {}}
            />
            
            {/* Add more price rows as needed */}
          </StyledView>
        </StyledView>
      </StyledScrollView>
    </StyledSafeAreaView>
  );
}; 