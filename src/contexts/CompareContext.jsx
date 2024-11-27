import React, { createContext, useContext, useState } from 'react';

const CompareContext = createContext();

export function useCompare() {
  return useContext(CompareContext);
}

export function CompareProvider({ children }) {
  const [comparedPhones, setComparedPhones] = useState([]);

  const addToCompare = (phone) => {
    if (comparedPhones.length < 3 && !comparedPhones.find(p => p.id === phone.id)) {
      setComparedPhones([...comparedPhones, phone]);
    }
  };

  const removeFromCompare = (phoneId) => {
    setComparedPhones(comparedPhones.filter(phone => phone.id !== phoneId));
  };

  const clearCompare = () => {
    setComparedPhones([]);
  };

  const value = {
    comparedPhones,
    addToCompare,
    removeFromCompare,
    clearCompare
  };

  return (
    <CompareContext.Provider value={value}>
      {children}
    </CompareContext.Provider>
  );
}
