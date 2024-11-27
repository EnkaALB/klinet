import React from 'react';
import { calculateCarbonSavings } from '../utils/carbonCalculator';
import { phones } from '../data/phones';

function CarbonCalculatorPage() {
  // Calculer l'impact total de tous les téléphones
  const totalImpact = phones.reduce((total, phone) => {
    const savings = calculateCarbonSavings(phone);
    return {
      co2: total.co2 + savings.totalEmissionsSaved,
      trees: total.trees + savings.treeDays,
      car: total.car + savings.carKm
    };
  }, { co2: 0, trees: 0, car: 0 });

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-2xl font-bold mb-8">Calculateur d'Impact Environnemental</h1>

      {/* Impact total */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-3xl font-bold text-green-600 mb-2">
            {Math.round(totalImpact.co2)}kg
          </div>
          <div className="text-gray-600">
            CO₂ économisé par nos téléphones reconditionnés
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-3xl font-bold text-green-600 mb-2">
            {Math.round(totalImpact.trees)} jours
          </div>
          <div className="text-gray-600">
            Équivalent en jours d'absorption d'un arbre
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-3xl font-bold text-green-600 mb-2">
            {Math.round(totalImpact.car)} km
          </div>
          <div className="text-gray-600">
            Équivalent en kilomètres en voiture
          </div>
        </div>
      </div>

      {/* Explications */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-xl font-semibold mb-6">Comment calculons-nous l'impact ?</h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">Production d'un nouveau téléphone</h3>
            <p className="text-gray-600">
              La production d'un nouveau smartphone génère entre 50 et 80 kg de CO₂ selon sa gamme.
              Cela inclut l'extraction des matériaux, la fabrication et le transport.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Reconditionnement</h3>
            <p className="text-gray-600">
              Le reconditionnement génère entre 5 et 12 kg de CO₂ selon le niveau d'intervention nécessaire
              (nettoyage, remplacement batterie, écran...).
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Transport</h3>
            <p className="text-gray-600">
              L'impact du transport varie entre 0.5 et 3.5 kg de CO₂ selon la distance
              (local, national, international).
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Durée de vie</h3>
            <p className="text-gray-600">
              Nous prenons en compte une durée de vie moyenne de 2.5 ans pour un téléphone neuf
              et 2 ans pour un téléphone reconditionné.
            </p>
          </div>

          <div className="pt-6 border-t">
            <h3 className="font-medium mb-2">Équivalences</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Un arbre absorbe environ 22 kg de CO₂ par an</li>
              <li>Une voiture émet environ 100g de CO₂ par kilomètre</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarbonCalculatorPage;
