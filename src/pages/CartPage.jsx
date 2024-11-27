import React from 'react';
import { useCart } from '../contexts/CartContext';
import { calculateCarbonSavings } from '../utils/carbonCalculator';
import { XMarkIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

function CartPage() {
  const { cart, removeFromCart, total, clearCart } = useCart();

  const totalCarbonSavings = cart.reduce((total, phone) => {
    const savings = calculateCarbonSavings(phone);
    return total + savings.totalEmissionsSaved;
  }, 0);

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Panier</h1>
        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="text-gray-600 hover:text-gray-800"
          >
            Vider le panier
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingCartIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">Votre panier est vide</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Liste des produits */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {cart.map(phone => {
                const carbonSavings = calculateCarbonSavings(phone);
                return (
                  <div
                    key={phone.id}
                    className="flex items-center p-4 border-b last:border-b-0"
                  >
                    <img
                      src={phone.image}
                      alt={phone.name}
                      className="w-24 h-24 object-contain"
                    />
                    <div className="ml-4 flex-1">
                      <h3 className="font-medium">{phone.name}</h3>
                      <p className="text-gray-600">{phone.brand}</p>
                      <div className="mt-2 flex items-center text-sm text-green-600">
                        <span>-{Math.round(carbonSavings.totalEmissionsSaved)}kg CO₂</span>
                      </div>
                    </div>
                    <div className="ml-4 text-right">
                      <p className="text-lg font-bold">{phone.purchasePrice}€</p>
                      <button
                        onClick={() => removeFromCart(phone.id)}
                        className="text-gray-400 hover:text-gray-600 mt-2"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Résumé */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <h2 className="text-lg font-semibold mb-4">Résumé de la commande</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span>{total}€</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Économies CO₂</span>
                  <span>-{Math.round(totalCarbonSavings)}kg</span>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{total}€</span>
                  </div>
                </div>

                <button className="w-full bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 transition-colors">
                  Passer la commande
                </button>

                <div className="text-sm text-gray-600 text-center">
                  Livraison gratuite en France métropolitaine
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
