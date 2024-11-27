import React from 'react';
import { useSearch } from '../../contexts/SearchContext';

function SearchFilters() {
  const { filters, updateFilters, clearFilters, setSortBy, searchQuery, setSearchQuery } = useSearch();

  const brands = ['Apple', 'Samsung', 'Google', 'Xiaomi', 'Motorola'];
  const categories = ['Ultra Premium', 'Premium', 'Performant', 'Essentiel'];

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Filtres</h2>
        <input
          type="text"
          placeholder="Rechercher un téléphone..."
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Trier par</label>
        <select
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
          value={filters.sortBy || 'category'}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="category" className="text-gray-900">Gamme</option>
          <option value="price" className="text-gray-900">Prix</option>
          <option value="name" className="text-gray-900">Nom</option>
          <option value="brand" className="text-gray-900">Marque</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Gamme</label>
        <select
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
          value={filters.category || ''}
          onChange={(e) => updateFilters({ category: e.target.value })}
        >
          <option value="" className="text-gray-900">Toutes les gammes</option>
          {categories.map(category => (
            <option key={category} value={category} className="text-gray-900">{category}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Marque</label>
        <select
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
          value={filters.brand || ''}
          onChange={(e) => updateFilters({ brand: e.target.value })}
        >
          <option value="" className="text-gray-900">Toutes les marques</option>
          {brands.map(brand => (
            <option key={brand} value={brand} className="text-gray-900">{brand}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Prix</label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min €"
            className="w-1/2 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-500"
            value={filters.minPrice || ''}
            onChange={(e) => updateFilters({ minPrice: Number(e.target.value) || '' })}
          />
          <input
            type="number"
            placeholder="Max €"
            className="w-1/2 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-500"
            value={filters.maxPrice || ''}
            onChange={(e) => updateFilters({ maxPrice: Number(e.target.value) || '' })}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">RAM minimale (Go)</label>
        <input
          type="number"
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
          value={filters.minRam || ''}
          onChange={(e) => updateFilters({ minRam: Number(e.target.value) || '' })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Stockage minimal (Go)</label>
        <input
          type="number"
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
          value={filters.minStorage || ''}
          onChange={(e) => updateFilters({ minStorage: Number(e.target.value) || '' })}
        />
      </div>

      <button
        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
        onClick={clearFilters}
      >
        Réinitialiser les filtres
      </button>
    </div>
  );
}

export default SearchFilters;
