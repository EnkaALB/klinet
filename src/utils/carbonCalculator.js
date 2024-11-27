// Valeurs moyennes d'empreinte carbone en kg CO2e
const CARBON_VALUES = {
  // Production d'un nouveau téléphone
  newPhone: {
    premium: 80,
    midRange: 65,
    budget: 50
  },
  
  // Reconditionnement
  reconditioning: {
    basic: 5,      // Nettoyage et tests
    moderate: 8,   // Remplacement batterie
    extensive: 12  // Remplacement écran + batterie
  },
  
  // Transport
  transport: {
    local: 0.5,
    national: 1.2,
    international: 3.5
  }
};

// Durée de vie moyenne en années
const LIFESPAN = {
  newPhone: 2.5,
  reconditioned: 2
};

export function calculateCarbonSavings(phone, reconditioningLevel = 'moderate', transport = 'national') {
  // Déterminer la catégorie du téléphone
  let category = 'budget';
  if (phone.purchasePrice > 800) {
    category = 'premium';
  } else if (phone.purchasePrice > 400) {
    category = 'midRange';
  }

  // Calcul pour un nouveau téléphone
  const newPhoneEmissions = CARBON_VALUES.newPhone[category];
  const newPhoneYearlyEmissions = newPhoneEmissions / LIFESPAN.newPhone;

  // Calcul pour le téléphone reconditionné
  const reconditioningEmissions = CARBON_VALUES.reconditioning[reconditioningLevel];
  const transportEmissions = CARBON_VALUES.transport[transport];
  const totalReconditioningEmissions = reconditioningEmissions + transportEmissions;
  const reconditionedYearlyEmissions = totalReconditioningEmissions / LIFESPAN.reconditioned;

  // Calcul des économies
  const yearlyEmissionsSaved = newPhoneYearlyEmissions - reconditionedYearlyEmissions;
  const totalEmissionsSaved = newPhoneEmissions - totalReconditioningEmissions;

  // Équivalents concrets
  const treeDays = Math.round(totalEmissionsSaved * 365 / 22); // Un arbre absorbe environ 22kg de CO2 par an
  const carKm = Math.round(totalEmissionsSaved * 10); // 100g CO2 par km en moyenne

  return {
    yearlyEmissionsSaved,
    totalEmissionsSaved,
    treeDays,
    carKm,
    details: {
      newPhone: {
        total: newPhoneEmissions,
        yearly: newPhoneYearlyEmissions
      },
      reconditioned: {
        total: totalReconditioningEmissions,
        yearly: reconditionedYearlyEmissions,
        breakdown: {
          reconditioning: reconditioningEmissions,
          transport: transportEmissions
        }
      }
    }
  };
}
