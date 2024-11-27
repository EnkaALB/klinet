import React from 'react';
import { useCompare } from '../contexts/CompareContext';
import { calculateCarbonSavings } from '../utils/carbonCalculator';
import { XMarkIcon, SparklesIcon, BanknotesIcon, CpuChipIcon } from '@heroicons/react/24/outline';

function ComparePage() {
  const { comparedPhones, removeFromCompare, clearCompare } = useCompare();

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

  const getCategoryStyle = (category) => {
    switch (category) {
      case 'Ultra Premium':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Premium':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Performant':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Essentiel':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const specs = [
    { 
      category: 'Caractéristiques principales',
      icon: CpuChipIcon,
      items: [
        { label: 'Marque', key: 'brand' },
        { label: 'Catégorie', key: 'category', 
          render: (phone) => (
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryStyle(phone.category)}`}>
              {phone.category}
            </span>
          )
        },
        { label: 'Processeur', key: 'processor' },
        { label: 'RAM', key: 'ram', unit: 'Go' },
        { label: 'Stockage', key: 'storage', unit: 'Go' }
      ]
    },
    {
      category: 'Prix et marges',
      icon: BanknotesIcon,
      items: [
        { label: 'Prix de vente', key: 'salePrice', unit: '€',
          render: (phone) => {
            const margin = getFixedMargin(phone.category);
            const totalCost = phone.purchasePrice + phone.reconditioningCost;
            return `${totalCost + margin}€`;
          }
        },
        { label: 'Prix d\'achat', key: 'purchasePrice', unit: '€' },
        { label: 'Coût reconditionnement', key: 'reconditioningCost', unit: '€' },
        { 
          label: 'Marge fixe', 
          key: 'margin',
          render: (phone) => {
            const margin = getFixedMargin(phone.category);
            const totalCost = phone.purchasePrice + phone.reconditioningCost;
            const salePrice = totalCost + margin;
            return (
              <div>
                <span className="font-medium text-indigo-600">{margin}€</span>
                <span className="text-xs text-gray-500 ml-1">
                  ({Math.round((margin / salePrice) * 100)}%)
                </span>
              </div>
            );
          }
        }
      ]
    },
    {
      category: 'Impact environnemental',
      icon: SparklesIcon,
      items: [
        { 
          label: 'Économies CO₂', 
          key: 'carbonSavings',
          render: (phone) => {
            const savings = calculateCarbonSavings(phone);
            return (
              <div className="flex flex-col items-center">
                <span className="text-lg font-semibold text-green-600">
                  {Math.round(savings.totalEmissionsSaved)}kg
                </span>
                <span className="text-xs text-gray-500">
                  équivalent à {Math.round(savings.treeDays)} jours d'absorption d'un arbre
                </span>
              </div>
            );
          }
        }
      ]
    }
  ];

  if (comparedPhones.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Comparateur</h1>
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <p className="text-gray-600 mb-4">
            Vous n'avez pas encore ajouté de téléphones à comparer.
          </p>
          <p className="text-gray-500 text-sm">
            Ajoutez des téléphones depuis la liste des téléphones pour les comparer ici.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Comparateur</h1>
        <button
          onClick={clearCompare}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Tout effacer
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* En-tête avec images et noms */}
        <div className="grid grid-cols-[250px,repeat(auto-fit,minmax(200px,1fr))] border-b">
          <div className="p-6 bg-gray-50">
            <h2 className="font-semibold text-gray-900">Téléphones comparés</h2>
          </div>
          {comparedPhones.map((phone) => (
            <div key={phone.id} className="p-6 relative text-center border-l">
              <button
                onClick={() => removeFromCompare(phone.id)}
                className="absolute top-4 right-4 p-1 rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors"
                title="Retirer de la comparaison"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
              <div className="relative group">
                <img
                  src={phone.image}
                  alt={phone.name}
                  className="w-40 h-40 mx-auto object-contain mb-4 transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="font-medium text-gray-900">{phone.name}</h3>
              <p className="text-sm text-gray-500">{phone.brand}</p>
            </div>
          ))}
        </div>

        {/* Sections de spécifications */}
        {specs.map((section) => (
          <div key={section.category} className="border-b last:border-b-0">
            <div className="grid grid-cols-[250px,repeat(auto-fit,minmax(200px,1fr))]">
              <div className="p-4 bg-gray-50">
                <div className="flex items-center gap-2">
                  <section.icon className="h-5 w-5 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">{section.category}</h3>
                </div>
              </div>
              <div className="col-span-full">
                {section.items.map((spec) => (
                  <div 
                    key={spec.key}
                    className="grid grid-cols-[250px,repeat(auto-fit,minmax(200px,1fr))] border-t first:border-t-0 hover:bg-gray-50 transition-colors"
                  >
                    <div className="p-4 bg-gray-50">
                      <span className="text-gray-700">{spec.label}</span>
                    </div>
                    {comparedPhones.map((phone) => (
                      <div 
                        key={`${phone.id}-${spec.key}`} 
                        className="p-4 text-center border-l"
                      >
                        <span className="text-gray-900">
                          {spec.render 
                            ? spec.render(phone)
                            : `${phone[spec.key]}${spec.unit || ''}`
                          }
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ComparePage;
