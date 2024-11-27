import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { StarIcon, ShieldCheckIcon, ArrowLeftIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { useCart } from '../contexts/CartContext';
import { useCompare } from '../contexts/CompareContext';
import { phones } from '../data/phones';

const categoryColors = {
  'Ultra Premium': 'bg-gradient-to-r from-purple-600 to-indigo-600',
  'Premium': 'bg-gradient-to-r from-blue-600 to-cyan-600',
  'Performant': 'bg-gradient-to-r from-green-600 to-teal-600',
  'Essentiel': 'bg-gradient-to-r from-yellow-600 to-orange-600'
};

function PhoneDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToCompare } = useCompare();

  const phone = phones.find(p => p.id === parseInt(id));

  if (!phone) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Téléphone non trouvé</h2>
          <button
            onClick={() => navigate('/phones')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Retour aux téléphones
          </button>
        </div>
      </div>
    );
  }

  const calculateCO2Savings = () => {
    // Exemple de calcul - à adapter selon vos besoins
    const newPhoneCO2 = 80; // kg CO2 pour un nouveau téléphone
    const refurbishedCO2 = 15; // kg CO2 pour le reconditionnement
    return newPhoneCO2 - refurbishedCO2;
  };

  const co2Savings = calculateCO2Savings();
  const treesEquivalent = Math.round(co2Savings / 20); // 1 arbre absorbe environ 20kg de CO2 par an

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

  const margin = getFixedMargin(phone.category);
  const totalCost = phone.purchasePrice + phone.reconditioningCost;
  const salePrice = totalCost + margin;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Bouton retour */}
      <button
        onClick={() => navigate('/phones')}
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Retour aux téléphones
      </button>

      {/* En-tête du produit */}
      <div className="mt-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{phone.name}</h1>
            <div className="mt-2 flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  index < Math.floor(phone.rating) ? (
                    <StarIconSolid key={index} className="h-5 w-5 text-yellow-400" />
                  ) : (
                    <StarIcon key={index} className="h-5 w-5 text-gray-300" />
                  )
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-500">{phone.rating} sur 5</span>
            </div>
          </div>
          <div className={`mt-4 md:mt-0 ${categoryColors[phone.category]} text-white px-4 py-2 rounded-full text-sm font-medium`}>
            {phone.category}
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Colonne gauche: Image et Caractéristiques */}
        <div className="space-y-8">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={phone.image}
              alt={phone.name}
              className="w-full h-auto object-cover"
            />
          </motion.div>

          {/* Caractéristiques principales */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Caractéristiques</h2>
            <dl className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 px-4 py-3 rounded-lg">
                <dt className="text-sm font-medium text-gray-500">Stockage</dt>
                <dd className="mt-1 text-lg font-semibold text-gray-900">{phone.storage} Go</dd>
              </div>
              <div className="bg-gray-50 px-4 py-3 rounded-lg">
                <dt className="text-sm font-medium text-gray-500">RAM</dt>
                <dd className="mt-1 text-lg font-semibold text-gray-900">{phone.ram} Go</dd>
              </div>
              <div className="bg-gray-50 px-4 py-3 rounded-lg">
                <dt className="text-sm font-medium text-gray-500">État</dt>
                <dd className="mt-1 text-lg font-semibold text-gray-900">{phone.condition}</dd>
              </div>
              <div className="bg-gray-50 px-4 py-3 rounded-lg">
                <dt className="text-sm font-medium text-gray-500">Garantie</dt>
                <dd className="mt-1 text-lg font-semibold text-gray-900">12 mois</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Colonne droite: Prix transparent et Actions */}
        <div className="space-y-8">
          {/* Bannière de transparence */}
          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-3">
              <SparklesIcon className="h-8 w-8 mr-3" />
              <h2 className="text-2xl font-bold">Prix 100% Transparent</h2>
            </div>
            <p className="text-indigo-100">
              Chez Klinet, nous croyons en une transparence totale. Découvrez le détail exact de notre prix ci-dessous.
            </p>
          </div>

          {/* Détail des prix */}
          <div className="space-y-4">
            {/* Prix d'achat initial */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-gray-900">Prix d'achat initial</span>
                  <p className="text-sm text-gray-600 mt-1">Prix d'acquisition du téléphone avant reconditionnement</p>
                </div>
                <span className="text-2xl font-bold text-gray-900">{phone.purchasePrice}€</span>
              </div>
            </motion.div>

            {/* Coût de reconditionnement */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-gray-900">Coût de reconditionnement</span>
                  <p className="text-sm text-gray-600 mt-1">Inclut les tests, réparations et le contrôle qualité sur 40 points</p>
                </div>
                <span className="text-2xl font-bold text-gray-900">{phone.reconditioningCost}€</span>
              </div>
            </motion.div>

            {/* Marge fixe */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-gray-900">Marge fixe {phone.category}</span>
                  <p className="text-sm text-gray-600 mt-1">Marge fixe basée sur la catégorie {phone.category} pour assurer un service de qualité</p>
                </div>
                <span className="text-2xl font-bold text-gray-900">{margin}€</span>
              </div>
            </motion.div>

            {/* Prix final */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-indigo-600 to-blue-700 p-6 rounded-xl shadow-lg transform hover:scale-[1.02] transition-all duration-200"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-xl font-semibold text-white">Prix final TTC</span>
                <span className="text-3xl font-bold text-white">{salePrice}€</span>
              </div>
              <div className="flex items-center justify-between text-indigo-100 text-sm">
                <span>✓ Livraison gratuite</span>
                <span>✓ Garantie 12 mois</span>
                <span>✓ 14 jours retour</span>
              </div>
            </motion.div>

            {/* Boutons d'action */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <button
                onClick={() => addToCart(phone)}
                className="w-full px-6 py-3 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                Ajouter au panier
              </button>
              <button
                onClick={() => addToCompare(phone)}
                className="w-full px-6 py-3 border border-gray-300 rounded-xl shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                Comparer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Impact environnemental */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-12 bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100"
      >
        <div className="flex items-center mb-4">
          <SparklesIcon className="h-6 w-6 text-green-600 mr-2" />
          <h2 className="text-xl font-semibold text-green-900">Impact Environnemental</h2>
        </div>
        <p className="text-green-800">
          En choisissant ce téléphone reconditionné, vous économisez <strong>{co2Savings}kg de CO₂</strong>,
          soit l'équivalent de <strong>{treesEquivalent} arbres</strong> pendant un an.
        </p>
      </motion.div>

      {/* Informations détaillées */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
          <p className="text-gray-600">
            {phone.description || `Le ${phone.name} est un smartphone ${phone.category.toLowerCase()} 
            offrant un excellent rapport qualité-prix. Avec ses ${phone.storage}Go de stockage et 
            ${phone.ram}Go de RAM, il répond parfaitement aux besoins quotidiens.`}
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Notre engagement qualité</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <ShieldCheckIcon className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-gray-600">Tests approfondis sur 40 points de contrôle</span>
            </li>
            <li className="flex items-start">
              <ShieldCheckIcon className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-gray-600">Garantie 12 mois incluse</span>
            </li>
            <li className="flex items-start">
              <ShieldCheckIcon className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-gray-600">14 jours pour changer d'avis</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PhoneDetailPage;
