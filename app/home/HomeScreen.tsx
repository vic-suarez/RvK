import React, { useState, useEffect, useCallback, memo } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native';
import { styled } from 'nativewind';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../context/CartContext';
import { useSettings } from '../../context/SettingsContext';
import { useNavigation } from '@react-navigation/native';
import searchCards from '../../utils/searchCards';
import SearchBar from '../../components/SearchBar';
import { useSearchContext } from '../../context/SearchContext';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledSafeAreaView = styled(SafeAreaView);

const mockCards = [
  {
    id: 1,
    name: "Pikachu V",
    set: "Vivid Voltage · 043/185",
    price: 49.99,
    image: "https://images.pokemontcg.io/swsh4/43.png"
  },
  {
    id: 2,
    name: "Charizard VMAX",
    set: "Darkness Ablaze · 020/189",
    price: 89.99,
    image: "https://images.pokemontcg.io/swsh3/20.png"
  },
  {
    id: 3,
    name: "Mewtwo V",
    set: "Pokemon GO · 078/078",
    price: 39.99,
    image: "https://images.pokemontcg.io/pgo/78.png"
  },
  {
    id: 4,
    name: "Mew VMAX",
    set: "Fusion Strike · 114/264",
    price: 69.99,
    image: "https://images.pokemontcg.io/swsh8/114.png"
  },
  {
    id: 5,
    name: "Rayquaza V",
    set: "Evolving Skies · 110/203",
    price: 44.99,
    image: "https://images.pokemontcg.io/swsh7/110.png"
  },
  {
    id: 6,
    name: "Gengar VMAX",
    set: "Fusion Strike · 057/264",
    price: 54.99,
    image: "https://images.pokemontcg.io/swsh8/57.png"
  },
  {
    id: 7,
    name: "Umbreon V",
    set: "Evolving Skies · 094/203",
    price: 34.99,
    image: "https://images.pokemontcg.io/swsh7/94.png"
  },
  {
    id: 8,
    name: "Dragonite V",
    set: "Evolving Skies · 056/203",
    price: 29.99,
    image: "https://images.pokemontcg.io/swsh7/56.png"
  },
  {
    id: 9,
    name: "Blaziken VMAX",
    set: "Chilling Reign · 021/198",
    price: 42.99,
    image: "https://images.pokemontcg.io/swsh6/21.png"
  },
  {
    id: 10,
    name: "Snorlax VMAX",
    set: "Sword & Shield · 142/202",
    price: 38.99,
    image: "https://images.pokemontcg.io/swsh1/142.png"
  },
  {
    id: 11,
    name: "Espeon V",
    set: "Evolving Skies · 064/203",
    price: 31.99,
    image: "https://images.pokemontcg.io/swsh7/64.png"
  },
  {
    id: 12,
    name: "Glaceon V",
    set: "Evolving Skies · 175/203",
    price: 33.99,
    image: "https://images.pokemontcg.io/swsh7/175.png"
  },
  {
    id: 13,
    name: "Sylveon V",
    set: "Evolving Skies · 074/203",
    price: 35.99,
    image: "https://images.pokemontcg.io/swsh7/74.png"
  },
  {
    id: 14,
    name: "Leafeon V",
    set: "Evolving Skies · 007/203",
    price: 32.99,
    image: "https://images.pokemontcg.io/swsh7/7.png"
  },
  {
    id: 15,
    name: "Tyranitar V",
    set: "Battle Styles · 097/163",
    price: 28.99,
    image: "https://images.pokemontcg.io/swsh5/97.png"
  },
  {
    id: 16,
    name: "Zamazenta V",
    set: "Sword & Shield · 139/202",
    price: 25.99,
    image: "https://images.pokemontcg.io/swsh1/139.png"
  },
  {
    id: 17,
    name: "Zacian V",
    set: "Sword & Shield · 138/202",
    price: 27.99,
    image: "https://images.pokemontcg.io/swsh1/138.png"
  },
  {
    id: 18,
    name: "Eternatus VMAX",
    set: "Darkness Ablaze · 117/189",
    price: 45.99,
    image: "https://images.pokemontcg.io/swsh3/117.png"
  },
  {
    id: 19,
    name: "Urshifu VMAX",
    set: "Battle Styles · 088/163",
    price: 36.99,
    image: "https://images.pokemontcg.io/swsh5/88.png"
  },
  {
    id: 20,
    name: "Calyrex VMAX",
    set: "Chilling Reign · 046/198",
    price: 41.99,
    image: "https://images.pokemontcg.io/swsh6/46.png"
  }
];

// Memoize the SearchResultsHeader component
const SearchResultsHeader = memo(({ clearSearch }) => (
  <StyledView className="flex-row justify-between items-center mb-4 px-4">
    <Text className="text-lg font-semibold">Search Results</Text>
    <TouchableOpacity onPress={clearSearch}>
      <Text className="text-[#45B3B4]">Clear</Text>
    </TouchableOpacity>
  </StyledView>
));

// Memoize the EmptySearchResults component
const EmptySearchResults = memo(({ clearSearch }) => (
  <StyledView className="flex-1 justify-center items-center py-8">
    <Text className="text-gray-600">No cards found</Text>
    <TouchableOpacity onPress={clearSearch} className="mt-2">
      <Text className="text-[#45B3B4]">Clear search</Text>
    </TouchableOpacity>
  </StyledView>
));

// Memoize the LoadingIndicator component
const LoadingIndicator = memo(() => (
  <StyledView className="flex-1 justify-center items-center py-8">
    <ActivityIndicator size="large" color="#45B3B4" />
    <Text className="mt-4 text-gray-600">Searching cards...</Text>
  </StyledView>
));

export default function HomeScreen() {
  const navigation = useNavigation();
  const { addToCart } = useCart();
  const { currency, exchangeRate } = useSettings();
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const { searchQuery: searchContextQuery } = useSearchContext();

  useEffect(() => {
    if (searchContextQuery && searchContextQuery.trim() !== '') {
      handleSearch(searchContextQuery);
    }
  }, [searchContextQuery]);

  // Use useCallback to memoize functions and prevent unnecessary re-renders
  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setShowSearchResults(true);
    
    try {
      const results = await searchCards(searchQuery);
      
      // Sort results by release date (newest first)
      // Cards with missing release dates will be placed at the end
      const sortedResults = results.sort((a, b) => {
        // If both have release dates, compare them
        if (a.set?.releaseDate && b.set?.releaseDate) {
          return new Date(b.set.releaseDate).getTime() - new Date(a.set.releaseDate).getTime();
        }
        
        // If only one has a release date, prioritize the one with a date
        if (a.set?.releaseDate) return -1;
        if (b.set?.releaseDate) return 1;
        
        // If neither has a release date, maintain original order
        return 0;
      });
      
      if (sortedResults.length === 1) {
        navigation.navigate('CardDetail', { card: sortedResults[0] });
      } else {
        setSearchResults(sortedResults);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, navigation]);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchResults([]);
    setShowSearchResults(false);
  }, []);

  // Reuse the same renderItem function for both home cards and search results
  const renderItem = useCallback(({ item }) => (
    <StyledView className="w-[48%] bg-white rounded-xl shadow p-2 mb-4 mx-1">
      <StyledImage 
        source={{ uri: item.images?.small || item.image }} 
        className="w-full h-44 rounded-xl mb-2"
        resizeMode="contain"
      />
      <StyledText className="font-semibold text-sm text-gray-800">{item.name}</StyledText>
      <StyledText className="text-xs text-gray-500">
        {item.set?.name ? `${item.set.name} · ${item.number || ''}` : item.set}
      </StyledText>
      <StyledView className="flex-row justify-between mt-1">
        <StyledText className="text-xs text-gray-600">
          ${item.cardmarket?.prices?.averageSellPrice?.toFixed(2) || item.price?.toFixed(2) || 'N/A'}
        </StyledText>
        {currency !== 'USD' && (
          <StyledText className="text-xs text-[#45B3B4] font-medium">
            S/ {((item.cardmarket?.prices?.averageSellPrice || item.price) * exchangeRate).toFixed(2)}
          </StyledText>
        )}
      </StyledView>
      <StyledTouchableOpacity 
        className="absolute top-2 right-2 bg-[#45B3B4] w-6 h-6 rounded-full items-center justify-center shadow"
        onPress={() => addToCart(item)}
        activeOpacity={0.7}
      >
        <StyledText className="text-white text-xs font-bold">＋</StyledText>
      </StyledTouchableOpacity>
    </StyledView>
  ), [currency, exchangeRate, addToCart]);

  const ListFooterComponent = useCallback(() => (
    <StyledView className="h-6 items-center justify-center mt-2 opacity-50">
      <StyledText className="text-xs text-gray-400">You've reached the end</StyledText>
    </StyledView>
  ), []);

  return (
    <StyledView className="flex-1 bg-white">
      <StyledSafeAreaView className="flex-1">
        {/* Search Bar - Always visible at the top */}
        <SearchBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          clearSearch={clearSearch}
        />
        
        {/* Content Area - Either search results or featured cards */}
        {showSearchResults ? (
          loading ? (
            <LoadingIndicator />
          ) : (
            <FlatList
              data={searchResults}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 16 }}
              contentContainerStyle={{ paddingBottom: 40 }}
              ListHeaderComponent={<SearchResultsHeader clearSearch={clearSearch} />}
              ListEmptyComponent={<EmptySearchResults clearSearch={clearSearch} />}
              keyboardShouldPersistTaps="handled"
            />
          )
        ) : (
          <FlatList
            data={mockCards}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 16 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}
            ListFooterComponent={ListFooterComponent}
            keyboardShouldPersistTaps="handled"
          />
        )}
      </StyledSafeAreaView>
    </StyledView>
  );
} 