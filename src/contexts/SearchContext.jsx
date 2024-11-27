import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export function useSearch() {
  return useContext(SearchContext);
}

export function SearchProvider({ children }) {
  const [filters, setFilters] = useState({
    brand: '',
    minPrice: '',
    maxPrice: '',
    minRam: '',
    minStorage: '',
    category: ''
  });

  const [sortBy, setSortBy] = useState('price');
  const [searchQuery, setSearchQuery] = useState('');

  const updateFilters = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const clearFilters = () => {
    setFilters({
      brand: '',
      minPrice: '',
      maxPrice: '',
      minRam: '',
      minStorage: '',
      category: ''
    });
    setSearchQuery('');
  };

  const value = {
    filters,
    updateFilters,
    clearFilters,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}
