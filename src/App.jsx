import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { SearchProvider } from './contexts/SearchContext';
import { CartProvider } from './contexts/CartContext';
import { CompareProvider } from './contexts/CompareContext';
import { LoadingProvider, useLoading } from './contexts/LoadingContext';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import PhonesPage from './pages/PhonesPage';
import PhoneDetailPage from './pages/PhoneDetailPage';
import ComparePage from './pages/ComparePage';
import CartPage from './pages/CartPage';
import CarbonCalculatorPage from './pages/CarbonCalculatorPage';

// Composant pour gérer les transitions de page
function PageTransition({ children }) {
  const location = useLocation();
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    startLoading();
    const timer = setTimeout(() => {
      stopLoading();
    }, 500); // Durée de l'animation de chargement
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return children;
}

function App() {
  return (
    <Router>
      <LoadingProvider>
        <SearchProvider>
          <CartProvider>
            <CompareProvider>
              <div className="min-h-screen bg-gray-100">
                <Navbar />
                <PageTransition>
                  <main className="container mx-auto px-4 py-8">
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/phones" element={<PhonesPage />} />
                      <Route path="/phone/:id" element={<PhoneDetailPage />} />
                      <Route path="/compare" element={<ComparePage />} />
                      <Route path="/cart" element={<CartPage />} />
                      <Route path="/carbon-calculator" element={<CarbonCalculatorPage />} />
                    </Routes>
                  </main>
                </PageTransition>
              </div>
            </CompareProvider>
          </CartProvider>
        </SearchProvider>
      </LoadingProvider>
    </Router>
  );
}

export default App;
