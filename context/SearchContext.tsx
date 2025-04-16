import React, { createContext, useContext, useState, useCallback } from 'react';

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: () => void;
  clearSearch: () => void;
  showSearchResults: boolean;
  setShowSearchResults: (show: boolean) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleSearch = useCallback(() => {
    if (!searchQuery.trim()) return;
    setShowSearchResults(true);
  }, [searchQuery]);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setShowSearchResults(false);
  }, []);

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery, handleSearch, clearSearch, showSearchResults, setShowSearchResults }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) throw new Error('useSearchContext must be used within a SearchProvider');
  return context;
}; 