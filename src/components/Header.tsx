import { Link } from 'react-router-dom';
import { HelpCircle } from "lucide-react";
import { ExpandableTabs } from "./ui/expandable-tabs";
import type { TabItem } from "./ui/expandable-tabs";
import { useState, useEffect } from 'react';

function Header() {
  const [isNarrowScreen, setIsNarrowScreen] = useState(false);

  const tabs: TabItem[] = [
    { title: "Nasıl Çalışır?", icon: HelpCircle, href: "/how-it-works" },
  ];

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsNarrowScreen(window.innerWidth < 360);
    };
    
    // İlk render için kontrol et
    checkScreenWidth();
    
    // Ekran boyutu değiştiğinde kontrol et
    window.addEventListener('resize', checkScreenWidth);
    
    // Temizleme işlemi
    return () => window.removeEventListener('resize', checkScreenWidth);
  }, []);

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#fcf9f8] bg-[#fcf9f8] px-4 sm:px-6 md:px-10 py-2 sm:py-3">
      <Link to="/" className="flex items-center gap-2 sm:gap-4 text-[#1b100e]">
        <div className="size-3 sm:size-4">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z"
              fill="currentColor"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <h2 className="text-[#1b100e] text-base sm:text-lg font-bold leading-tight tracking-[-0.015em]">DineBot</h2>
      </Link>
      
      <div className="flex items-center">
        {/* "Nasıl Çalışır" Butonu */}
        <Link 
          to="/how-it-works"
          className="flex items-center gap-1.5 text-xs sm:text-sm font-medium bg-[#fcf9f8] text-[#1b100e] hover:bg-[#f96815] hover:text-white transition-colors py-1.5 px-2.5 rounded-lg border border-[#f96815]"
        >
          <HelpCircle size={14} className="hidden xs:block" />
          <span>{isNarrowScreen ? "Yardım" : "Nasıl Çalışır?"}</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
