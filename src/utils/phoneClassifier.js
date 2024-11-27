// Système de classification des téléphones
const SCORE_THRESHOLDS = {
  UltraPremium: 95, // Flagships dernière génération
  Premium: 85,      // Flagships récents
  Performant: 78,   // Milieu/haut de gamme
  Essentiel: 0      // Entrée/milieu de gamme
};

const MARGINS = {
  UltraPremium: 100,
  Premium: 80,
  Performant: 50,
  Essentiel: 30
};

const CURRENT_YEAR = new Date().getFullYear();

// Critères de notation
const PROCESSOR_SCORES = {
  // Processeurs Ultra Premium (98-100)
  'A17 Pro': 100,
  'Snapdragon 8 Gen 3': 100,
  'A16 Bionic': 98,
  
  // Processeurs Premium (92-97)
  'Snapdragon 8 Gen 2': 97,
  'A15 Bionic': 95,
  'Snapdragon 8+ Gen 1': 93,
  'Snapdragon 8 Gen 1': 92,
  
  // Processeurs Performant (80-91)
  'A14 Bionic': 90,  // iPhone 12
  'Google Tensor': 83,
  'Snapdragon 888': 82,
  'A13 Bionic': 80,
  'Snapdragon 778G': 78,
  
  // Processeurs Essentiel (<75)
  'Snapdragon 750G': 60,
  'Snapdragon 695': 55,
  'Snapdragon 680': 50,
  'A15 Bionic (SE)': 60  // Version SE de l'A15, moins puissante
};

// Bonus pour les appareils "flagship"
const FLAGSHIP_BONUS = {
  'iPhone 15 Pro Max': 5,
  'iPhone 15 Pro': 5,
  'Samsung Galaxy S24 Ultra': 5,
  'iPhone 14 Pro': 4,
  'iPhone 13': 3,
  'Galaxy S23': 3,
  'Pixel 8': 3,
  'iPhone 12': 5  // Bonus pour l'iPhone 12
};

const calculateScore = (phone) => {
  // Score basé sur l'âge (25%)
  const age = CURRENT_YEAR - phone.releaseYear;
  const ageScore = Math.max(0, 100 - (age * 10)); // Pénalité d'âge
  const weightedAgeScore = ageScore * 0.25;

  // Score basé sur le processeur (45%)
  const processorScore = PROCESSOR_SCORES[phone.processor] || 50;
  const weightedProcessorScore = processorScore * 0.45;

  // Score basé sur la RAM (20%)
  const ramScore = Math.min(100, (phone.ram / 6) * 100);
  const weightedRamScore = ramScore * 0.20;

  // Score basé sur l'appareil photo (10%)
  const cameraScore = Math.min(100, (phone.mainCamera / 24) * 100);
  const weightedCameraScore = cameraScore * 0.10;

  // Score total avec bonus flagship
  const baseScore = Math.round(
    weightedAgeScore +
    weightedProcessorScore +
    weightedRamScore +
    weightedCameraScore
  );

  // Prix maximum pour la catégorie Essentiel
  const ESSENTIAL_MAX_PRICE = 300;
  
  // Si le prix est dans la gamme Essentiel, on plafonne le score
  if (phone.purchasePrice <= ESSENTIAL_MAX_PRICE) {
    return Math.min(77, baseScore); // Force Essentiel pour les téléphones abordables
  }

  const flagshipBonus = FLAGSHIP_BONUS[phone.name] || 0;
  const totalScore = Math.min(100, baseScore + flagshipBonus);

  console.log(`Classification pour ${phone.name}:`, {
    age,
    ageScore,
    weightedAgeScore,
    processorScore,
    weightedProcessorScore,
    ramScore,
    weightedRamScore,
    cameraScore,
    weightedCameraScore,
    baseScore,
    flagshipBonus,
    totalScore
  });

  return totalScore;
};

const getBadgeStyles = (category) => {
  switch (category) {
    case 'UltraPremium':
      return {
        background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
        icon: '👑',
        description: 'Flagship dernière génération avec performances ultimes'
      };
    case 'Premium':
      return {
        background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
        icon: '✨',
        description: 'Flagship avec performances exceptionnelles'
      };
    case 'Performant':
      return {
        background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
        icon: '⚡',
        description: 'Excellent rapport qualité-prix'
      };
    case 'Essentiel':
      return {
        background: 'linear-gradient(135deg, #22c55e 0%, #84cc16 100%)',
        icon: '♻️',
        description: 'Choix écologique et économique'
      };
  }
};

const classifyPhone = (phone) => {
  const score = calculateScore(phone);
  
  let category;
  if (score >= SCORE_THRESHOLDS.UltraPremium) {
    category = 'UltraPremium';
  } else if (score >= SCORE_THRESHOLDS.Premium) {
    category = 'Premium';
  } else if (score >= SCORE_THRESHOLDS.Performant) {
    category = 'Performant';
  } else {
    category = 'Essentiel';
  }

  console.log(`Catégorie finale pour ${phone.name}:`, {
    score,
    category,
    thresholds: SCORE_THRESHOLDS
  });

  const badgeStyle = getBadgeStyles(category);

  return {
    category,
    score,
    badge: badgeStyle,
    margin: MARGINS[category]
  };
};

export { classifyPhone, MARGINS, getBadgeStyles };
