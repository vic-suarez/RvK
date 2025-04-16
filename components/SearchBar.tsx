import React, { memo } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: () => void;
  clearSearch: () => void;
}

const SearchBar = memo(({ searchQuery, setSearchQuery, handleSearch, clearSearch }: SearchBarProps) => (
  <StyledView className="px-4 py-2">
    <StyledView className="flex-row items-center mb-4">
      <StyledView className="flex-1 flex-row items-center bg-gray-100 rounded-full px-3 py-2 shadow-sm">
        <Ionicons name="search-outline" size={18} color="#9CA3AF" />
        <TextInput
          className="flex-1 ml-2 text-sm text-gray-700 font-sans"
          placeholder="Search Pokémon cards..."
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={clearSearch} className="mr-2">
            <Ionicons name="close-circle" size={18} color="#9CA3AF" />
          </TouchableOpacity>
        )}
        <StyledTouchableOpacity className="bg-[#45B3B4] w-8 h-8 rounded-full items-center justify-center ml-2">
          <Ionicons name="camera-outline" size={16} color="white" />
        </StyledTouchableOpacity>
      </StyledView>
    </StyledView>
  </StyledView>
));

export default SearchBar; 