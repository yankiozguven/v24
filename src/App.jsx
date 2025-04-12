import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import HomePage from './pages/HomePage';
import SearchResults from './pages/SearchResults';
import RestaurantProfile from './pages/RestaurantProfile';
import Header from './components/Header';
import Newsletter from './components/Newsletter';
import HowItWorks from './pages/HowItWorks';
import { ScrollToTop } from './components/ScrollToTop';

function App() {
  useEffect(() => {
    // Mobil cihazlar için overflow-x ayarı
    const style = document.createElement('style');
    style.textContent = `
      @media (max-width: 768px) {
        html, body {
          overflow-x: hidden;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return (
    <div className="relative flex min-h-screen flex-col bg-[#fcf9f8]" style={{ fontFamily: 'Epilogue, "Noto Sans", sans-serif' }}>
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/restaurant/:id" element={<RestaurantProfile />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
        </Routes>
      </main>
      <Newsletter />
    </div>
  );
}

export default App; 