import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PhoneIcon, SparklesIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
import { useSearch } from '../contexts/SearchContext';

function HomePage() {
  const navigate = useNavigate();
  const { updateFilters, setSortBy } = useSearch();

  const handleCategoryClick = (category) => {
    updateFilters({ category: category });
    setSortBy('category');
    navigate('/phones');
  };

  const categories = [
    {
      name: 'Ultra Premium',
      description: 'Flagships récents avec performances exceptionnelles',
      margin: 100,
      gradient: 'from-purple-600 to-indigo-600',
      hoverGradient: 'hover:from-purple-700 hover:to-indigo-700',
      icon: '✨',
      shadow: 'hover:shadow-purple-500/50'
    },
    {
      name: 'Premium',
      description: 'Haut de gamme avec excellent rapport qualité-prix',
      margin: 80,
      gradient: 'from-blue-600 to-cyan-600',
      hoverGradient: 'hover:from-blue-700 hover:to-cyan-700',
      icon: '⭐',
      shadow: 'hover:shadow-blue-500/50'
    },
    {
      name: 'Performant',
      description: 'Milieu de gamme avec bonnes performances',
      margin: 50,
      gradient: 'from-green-600 to-teal-600',
      hoverGradient: 'hover:from-green-700 hover:to-teal-700',
      icon: '⚡',
      shadow: 'hover:shadow-green-500/50'
    },
    {
      name: 'Essentiel',
      description: 'Entrée de gamme fiable et économique',
      margin: 30,
      gradient: 'from-yellow-600 to-orange-600',
      hoverGradient: 'hover:from-yellow-700 hover:to-orange-700',
      icon: '♻️',
      shadow: 'hover:shadow-yellow-500/50'
    }
  ];

  const features = [
    {
      name: 'Catalogue Varié',
      description: 'Large sélection de smartphones reconditionnés',
      icon: PhoneIcon
    },
    {
      name: 'Impact Environnemental',
      description: 'Calculateur d\'empreinte carbone intégré',
      icon: SparklesIcon
    },
    {
      name: 'Comparateur',
      description: 'Comparez facilement les modèles',
      icon: ArrowsRightLeftIcon
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
        >
          <span className="block">Smartphones Reconditionnés</span>
          <span className="block text-indigo-600">Écologiques et Économiques</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
        >
          Découvrez notre sélection de smartphones reconditionnés,
          classés par gamme pour une transparence totale sur la qualité et les prix.
        </motion.p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <Link
            to="/phones"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Voir les téléphones
          </Link>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Nos Gammes
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Une classification transparente pour vous aider à choisir
              le smartphone qui correspond à vos besoins.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => (
              <motion.button
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleCategoryClick(category.name)}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
                className={`relative rounded-lg px-6 py-5 overflow-hidden bg-gradient-to-r ${category.gradient} ${category.hoverGradient} shadow-lg hover:shadow-xl ${category.shadow} transition-all duration-300 cursor-pointer w-full text-left`}
              >
                <div className="text-white">
                  <div className="flex justify-between items-center mb-4">
                    <motion.div 
                      className="text-2xl"
                      whileHover={{ 
                        rotate: [0, -10, 10, -10, 0],
                        transition: { duration: 0.5 }
                      }}
                    >
                      {category.icon}
                    </motion.div>
                    <div className="flex items-center bg-white bg-opacity-20 rounded-full px-3 py-1">
                      <span className="text-sm font-medium">Marge fixe:</span>
                      <span className="ml-2 font-bold">{category.margin}€</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-medium">{category.name}</h3>
                  <p className="mt-2 text-white text-opacity-80">
                    {category.description}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Pourquoi Choisir Klinet ?
            </h2>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="relative"
                >
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="ml-16">
                    <h3 className="text-lg font-medium text-gray-900">{feature.name}</h3>
                    <p className="mt-2 text-base text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
