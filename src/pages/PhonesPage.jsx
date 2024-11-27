import React, { useState, useEffect } from 'react';
import { useSearch } from '../contexts/SearchContext';
import { useCart } from '../contexts/CartContext';
import { useCompare } from '../contexts/CompareContext';
import { useLoading } from '../contexts/LoadingContext'; // Ajout de l'import de useLoading
import PhoneCard from '../components/phones/PhoneCard';
import SearchFilters from '../components/search/SearchFilters';
import { phones } from '../data/phones';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';

// Ordre inversé pour avoir Ultra Premium en premier
const categoryOrder = {
  'Ultra Premium': 0,
  'Premium': 1,
  'Performant': 2,
  'Essentiel': 3
};

function PhonesPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { filters, sortBy, searchQuery } = useSearch();
  const { addToCart } = useCart();
  const { addToCompare } = useCompare();
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    // Déclenche l'animation de chargement lors du changement des filtres
    startLoading();
    const timer = setTimeout(() => {
      stopLoading();
    }, 300); // Animation plus courte pour les filtres
    return () => clearTimeout(timer);
  }, [filters, sortBy, searchQuery]);

  // Filtrer les téléphones
  const filteredPhones = phones.filter(phone => {
    if (searchQuery && !phone.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (filters.brand && phone.brand !== filters.brand) {
      return false;
    }
    if (filters.minPrice && phone.purchasePrice < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice && phone.purchasePrice > filters.maxPrice) {
      return false;
    }
    if (filters.minRam && phone.ram < filters.minRam) {
      return false;
    }
    if (filters.minStorage && phone.storage < filters.minStorage) {
      return false;
    }
    if (filters.category && phone.category !== filters.category) {
      return false;
    }
    return true;
  });

  // Trier les téléphones
  const sortedPhones = [...filteredPhones].sort((a, b) => {
    switch (sortBy) {
      case 'category':
        return categoryOrder[a.category] - categoryOrder[b.category];
      case 'price':
        return b.purchasePrice - a.purchasePrice;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'brand':
        return a.brand.localeCompare(b.brand);
      default:
        return categoryOrder[a.category] - categoryOrder[b.category];
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between bg-white py-4">
        <h1 className="text-xl font-semibold text-gray-900">
          Téléphones ({sortedPhones.length})
        </h1>
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <FunnelIcon className="h-5 w-5 mr-2" />
          Filtres
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters - Mobile Overlay */}
        <div
          className={`${
            isFilterOpen ? 'fixed' : 'hidden'
          } inset-0 z-50 lg:hidden bg-gray-500 bg-opacity-75 transition-opacity`}
          onClick={() => setIsFilterOpen(false)}
        >
          <div
            className="fixed inset-y-0 right-0 pl-10 max-w-full flex"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-screen max-w-md">
              <div className="h-full flex flex-col bg-white shadow-xl">
                <div className="flex items-center justify-between px-4 py-6">
                  <h2 className="text-lg font-medium text-gray-900">Filtres</h2>
                  <button
                    className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onClick={() => setIsFilterOpen(false)}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <div className="mt-6 relative flex-1 px-4 sm:px-6">
                  <SearchFilters />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters - Desktop Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-6">
            <SearchFilters />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedPhones.map(phone => (
              <PhoneCard
                key={phone.id}
                phone={phone}
                onAddToCart={() => addToCart(phone)}
                onAddToCompare={() => addToCompare(phone)}
              />
            ))}
          </div>
          
          {/* No Results Message */}
          {sortedPhones.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucun téléphone trouvé
              </h3>
              <p className="text-gray-500">
                Essayez de modifier vos filtres pour voir plus de résultats
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default PhonesPage;
