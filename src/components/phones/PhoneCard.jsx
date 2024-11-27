import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShoppingCartIcon, 
  ArrowsRightLeftIcon, 
  InformationCircleIcon,
  SparklesIcon,
  StarIcon,
  BoltIcon,
  HeartIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { calculateCarbonSavings } from '../../utils/carbonCalculator';

const categoryColors = {
  'Ultra Premium': 'bg-gradient-to-r from-purple-600 to-indigo-600',
  'Premium': 'bg-gradient-to-r from-blue-600 to-cyan-600',
  'Performant': 'bg-gradient-to-r from-green-600 to-teal-600',
  'Essentiel': 'bg-gradient-to-r from-yellow-600 to-orange-600'
};

function PhoneCard({ phone, onAddToCart, onAddToCompare }) {
  const carbonSavings = calculateCarbonSavings(phone);

  const getCategoryStyle = (category) => {
    switch (category) {
      case 'Ultra Premium':
        return {
          bg: 'bg-purple-100',
          text: 'text-purple-800',
          icon: SparklesIcon,
          border: 'border-purple-200'
        };
      case 'Premium':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-800',
          icon: StarIcon,
          border: 'border-blue-200'
        };
      case 'Performant':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          icon: BoltIcon,
          border: 'border-green-200'
        };
      case 'Essentiel':
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-800',
          icon: HeartIcon,
          border: 'border-yellow-200'
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          icon: InformationCircleIcon,
          border: 'border-gray-200'
        };
    }
  };

  const getFixedMargin = (category) => {
    switch (category) {
      case 'Ultra Premium':
        return 100;
      case 'Premium':
        return 80;
      case 'Performant':
        return 50;
      case 'Essentiel':
        return 30;
      default:
        return 0;
    }
  };

  const categoryStyle = getCategoryStyle(phone.category);
  const CategoryIcon = categoryStyle.icon;
  const margin = getFixedMargin(phone.category);
  const totalCost = phone.purchasePrice + phone.reconditioningCost;
  const salePrice = totalCost + margin;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <Link to={`/phone/${phone.id}`} className="block">
        <div className="relative">
          <img
            src={phone.image}
            alt={phone.name}
            className="w-full h-48 object-cover"
          />
          <div className={`absolute top-2 right-2 ${categoryColors[phone.category]} text-white px-3 py-1 rounded-full text-sm font-medium`}>
            {phone.category}
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{phone.name}</h3>
          
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                index < Math.floor(phone.rating) ? (
                  <StarIconSolid key={index} className="h-4 w-4 text-yellow-400" />
                ) : (
                  <StarIcon key={index} className="h-4 w-4 text-gray-300" />
                )
              ))}
            </div>
            <span className="ml-1 text-sm text-gray-500">
              {phone.rating}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-500">
              <span className="w-16">RAM:</span>
              <span className="font-medium text-gray-900">{phone.ram} Go</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <span className="w-16">Stockage:</span>
              <span className="font-medium text-gray-900">{phone.storage} Go</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div>
              <p className="text-2xl font-bold text-gray-900">{salePrice}€</p>
              <div className="flex items-center text-green-600 text-sm">
                <ShieldCheckIcon className="h-4 w-4 mr-1" />
                <span>Garanti 12 mois</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <span className="text-gray-500">Prix d'achat:</span>
                <span className="font-medium text-gray-700">{phone.purchasePrice}€</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <span className="text-gray-500">Reconditionnement:</span>
                <span className="font-medium text-gray-700">{phone.reconditioningCost}€</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <span className="text-gray-500">Marge fixe:</span>
                <span className="font-medium text-gray-700">{margin}€</span>
                <span className="text-xs text-gray-500">
                  ({Math.round((margin / salePrice) * 100)}%)
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-green-600">Économie CO₂</p>
              <p className="text-base font-semibold text-green-700">{Math.round(carbonSavings.totalEmissionsSaved)}kg</p>
              <p className="text-xs text-gray-500">par rapport au neuf</p>
            </div>
          </div>
        </div>
      </Link>

      <div className="p-4 bg-gray-50 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              onAddToCart(phone);
            }}
            className="px-3 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Ajouter
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              onAddToCompare(phone);
            }}
            className="px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Comparer
          </button>
          <Link
            to={`/phone/${phone.id}`}
            className="px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Détails
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default PhoneCard;
