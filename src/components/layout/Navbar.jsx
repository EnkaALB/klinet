import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useCompare } from '../../contexts/CompareContext';
import Logo from './Logo';
import {
  ShoppingCartIcon,
  ArrowsRightLeftIcon,
  SparklesIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';

function Navbar() {
  const { cart } = useCart();
  const { comparedPhones } = useCompare();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex-shrink-0">
              <Logo className="h-8 w-auto" />
            </Link>

            <div className="hidden md:flex items-center gap-4">
              <Link
                to="/"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                <SparklesIcon className="h-5 w-5 inline-block mr-1" />
                Accueil
              </Link>
              <Link
                to="/phones"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                <PhoneIcon className="h-5 w-5 inline-block mr-1" />
                Téléphones
              </Link>
              <Link
                to="/carbon-calculator"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                <SparklesIcon className="h-5 w-5 inline-block mr-1" />
                Impact CO₂
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/compare"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium relative"
            >
              <ArrowsRightLeftIcon className="h-6 w-6" />
              {comparedPhones.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {comparedPhones.length}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium relative"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
