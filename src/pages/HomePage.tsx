import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { VercelV0Chat } from '../components/ui/v0-ai-chat';
import { Typewriter } from '../components/ui/typewriter-text';

function HomePage() {
  const [showScrollAnimation, setShowScrollAnimation] = useState(true);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [50, 0]);
  
  // Ok için fadeout efekti
  const arrowOpacity = useTransform(
    scrollYProgress,
    [0, 0.3], // İlk %30'luk kaydırmada
    [1, 0]    // Tamamen görünürden tamamen saydama
  );

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= window.innerHeight) {
        setShowScrollAnimation(false);
      } else {
        setShowScrollAnimation(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };


  const trendingSearches = [
    'En iyi restoran',
    'Yakındaki et lokantası',
    'Brunch mekanı',
    'İtalyan yemeği',
    'İki kişilik akşam yemeği',
    'Vegan seçenekleri',
    'Fast food',
    'Açık havada oturma',
    'Gece geç saatlerde yemek',
    'Doğum günü yemeği'
  ];

  const restaurantImages = [
    'https://i.imgur.com/X11ea7i.png?w=800&auto=format&fit=crop&q=80',
    'https://i.imgur.com/lbRMWYK.png?w=800&auto=format&fit=crop&q=80',
    'https://i.imgur.com/9pAxdvR.png?w=800&auto=format&fit=crop&q=80',
    'https://i.imgur.com/ciZe8qG.png?w=800&auto=format&fit=crop&q=80',
    'https://i.imgur.com/61AvWgp.png?w=800&auto=format&fit=crop&q=80'
  ];

  return (
    <div className="min-h-screen">
      <div className="h-screen relative">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-3xl mx-2 sm:mx-4 md:mx-8 lg:mx-16 overflow-hidden border-[4px] border-black"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute w-full h-full object-cover"
          >
            <source src="https://ik.imagekit.io/z0tj7llxs/Timeline%201.mp4?updatedAt=1743802386196" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black bg-opacity-15"></div>
          <div className="flex flex-col items-center justify-center h-full gap-3 sm:gap-6 p-2 sm:p-4 max-w-[960px] mx-auto relative z-10">
            <div className="flex flex-col items-center gap-1 -mt-[180px] sm:-mt-[215px] text-center">
              <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                <h2 className="text-[28px] sm:text-[38px] font-semibold text-white font-urbanist">Yapay zeka</h2>
                <span className="text-[28px] sm:text-[38px] font-semibold text-white font-urbanist">destekli</span>
                <Typewriter 
                  text={["restoran", "kafe", "lokanta", "kahve", "patisserie", "bistro"]} 
                  className="text-[28px] sm:text-[38px] font-semibold text-[#e24c00] font-urbanist"
                  speed={100}
                  deleteSpeed={50}
                  delay={1500}
                  loop={true}
                />
              </div>
              <h2 className="text-[28px] sm:text-[38px] font-semibold text-white font-urbanist">öneri platformu</h2>
              <p className="text-[16px] sm:text-[18px] font-thin italic text-white font-urbanist mt-[1px]">"Binlerce yorumu senin yerine okuduk."</p>
            </div>
          </div>
        </div>
        
        <motion.div 
          style={{ opacity: arrowOpacity }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce z-50 bg-orange-500 rounded-full p-2 shadow-lg"
          onClick={scrollToContent}
        >
          <ChevronDown size={24} className="text-white" />
        </motion.div>
      </div>

      <motion.div 
        style={{ opacity, y }}
        className="px-4 sm:px-8 md:px-16 lg:px-40 py-5"
      >
        <div className="flex flex-col max-w-[960px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full py-8"
          >
            <VercelV0Chat />
          </motion.div>

          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[#1b100e] tracking-light text-xl sm:text-2xl font-bold leading-tight px-2 sm:px-4 text-left pb-2 pt-5"
          >
            Popüler aramalar
          </motion.h3>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex gap-2 sm:gap-3 p-2 sm:p-3 flex-wrap pr-4"
          >
            {trendingSearches.map((search, index) => (
              <div
                key={index}
                className="flex h-7 sm:h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#fdf2e4] px-3 sm:px-4 cursor-pointer hover:bg-[#e7d4d0] transition-colors"
                onClick={() => navigate(`/search?q=${encodeURIComponent(search)}`)}
              >
                <p className="text-[#1b100e] text-xs sm:text-sm font-medium leading-normal">{search}</p>
              </div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 sm:gap-2 md:gap-3 p-2 sm:p-4"
          >
            {restaurantImages.slice(0, 3).map((image, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
                className="flex flex-col gap-2"
              >
                <div
                  className="w-full bg-center bg-no-repeat aspect-[4/3] sm:aspect-video bg-cover rounded-md sm:rounded-xl"
                  style={{ backgroundImage: `url("${image}")` }}
                />
              </motion.div>
            ))}
            
            <div className="md:hidden flex justify-center items-center col-span-3 mt-2">
              <div className="w-1/3 mx-2">
                <motion.div 
                  key="mobile-image-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <div
                    className="w-full bg-center bg-no-repeat aspect-[4/3] bg-cover rounded-md"
                    style={{ backgroundImage: `url("${restaurantImages[3]}")` }}
                  />
                </motion.div>
              </div>
              
              <div className="w-1/3 mx-2">
                <motion.div 
                  key="mobile-image-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <div
                    className="w-full bg-center bg-no-repeat aspect-[4/3] bg-cover rounded-md"
                    style={{ backgroundImage: `url("${restaurantImages[4]}")` }}
                  />
                </motion.div>
              </div>
            </div>
            
            {restaurantImages.slice(3, 5).map((image, index) => (
              <motion.div 
                key={`desktop-${index + 3}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 * (index + 3) }}
                className="hidden md:flex flex-col gap-2"
              >
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                  style={{ backgroundImage: `url("${image}")` }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default HomePage;
