import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import * as Tabs from '@radix-ui/react-tabs';
// @ts-ignore
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { Instagram, Globe, Award, ChevronLeft, ChevronRight, MapPin, Youtube, Search, Heart, UtensilsCrossed, Wine, Mountain, Coffee, Music, Star, Trophy, ListOrdered, Users, Share, MapPinned, MessageSquare, BarChart3, ArrowUp, Clock, ChefHat, BookOpen, Utensils } from 'lucide-react';
import { Dialog, DialogContent } from '@radix-ui/react-dialog';
import SatisfactionMeter from '../components/SatisfactionMeter';

interface Restaurant {
  id: number;
  name: string;
  images: string[];
  insiderTips: string[];
  menuItems: {
    name: string;
    image: string;
    description: string;
  }[];
  timeline: {
    date: string;
    event: string;
    type: 'social' | 'news' | 'milestone';
  }[];
  flavorProfile: {
    spiciness: number;
    sweetness: number;
    umami: number;
    acidity: number;
    richness: number;
  };
  badges: {
    icon: string;
    text: string;
    color: string;
  }[];
  whyYouCantMissIt: {
    title: string;
    description: string;
    icon: string;
  }[];
  prosAndCons: {
    pros: {
      text: string;
      platforms: ('youtube' | 'google' | 'tripadvisor' | 'instagram')[];
    }[];
    cons: {
      text: string;
      platforms: ('youtube' | 'google' | 'tripadvisor' | 'instagram')[];
    }[];
  };
  expertReviews: {
    name: string;
    title: string;
    image: string;
    comment: string;
    rating: number;
    date: string;
  }[];
}

function RestaurantProfile() {
  useParams();
  const [] = useState('');
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' });
  const [, setSelectedIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [, setIsLastImage] = useState(false);
  const [, setIsFirstImage] = useState(true);
  const [] = useState(false);
  const [activeTab, setActiveTab] = useState('reviews');
  const [activeSubTab, setActiveSubTab] = useState('expert-reviews');
  const [] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [ratingValue, setRatingValue] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<{name: string; image: string; description: string} | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  
  // images değişkeninin güncel değerine referans tutacak ref
  const imagesRef = useRef<string[]>([]);
  
  // images değiştiğinde ref'i de güncelle
  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  // Mock data - in a real app, this would come from an API
  const restaurant: Restaurant = {
    id: 1,
    name: "Le Petit Bistro",
    images: [
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&auto=format&fit=crop&q=80"
    ],
    insiderTips: [
      "Ask for the secret wine cellar tour - available only on weekends",
      "The chef's grandmother still makes the chocolate soufflé every morning",
      "Table 7 has the best view of the sunset over the city",
      "Wednesday nights feature live jazz from local artists"
    ],
    menuItems: [
      {
        name: "Coq au Vin",
        image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&auto=format&fit=crop&q=80",
        description: "Traditional French chicken braised in wine, lardons, mushrooms"
      }
    ],
    timeline: [
      {
        date: "2025-03",
        event: "Featured in Food & Wine Magazine's 'Top 10 French Restaurants'",
        type: "news"
      },
      {
        date: "2024-12",
        event: "Reached 100,000 Instagram followers",
        type: "social"
      },
      {
        date: "2024-09",
        event: "Michelin Star Awarded",
        type: "milestone"
      }
    ],
    flavorProfile: {
      spiciness: 2,
      sweetness: 3,
      umami: 4,
      acidity: 3,
      richness: 5
    },
    badges: [
      { icon: "🌟", text: "Michelin Starred", color: "bg-yellow-100" },
      { icon: "🍷", text: "Wine Excellence", color: "bg-purple-100" },
      { icon: "💑", text: "Perfect for Dates", color: "bg-pink-100" },
      { icon: "📅", text: "Reservation Required", color: "bg-blue-100" }
    ],
    whyYouCantMissIt: [
      {
        title: "Michelin Starred Excellence",
        description: "Awarded for exceptional culinary artistry and service",
        icon: "🌟"
      },
      {
        title: "Historic Wine Cellar",
        description: "Home to over 500 rare vintages from around the world",
        icon: "🍷"
      },
      {
        title: "Chef's Table Experience",
        description: "Intimate dining with front-row seats to culinary magic",
        icon: "👨‍🍳"
      },
      {
        title: "Secret Garden Terrace",
        description: "Hidden outdoor oasis with panoramic city views",
        icon: "🌿"
      }
    ],
    prosAndCons: {
      pros: [
        {
          text: "Personel son derece profesyonel ve misafirperver. Özellikle şef masası deneyiminde sunulan detaylı yemek açıklamaları ve önerileri ile unutulmaz bir deneyim yaşatıyorlar.",
          platforms: ['google', 'tripadvisor', 'instagram']
        },
        {
          text: "Fransız mutfağının otantik lezzetlerini modern bir yorumla sunuyorlar. Özellikle Coq au Vin ve Duck Confit gibi klasiklerin sunumu göz alıcı.",
          platforms: ['youtube', 'instagram', 'tripadvisor']
        },
        {
          text: "Şarap listesi oldukça etkileyici. 500'den fazla etiket arasından seçim yapabilirsiniz. Şarap şefi de çok bilgili ve doğru eşleştirmeler konusunda yardımcı oluyor.",
          platforms: ['google', 'tripadvisor']
        },
        {
          text: "Mekanın atmosferi gerçekten büyüleyici. Özellikle akşam saatlerinde mum ışıkları ve soft jazz müziği ile romantik bir akşam yemeği için ideal.",
          platforms: ['instagram', 'google']
        }
      ],
      cons: [
        {
          text: "Fiyat aralığı oldukça yüksek. Ana yemekler 300-500 TL arasında değişiyor. Şarap seçenekleri de premium segmentte.",
          platforms: ['google', 'tripadvisor']
        },
        {
          text: "Hafta sonları ve özel günlerde rezervasyon yapmak oldukça zor. En az 2-3 hafta öncesinden rezervasyon yapmanızı öneririz.",
          platforms: ['tripadvisor', 'google', 'instagram']
        },
        {
          text: "Mekan merkezi bir konumda olduğu için park yeri bulmak sorun olabiliyor. En yakın otopark 5 dakika yürüme mesafesinde.",
          platforms: ['google']
        },
        {
          text: "Porsiyonlar Fransız mutfağı geleneğine uygun olarak küçük. Aç karnına gidip, birden fazla yemek sipariş etmenizi öneririz.",
          platforms: ['tripadvisor', 'youtube']
        }
      ]
    },
    expertReviews: [
      {
        name: "Vedat Milor",
        title: "Gastronomi Uzmanı",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
        comment: "Le Petit Bistro, Fransız mutfağının inceliklerini modern bir yorumla sunan nadir mekanlardan. Özellikle şef masası deneyimi, gastronomi tutkunları için unutulmaz bir deneyim.",
        rating: 5,
        date: "2023-12-15"
      },
      {
        name: "Refika Birgül",
        title: "Yemek Yazarı ve TV Programcısı",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=80",
        comment: "Mekanın atmosferi ve sunulan lezzetler gerçekten etkileyici. Fransız mutfağının klasiklerini modern bir yorumla sunmaları takdire şayan. Şarap listesi de oldukça zengin.",
        rating: 4,
        date: "2023-11-20"
      },
      {
        name: "Mehmet Yaşin",
        title: "Gastronomi Yazarı",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80",
        comment: "İstanbul'da Fransız mutfağının en iyi örneklerinden biri. Özellikle şef masası deneyimi, gastronomi tutkunları için kaçırılmaması gereken bir fırsat.",
        rating: 5,
        date: "2023-10-05"
      }
    ]
  };

  useEffect(() => {
    setImages(restaurant.images);
  }, []);

  const handlePrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
      const currentIndex = emblaApi.selectedScrollSnap();
      setSelectedIndex(currentIndex);
      setIsFirstImage(currentIndex === 0);
      setIsLastImage(currentIndex === imagesRef.current.length - 1);
    }
  }, [emblaApi]);

  const handleNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
      const currentIndex = emblaApi.selectedScrollSnap();
      setSelectedIndex(currentIndex);
      setIsFirstImage(currentIndex === 0);
      setIsLastImage(currentIndex === imagesRef.current.length - 1);
    }
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      const onSelectHandler = () => {
        const currentIndex = emblaApi.selectedScrollSnap();
        setSelectedIndex(currentIndex);
        setIsFirstImage(currentIndex === 0);
        setIsLastImage(currentIndex === imagesRef.current.length - 1);
      };

      emblaApi.on('select', onSelectHandler);

      // Cleanup
      return () => {
        emblaApi.off('select', onSelectHandler);
      };
    }
  }, [emblaApi]);

  useEffect(() => {
    setIsFirstImage(true); // Initialize to show only next arrow
    setIsLastImage(imagesRef.current.length <= 1); // Hide next arrow if only one image
  }, []);

  const badges = [
    {
      id: "romantic",
      title: "Romantik",
      description: "Özel günleriniz için mum ışığında akşam yemeği, özel dekorasyonlu masalar ve unutulmaz anlar.",
      color: "bg-[#fed8b1]",
      textColor: "text-black",
      borderColor: "border-[#f96815]",
      icon: Heart
    },
    {
      id: "fine-dining",
      title: "Fine Dining",
      description: "Michelin yıldızlı şeflerimizin hazırladığı özel menüler ve premium servis deneyimi.",
      color: "bg-[#fed8b1]",
      textColor: "text-black",
      borderColor: "border-[#f96815]",
      icon: UtensilsCrossed
    },
    {
      id: "wine",
      title: "Şarap Menüsü",
      description: "500'den fazla yerel ve dünya şaraplarından oluşan özenle seçilmiş koleksiyon.",
      color: "bg-[#fed8b1]",
      textColor: "text-black",
      borderColor: "border-[#f96815]",
      icon: Wine
    },
    {
      id: "view",
      title: "Manzaralı",
      description: "Boğaz manzarasına karşı eşsiz bir yemek deneyimi ve muhteşem gün batımı.",
      color: "bg-[#fed8b1]",
      textColor: "text-black",
      borderColor: "border-[#f96815]",
      icon: Mountain
    },
    {
      id: "terrace",
      title: "Teras",
      description: "Açık havada yemek keyfi, özel tasarlanmış bahçe ve ferah ortam.",
      color: "bg-[#fed8b1]",
      textColor: "text-black",
      borderColor: "border-[#f96815]",
      icon: Coffee
    },
    {
      id: "live-music",
      title: "Canlı Müzik",
      description: "Her akşam canlı jazz performansları ve seçkin müzisyenlerden özel dinletiler.",
      color: "bg-[#fed8b1]",
      textColor: "text-black",
      borderColor: "border-[#f96815]",
      icon: Music
    }
  ];

  // Örnek menü veri seti - gerçek uygulamada API'den gelecektir
  const menuItems = [
    {
      name: "Coq au Vin",
      image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&auto=format&fit=crop&q=80",
      description: "Şarapta pişirilmiş tavuk, mantar ve pastırma ile servis edilir."
    },
    {
      name: "Boeuf Bourguignon",
      image: "https://images.unsplash.com/photo-1534766555764-ce878a5e3a2b?w=800&auto=format&fit=crop&q=80",
      description: "Kırmızı şarapta pişirilmiş dana eti, havuç, soğan ve mantar ile."
    },
    {
      name: "Ratatouille",
      image: "https://images.unsplash.com/photo-1572453800999-e8d2d0d0d4d7?w=800&auto=format&fit=crop&q=80",
      description: "Fırınlanmış sebze yemeği, patlıcan, domates ve kabak ile hazırlanır."
    },
    {
      name: "Crème Brûlée",
      image: "https://images.unsplash.com/photo-1488477304112-4944851de03d?w=800&auto=format&fit=crop&q=80",
      description: "Karamelize şekerle kaplı vanilya kreması."
    },
    {
      name: "Escargot",
      image: "https://images.unsplash.com/photo-1600280323807-a4bbef32b1c1?w=800&auto=format&fit=crop&q=80",
      description: "Sarımsaklı tereyağı ile pişirilmiş salyangoz."
    }
  ];

  // Arama işlevi
  const handleSearch = () => {
    if (searchQuery.trim() === "") return;
    
    setIsSearching(true);
    
    // Gerçek uygulamada burası bir API çağrısı olacaktır
    setTimeout(() => {
      const result = menuItems.find(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setSearchResults(result || null);
      setIsSearching(false);
    }, 800); // Arama deneyimini simüle etmek için kısa bir gecikme
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gradient-to-b from-white to-gray-50"
    >
      {/* Restaurant Info Header */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800">{restaurant.name}</h1>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#f96815]" />
                  <span className="text-sm text-gray-600">İstanbul, Türkiye</span>
                </div>
                <p className="text-lg text-gray-600">Steakhouse & Fine Dining</p>
              </div>
              
              <div className="flex justify-start">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-[#f96815] text-white px-3 py-2 md:px-6 md:py-3 rounded-full font-medium cursor-pointer inline-flex items-center gap-1.5 md:gap-2 shadow-md"
                >
                  <Clock className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-sm md:text-base whitespace-nowrap">Rezervasyon Yap</span>
                </motion.div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 mb-3 w-full">
                <h3 className="text-lg font-semibold text-gray-800">Mekânın DNA'sı</h3>
                <div className="relative group">
                  <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center cursor-help">
                    <span className="text-xs font-bold text-gray-600">i</span>
                  </div>
                  <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white border border-neutral-200 p-3 rounded-lg shadow-lg z-10">
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-white border-t border-l border-neutral-200"></div>
                    <p className="text-xs text-neutral-600 leading-relaxed relative z-10">Bir mekanı tanımanın en iyi yolu: Onu oluşturan 6 temel parça.</p>
                  </div>
                </div>
              </div>
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className="relative group cursor-default"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`${badge.color} ${badge.textColor} ${badge.borderColor} border px-2 py-1.5 md:px-4 md:py-2.5 rounded-lg md:rounded-2xl font-medium flex items-center gap-1.5 md:gap-2.5 shadow-sm hover:shadow-md transition-all duration-200`}
                  >
                    {badge.icon && <badge.icon size={12} className="text-[#f96815] md:w-4 md:h-4" />}
                    <span className="text-xs md:text-[15px] truncate max-w-[80px] md:max-w-none">{badge.title}</span>
                  </motion.div>
                  <div
                    className={`invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white border border-neutral-200 p-4 rounded-lg shadow-lg z-10`}
                  >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-white border-t border-l border-neutral-200"></div>
                    <p className="text-sm text-neutral-600 leading-relaxed relative z-10">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Gallery Carousel */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="relative overflow-hidden rounded-xl h-[400px] shadow-lg"
        >
          <div className="embla h-full" ref={emblaRef}>
            <div className="embla__container h-full flex">
              {images.map((image, index) => (
                <div 
                  key={index} 
                  className="embla__slide flex-[0_0_100%] min-w-0 relative h-full"
                  style={{ flex: '0 0 100%' }}
                >
                  <img
                    src={image}
                    alt={`${restaurant.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-all duration-200"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-all duration-200"
          >
            <ChevronRight size={24} />
          </button>
        </motion.div>
      </div>

      {/* Tabs Section */}
      <div className="container mx-auto px-4 py-8">
        <Tabs.Root value={activeTab} onValueChange={setActiveTab} className="w-full">
          <Tabs.List className="flex border-b border-gray-200 mb-8" aria-label="Restoran Bilgileri">
            <Tabs.Trigger 
              value="reviews" 
              asChild
            >
              <div 
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors cursor-pointer hover:text-[#f96815] ${
                  activeTab === 'reviews' 
                    ? 'border-[#f96815] text-[#f96815]' 
                    : 'border-transparent text-gray-500 hover:text-[#f96815] hover:border-[#f96815]'
                }`}
              >
                Yapay Zeka Analizi
              </div>
            </Tabs.Trigger>
            <Tabs.Trigger 
              value="insider" 
              asChild
            >
              <div 
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors cursor-pointer hover:text-[#f96815] ${
                  activeTab === 'insider' 
                    ? 'border-[#f96815] text-[#f96815]' 
                    : 'border-transparent text-gray-500 hover:text-[#f96815] hover:border-[#f96815]'
                }`}
              >
                İçeriden Bilgi
              </div>
            </Tabs.Trigger>
            <Tabs.Trigger 
              value="timeline" 
              asChild
            >
              <div 
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors cursor-pointer hover:text-[#f96815] ${
                  activeTab === 'timeline' 
                    ? 'border-[#f96815] text-[#f96815]' 
                    : 'border-transparent text-gray-500 hover:text-[#f96815] hover:border-[#f96815]'
                }`}
              >
                Spot Işığı
              </div>
            </Tabs.Trigger>
            <Tabs.Trigger 
              value="badges" 
              asChild
            >
              <div 
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors cursor-pointer hover:text-[#f96815] ${
                  activeTab === 'badges' 
                    ? 'border-[#f96815] text-[#f96815]' 
                    : 'border-transparent text-gray-500 hover:text-[#f96815] hover:border-[#f96815]'
                }`}
              >
                Rozetler
              </div>
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="reviews" className="focus:outline-none">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
              <div className="p-4 border-b border-gray-100">
                <Tabs.Root value={activeSubTab} onValueChange={setActiveSubTab} className="w-full">
                  <Tabs.List className="flex border-b border-gray-200" aria-label="Yapay Zeka Analizi Alt Sekmeleri">
                    <Tabs.Trigger 
                      value="expert-reviews" 
                      asChild
                    >
                      <div 
                        className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors cursor-pointer hover:text-[#f96815] ${
                          activeSubTab === 'expert-reviews' 
                            ? 'border-[#f96815] text-[#f96815]' 
                            : 'border-transparent text-gray-500 hover:text-[#f96815] hover:border-[#f96815]'
                        }`}
                      >
                        Uzman Yorumu
                      </div>
                    </Tabs.Trigger>
                    <Tabs.Trigger 
                      value="highlights" 
                      asChild
                    >
                      <div 
                        className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors cursor-pointer hover:text-[#f96815] ${
                          activeSubTab === 'highlights' 
                            ? 'border-[#f96815] text-[#f96815]' 
                            : 'border-transparent text-gray-500 hover:text-[#f96815] hover:border-[#f96815]'
                        }`}
                      >
                        Öne Çıkanlar
                      </div>
                    </Tabs.Trigger>
                    <Tabs.Trigger 
                      value="cautions" 
                      asChild
                    >
                      <div 
                        className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors cursor-pointer hover:text-[#f96815] ${
                          activeSubTab === 'cautions' 
                            ? 'border-[#f96815] text-[#f96815]' 
                            : 'border-transparent text-gray-500 hover:text-[#f96815] hover:border-[#f96815]'
                        }`}
                      >
                        Dikkat Edilmesi Gerekenler
                      </div>
                    </Tabs.Trigger>
                  </Tabs.List>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                    {/* İçerik */}
                    <div className="md:col-span-2">
                      <Tabs.Content value="expert-reviews" className="focus:outline-none">
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                          <h3 className="text-xl font-bold mb-4">Uzman Yorumları</h3>
                          <div className="space-y-6">
                            {/* Vedat Milor */}
                            <div className="flex gap-4 items-start">
                              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#fad6a5] flex items-center justify-center">
                                <img
                                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80"
                                  alt="Vedat Milor"
                                  className="w-full h-full object-cover rounded-full"
                                />
                              </div>
                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <h4 className="font-medium">Vedat Milor</h4>
                                  <div className="flex items-center gap-1 bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full text-xs">
                                    <Award size={12} />
                                    <span>Gurme</span>
                                  </div>
                                </div>
                                <p className="text-gray-700 leading-relaxed">
                                  Le Petit Bistro, Fransız mutfağının inceliklerini modern bir yorumla sunan nadir mekanlardan. Özellikle şef masası deneyimi, gastronomi tutkunları için unutulmaz bir deneyim.
                                  <a href="#expert-ref-1" className="ml-1 text-xs bg-gray-100 rounded-full inline-flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors px-1.5 align-top">[1]</a>
                                </p>
                              </div>
                            </div>

                            {/* Mehmet Yaşin */}
                            <div className="flex gap-4 items-start">
                              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#fad6a5] flex items-center justify-center">
                                <img
                                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80"
                                  alt="Mehmet Yaşin"
                                  className="w-full h-full object-cover rounded-full"
                                />
                              </div>
                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <h4 className="font-medium">Mehmet Yaşin</h4>
                                  <div className="flex items-center gap-1 bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full text-xs">
                                    <Award size={12} />
                                    <span>Gurme</span>
                                  </div>
                                </div>
                                <p className="text-gray-700 leading-relaxed">
                                  İstanbul'da Fransız mutfağının en iyi örneklerinden biri. Özellikle şef masası deneyimi, gastronomi tutkunları için kaçırılmaması gereken bir fırsat.
                                  <a href="#expert-ref-2" className="ml-1 text-xs bg-gray-100 rounded-full inline-flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors px-1.5 align-top">[2]</a>
                                </p>
                              </div>
                            </div>

                            {/* Ayaküstü Lezzetler */}
                            <div className="flex gap-4 items-start">
                              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#fad6a5] flex items-center justify-center">
                                <img
                                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=800&auto=format&fit=crop&q=80"
                                  alt="Ayaküstü Lezzetler"
                                  className="w-full h-full object-cover rounded-full"
                                />
                              </div>
                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <h4 className="font-medium">Ayaküstü Lezzetler</h4>
                                  <div className="flex items-center gap-1 bg-red-100 text-red-800 px-2 py-0.5 rounded-full text-xs">
                                    <Youtube size={12} />
                                    <span>Youtuber</span>
                                  </div>
                                </div>
                                <p className="text-gray-700 leading-relaxed">
                                  Mekanın ambiyansı oldukça etkileyici. Fransız mutfağı deneyimlemek isteyenler için ideal bir seçim. Porsiyon boyutları biraz küçük olsa da sunulan lezzetler ve servis kalitesi oldukça tatmin edici.
                                  <a href="#expert-ref-3" className="ml-1 text-xs bg-gray-100 rounded-full inline-flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors px-1.5 align-top">[3]</a>
                                </p>
                              </div>
                            </div>

                            {/* AdetaBirGurme */}
                            <div className="flex gap-4 items-start">
                              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#fad6a5] flex items-center justify-center">
                                <img
                                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80"
                                  alt="AdetaBirGurme"
                                  className="w-full h-full object-cover rounded-full"
                                />
                              </div>
                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <h4 className="font-medium">AdetaBirGurme</h4>
                                  <div className="flex items-center gap-1 bg-pink-100 text-pink-800 px-2 py-0.5 rounded-full text-xs">
                                    <Instagram size={12} />
                                    <span>Instagram</span>
                                  </div>
                                </div>
                                <p className="text-gray-700 leading-relaxed">
                                  Mekanın fotoğrafik açıdan sunduğu imkanlar mükemmel! Yemeklerin sunumları göz kamaştırıcı ve her bir tabak adeta bir sanat eseri. Fiyatlar biraz tuzlu olsa da, özel günler için kesinlikle değer.
                                  <a href="#expert-ref-4" className="ml-1 text-xs bg-gray-100 rounded-full inline-flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors px-1.5 align-top">[4]</a>
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Referanslar Akordiyonu */}
                          <div className="mt-8 border-t border-gray-100 pt-6">
                            <details className="group" id="expert-references">
                              <summary className="flex justify-between items-center cursor-pointer list-none">
                                <h5 className="text-lg font-medium text-gray-800">Referanslar</h5>
                                <span className="transition group-open:rotate-180">
                                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                  </svg>
                                </span>
                              </summary>
                              <div className="mt-4 space-y-3">
                                <div id="expert-ref-1" className="p-3 bg-gray-50 rounded-lg">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-gray-200 text-gray-800 rounded-full w-5 h-5 inline-flex items-center justify-center text-xs">1</span>
                                    <span className="font-medium">Vedat Milor</span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <a href="https://example.com/vedat-milor-restaurant-review" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1 text-sm">
                                      <Globe size={14} />
                                      <span>Blog Yazısı: "İstanbul'un Fransız İncileri"</span>
                                    </a>
                                  </div>
                                </div>
                                
                                <div id="expert-ref-2" className="p-3 bg-gray-50 rounded-lg">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-gray-200 text-gray-800 rounded-full w-5 h-5 inline-flex items-center justify-center text-xs">2</span>
                                    <span className="font-medium">Mehmet Yaşin</span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <a href="https://example.com/mehmet-yasin-tv-show" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1 text-sm">
                                      <Youtube size={14} />
                                      <span>TV Programı: "Lezzet Durakları - Bölüm 45"</span>
                                    </a>
                                  </div>
                                </div>
                                
                                <div id="expert-ref-3" className="p-3 bg-gray-50 rounded-lg">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-gray-200 text-gray-800 rounded-full w-5 h-5 inline-flex items-center justify-center text-xs">3</span>
                                    <span className="font-medium">Ayaküstü Lezzetler</span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <a href="https://youtube.com/watch?v=example" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline flex items-center gap-1 text-sm">
                                      <Youtube size={14} />
                                      <span>Video: "İstanbul'un En İyi 5 Fransız Restoranı"</span>
                                    </a>
                                  </div>
                                </div>
                                
                                <div id="expert-ref-4" className="p-3 bg-gray-50 rounded-lg">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-gray-200 text-gray-800 rounded-full w-5 h-5 inline-flex items-center justify-center text-xs">4</span>
                                    <span className="font-medium">AdetaBirGurme</span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <a href="https://instagram.com/p/example" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline flex items-center gap-1 text-sm">
                                      <Instagram size={14} />
                                      <span>Instagram Gönderisi: "Hafta Sonu Kaçamakları #12"</span>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </details>
                          </div>
                        </div>
                      </Tabs.Content>

                      <Tabs.Content value="highlights" className="focus:outline-none">
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                          <h3 className="text-xl font-bold mb-4">Öne Çıkanlar</h3>
                          <p className="text-gray-600 mb-6">Mekanın en iyi özellikleri ve öne çıkanları burada bulabilirsiniz.</p>
                          
                          <div className="space-y-6">
                            {restaurant.prosAndCons.pros.map((pro, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-green-50 rounded-xl p-4"
                              >
                                <div className="flex items-center gap-2 mb-3">
                                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                    <span className="text-green-600 text-xl">✓</span>
                                  </div>
                                  <h4 className="text-lg font-semibold text-green-700">Öne Çıkan Özellik {index + 1}</h4>
                                </div>
                                <p className="text-green-800 mb-3">
                                  {pro.text}
                                  <a href={`#highlights-ref-${index + 1}`} className="ml-1 text-xs bg-gray-100 rounded-full inline-flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors px-1.5 align-top">[{index + 1}]</a>
                                </p>
                                <div className="flex items-center gap-2 flex-wrap">
                                  {pro.platforms.map((platform, pIndex) => (
                                    <div
                                      key={pIndex}
                                      className="flex items-center gap-1 text-xs bg-white px-2 py-1 rounded-full"
                                    >
                                      {platform === 'youtube' && (
                                        <>
                                          <Youtube size={14} className="text-red-600" />
                                          <span className="text-gray-600">Youtube</span>
                                        </>
                                      )}
                                      {platform === 'google' && (
                                        <>
                                          <Globe size={14} className="text-blue-600" />
                                          <span className="text-gray-600">Google</span>
                                        </>
                                      )}
                                      {platform === 'tripadvisor' && (
                                        <>
                                          <Award size={14} className="text-green-600" />
                                          <span className="text-gray-600">Tripadvisor</span>
                                        </>
                                      )}
                                      {platform === 'instagram' && (
                                        <>
                                          <Instagram size={14} className="text-pink-600" />
                                          <span className="text-gray-600">Instagram</span>
                                        </>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            ))}
                          </div>

                          {/* Referanslar Akordiyonu */}
                          <div className="mt-8 border-t border-gray-100 pt-6">
                            <details className="group" id="highlights-references">
                              <summary className="flex justify-between items-center cursor-pointer list-none">
                                <h5 className="text-lg font-medium text-gray-800">Referanslar</h5>
                                <span className="transition group-open:rotate-180">
                                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                  </svg>
                                </span>
                              </summary>
                              <div className="mt-4 space-y-3">
                                {restaurant.prosAndCons.pros.map((pro, index) => (
                                  <div key={index} id={`highlights-ref-${index + 1}`} className="p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="bg-gray-200 text-gray-800 rounded-full w-5 h-5 inline-flex items-center justify-center text-xs">{index + 1}</span>
                                      <span className="font-medium">Öne Çıkan Özellik {index + 1}</span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                      {pro.platforms.includes('youtube') && (
                                        <a href={`https://youtube.com/watch?v=example-${index}`} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline flex items-center gap-1 text-sm">
                                          <Youtube size={14} />
                                          <span>Video: "Le Petit Bistro Deneyimi - Bölüm {index + 1}"</span>
                                        </a>
                                      )}
                                      {pro.platforms.includes('google') && (
                                        <a href={`https://maps.google.com/example-${index}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1 text-sm">
                                          <Globe size={14} />
                                          <span>Google Değerlendirmesi: "Müşteri Yorumu #{index + 1}"</span>
                                        </a>
                                      )}
                                      {pro.platforms.includes('tripadvisor') && (
                                        <a href={`https://tripadvisor.com/example-${index}`} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline flex items-center gap-1 text-sm">
                                          <Award size={14} />
                                          <span>Tripadvisor Değerlendirmesi: "Öne Çıkan Deneyim #{index + 1}"</span>
                                        </a>
                                      )}
                                      {pro.platforms.includes('instagram') && (
                                        <a href={`https://instagram.com/p/example-${index}`} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline flex items-center gap-1 text-sm">
                                          <Instagram size={14} />
                                          <span>Instagram Gönderisi: "Hafta Sonu Gurme Deneyimlerim #{index + 1}"</span>
                                        </a>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </details>
                          </div>
                        </div>
                      </Tabs.Content>

                      <Tabs.Content value="cautions" className="focus:outline-none">
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                          <h3 className="text-xl font-bold mb-4">Dikkat Edilmesi Gerekenler</h3>
                          <p className="text-gray-600 mb-6">Mekanın dikkat edilmesi gereken noktaları burada bulabilirsiniz.</p>
                          
                          <div className="space-y-6">
                            {restaurant.prosAndCons.cons.map((con, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-red-50 rounded-xl p-4"
                              >
                                <div className="flex items-center gap-2 mb-3">
                                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                                    <span className="text-red-600 text-xl">✗</span>
                                  </div>
                                  <h4 className="text-lg font-semibold text-red-700">Dikkat Edilmesi Gereken Nokta {index + 1}</h4>
                                </div>
                                <p className="text-red-800 mb-3">
                                  {con.text}
                                  <a href={`#cautions-ref-${index + 1}`} className="ml-1 text-xs bg-gray-100 rounded-full inline-flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors px-1.5 align-top">[{index + 1}]</a>
                                </p>
                                <div className="flex items-center gap-2 flex-wrap">
                                  {con.platforms.map((platform, pIndex) => (
                                    <div
                                      key={pIndex}
                                      className="flex items-center gap-1 text-xs bg-white px-2 py-1 rounded-full"
                                    >
                                      {platform === 'youtube' && (
                                        <>
                                          <Youtube size={14} className="text-red-600" />
                                          <span className="text-gray-600">Youtube</span>
                                        </>
                                      )}
                                      {platform === 'google' && (
                                        <>
                                          <Globe size={14} className="text-blue-600" />
                                          <span className="text-gray-600">Google</span>
                                        </>
                                      )}
                                      {platform === 'tripadvisor' && (
                                        <>
                                          <Award size={14} className="text-green-600" />
                                          <span className="text-gray-600">Tripadvisor</span>
                                        </>
                                      )}
                                      {platform === 'instagram' && (
                                        <>
                                          <Instagram size={14} className="text-pink-600" />
                                          <span className="text-gray-600">Instagram</span>
                                        </>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            ))}
                          </div>

                          {/* Referanslar Akordiyonu */}
                          <div className="mt-8 border-t border-gray-100 pt-6">
                            <details className="group" id="cautions-references">
                              <summary className="flex justify-between items-center cursor-pointer list-none">
                                <h5 className="text-lg font-medium text-gray-800">Referanslar</h5>
                                <span className="transition group-open:rotate-180">
                                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                  </svg>
                                </span>
                              </summary>
                              <div className="mt-4 space-y-3">
                                {restaurant.prosAndCons.cons.map((con, index) => (
                                  <div key={index} id={`cautions-ref-${index + 1}`} className="p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="bg-gray-200 text-gray-800 rounded-full w-5 h-5 inline-flex items-center justify-center text-xs">{index + 1}</span>
                                      <span className="font-medium">Dikkat Edilmesi Gereken Nokta {index + 1}</span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                      {con.platforms.includes('youtube') && (
                                        <a href={`https://youtube.com/watch?v=caution-${index}`} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline flex items-center gap-1 text-sm">
                                          <Youtube size={14} />
                                          <span>Video: "Restoran İncelemesi - Dikkat Edilmesi Gerekenler"</span>
                                        </a>
                                      )}
                                      {con.platforms.includes('google') && (
                                        <a href={`https://maps.google.com/caution-${index}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1 text-sm">
                                          <Globe size={14} />
                                          <span>Google Değerlendirmesi: "Eleştirel Yorum #{index + 1}"</span>
                                        </a>
                                      )}
                                      {con.platforms.includes('tripadvisor') && (
                                        <a href={`https://tripadvisor.com/caution-${index}`} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline flex items-center gap-1 text-sm">
                                          <Award size={14} />
                                          <span>Tripadvisor Değerlendirmesi: "Deneyim Eksiklikleri"</span>
                                        </a>
                                      )}
                                      {con.platforms.includes('instagram') && (
                                        <a href={`https://instagram.com/p/caution-${index}`} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline flex items-center gap-1 text-sm">
                                          <Instagram size={14} />
                                          <span>Instagram Yorumu: "Dikkat Edilmesi Gereken Noktalar"</span>
                                        </a>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </details>
                          </div>
                        </div>
                      </Tabs.Content>
                    </div>

                    {/* Beğenimetre bileşeni - sabit, sağ tarafta */}
                    <div className="md:col-span-1">
                      <div className="sticky top-4">
                        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                          <h3 className="text-xl font-bold mb-4 text-center">Beğenimetre</h3>
                          <SatisfactionMeter 
                            positiveCount={76} 
                            negativeCount={24} 
                          />
                          <div className="mt-4 text-center text-sm text-gray-500">
                            <p>Bu ölçüm, yapay zeka tarafından analiz edilen yorumlara dayanmaktadır.</p>
                            <p className="mt-1">Toplamda {76 + 24} yorum değerlendirilmiştir.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tabs.Root>
              </div>
            </div>
          </Tabs.Content>

          <Tabs.Content value="insider" className="focus:outline-none">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-4">İçeriden Bilgi</h3>
              <ul className="space-y-4">
                {restaurant.insiderTips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Star size={16} className="text-[#f96815] mt-1" />
                    <p>{tip}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Tabs.Content>

          <Tabs.Content value="timeline" className="focus:outline-none">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Değerlendirmeler */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-[#fed8b1] flex items-center justify-center">
                    <MessageSquare size={18} className="text-[#f96815]" />
                  </div>
                  <h4 className="font-semibold text-gray-800">Değerlendirmeler</h4>
                </div>
                <div className="space-y-4">
                  {/* Google Review */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-blue-600">Google</span>
                        <div className="flex items-center gap-1">
                          <div className="text-3xl font-bold text-gray-800">4.7</div>
                          <div className="flex flex-col ml-1">
                            <div className="flex">
                              {[1, 2, 3, 4].map((_, i) => (
                                <span key={i} className="text-yellow-400 text-sm">★</span>
                              ))}
                              <span className="text-yellow-400 text-sm">☆</span>
                            </div>
                            <span className="text-xs text-gray-500">542 yorum</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <Globe size={16} className="text-blue-600" />
                    </div>
                  </div>
                  
                  {/* TripAdvisor */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-green-600">TripAdvisor</span>
                        <div className="flex items-center gap-1">
                          <div className="text-3xl font-bold text-gray-800">4.9</div>
                          <div className="flex flex-col ml-1">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((_, i) => (
                                <span key={i} className="text-green-500 text-sm">★</span>
                              ))}
                            </div>
                            <span className="text-xs text-gray-500">324 yorum</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <Award size={16} className="text-green-600" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Instagram Takipçi Sayısı */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-[#fed8b1] flex items-center justify-center">
                    <Instagram size={18} className="text-[#f96815]" />
                  </div>
                  <h4 className="font-semibold text-gray-800">Instagram Takipçileri</h4>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-gray-800">35.7K</div>
                  <div className="flex items-center text-green-600 text-sm">
                    <ArrowUp size={14} />
                    <span>12% ⟨3 ay⟩</span>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <Instagram size={16} className="text-pink-500" />
                  <span className="text-sm text-gray-500">@lepetitbistro</span>
                </div>
              </div>
              
              {/* Karşılaştırma */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-[#fed8b1] flex items-center justify-center">
                    <BarChart3 size={18} className="text-[#f96815]" />
                  </div>
                  <h4 className="font-semibold text-gray-800">Benzer Mekanlarla Karşılaştırma</h4>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Le Petit Bistro</span>
                    <span className="text-sm font-semibold">4.8</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-[#f96815] h-2.5 rounded-full" style={{ width: "92%" }}></div>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-sm">Benzer Restoranlar Ortalaması</span>
                    <span className="text-sm font-semibold">4.3</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-gray-400 h-2.5 rounded-full" style={{ width: "84%" }}></div>
                  </div>
                </div>
              </div>
              
              {/* Aldığı Ödüller */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-[#fed8b1] flex items-center justify-center">
                    <Trophy size={18} className="text-[#f96815]" />
                  </div>
                  <h4 className="font-semibold text-gray-800">Aldığı Ödüller</h4>
                </div>
                <div className="mt-1">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Award size={16} className="text-yellow-500" />
                      <span className="text-sm">2024 Michelin Yıldızı</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award size={16} className="text-yellow-500" />
                      <span className="text-sm">2023 TimeOut Favori Restoran</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Yer Aldığı Listeler */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-[#fed8b1] flex items-center justify-center">
                    <ListOrdered size={18} className="text-[#f96815]" />
                  </div>
                  <h4 className="font-semibold text-gray-800">Yer Aldığı Listeler</h4>
                </div>
                <div className="mt-1">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Globe size={16} className="text-blue-500" />
                      <span className="text-sm">İstanbul'un En İyi 10 Fransız Restoranı</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe size={16} className="text-blue-500" />
                      <span className="text-sm">En Romantik Yemek Mekanları</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Influencer Paylaşımları */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-[#fed8b1] flex items-center justify-center">
                    <Users size={18} className="text-[#f96815]" />
                  </div>
                  <h4 className="font-semibold text-gray-800">Influencer Paylaşımları</h4>
                </div>
                <div className="mt-1">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-pink-100 flex items-center justify-center">
                          <Instagram size={14} className="text-pink-600" />
                        </div>
                        <span className="text-sm">100K+ Takipçili</span>
                      </div>
                      <span className="font-semibold">24</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center">
                          <Youtube size={14} className="text-red-600" />
                        </div>
                        <span className="text-sm">Yemek İçerik Üreticileri</span>
                      </div>
                      <span className="font-semibold">8</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Tabs.Content>

          <Tabs.Content value="badges" className="focus:outline-none">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Michelin Starred Excellence */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#fed8b1] flex items-center justify-center">
                    <Award size={24} className="text-[#f96815]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Michelin Yıldızlı Mutfak</h4>
                    <p className="text-sm text-gray-600 mt-1">Olağanüstü mutfak sanatı ve hizmet için ödüllendirildi</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center">
                    <Trophy size={14} className="text-yellow-600" />
                  </div>
                  <span className="text-sm text-gray-700">2024 Michelin Rehberi</span>
                </div>
              </div>
              
              {/* Historic Wine Cellar */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#fed8b1] flex items-center justify-center">
                    <Wine size={24} className="text-[#f96815]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Tarihi Şarap Mahzeni</h4>
                    <p className="text-sm text-gray-600 mt-1">Dünyanın dört bir yanından 500'den fazla nadir şarap</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                    <BookOpen size={14} className="text-purple-600" />
                  </div>
                  <span className="text-sm text-gray-700">Sommelier tavsiyesi mevcut</span>
                </div>
              </div>
              
              {/* Chef's Table Experience */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#fed8b1] flex items-center justify-center">
                    <ChefHat size={24} className="text-[#f96815]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Şef Masası Deneyimi</h4>
                    <p className="text-sm text-gray-600 mt-1">Mutfak büyüsünü ön sıradan izleme imkanı</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                    <Utensils size={14} className="text-orange-600" />
                  </div>
                  <span className="text-sm text-gray-700">Özel tadım menüsü sunuluyor</span>
                </div>
              </div>
              
              {/* Secret Garden Terrace */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#fed8b1] flex items-center justify-center">
                    <Mountain size={24} className="text-[#f96815]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Gizli Bahçe Terası</h4>
                    <p className="text-sm text-gray-600 mt-1">Panoramik şehir manzaralı gizli bir açık hava vahası</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <Coffee size={14} className="text-green-600" />
                  </div>
                  <span className="text-sm text-gray-700">Akşam yemeği için rezervasyon şart</span>
                </div>
              </div>
              
              {/* Atmosphere */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#fed8b1] flex items-center justify-center">
                    <Music size={24} className="text-[#f96815]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Büyüleyici Atmosfer</h4>
                    <p className="text-sm text-gray-600 mt-1">Mum ışığı ve canlı jazz müziği eşliğinde romantik akşam yemeği</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center">
                    <Heart size={14} className="text-pink-600" />
                  </div>
                  <span className="text-sm text-gray-700">Özel günler için ideal</span>
                </div>
              </div>
              
              {/* Authentic French Cuisine */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#fed8b1] flex items-center justify-center">
                    <UtensilsCrossed size={24} className="text-[#f96815]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Otantik Fransız Mutfağı</h4>
                    <p className="text-sm text-gray-600 mt-1">Modern bir yorumla sunulan geleneksel Fransız lezzetleri</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <Star size={14} className="text-blue-600" />
                  </div>
                  <span className="text-sm text-gray-700">Öne çıkan: Coq au Vin, Duck Confit</span>
                </div>
              </div>
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </div>

      {/* Comments Section */}
      <div className="container mx-auto px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-2xl font-bold">Kullanıcı Yorumları</h2>
            <p className="text-gray-600 mt-2">Deneyiminizi bizimle paylaşın</p>
          </div>

          {/* Comment Form */}
          <div className="p-6 border-b border-gray-100">
            <form className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-500 text-xl">👤</span>
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Adınız"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#f96815]"
                  />
                </div>
              </div>
              <div>
                <textarea
                  placeholder="Yorumunuzu buraya yazın..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#f96815] resize-none"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-gray-600 mb-1">Puanınız</label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <label 
                        key={star} 
                        className="cursor-pointer"
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                      >
                        <input 
                          type="radio" 
                          name="rating" 
                          value={star} 
                          className="sr-only" 
                          onChange={() => setRatingValue(star)}
                        />
                        <span className={`text-2xl ${hoverRating >= star ? 'text-yellow-300' : ratingValue >= star ? 'text-yellow-400' : 'text-gray-300'} transition-colors duration-150`}>★</span>
                      </label>
                    ))}
                  </div>
                </div>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#f96815] text-white rounded-lg hover:bg-[#d45c17] transition-colors duration-200"
                >
                  Yorum Yap
                </button>
              </div>
            </form>
          </div>

          {/* Comments List */}
          <div className="p-6">
            <div className="space-y-6">
              {/* Sample Comment */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-gray-500 text-xl">👤</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium">Ahmet Y.</h4>
                      <p className="text-sm text-gray-500">2 gün önce</p>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Harika bir deneyimdi! Personel çok ilgiliydi, yemekler lezzetliydi. Özellikle şef masası deneyimini tavsiye ederim.
                  </p>
                  <div className="mt-3 flex items-center gap-4">
                    <div className="text-sm text-gray-500 hover:text-[#f96815] hover:scale-105 hover:font-medium transition-all duration-200 cursor-pointer group">
                      <span className="relative inline-block group-hover:underline decoration-[#f96815] underline-offset-2">
                        Beğen
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f96815] group-hover:w-full transition-all duration-300"></span>
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 hover:text-red-600 hover:scale-105 hover:font-medium transition-all duration-200 flex items-center gap-1 cursor-pointer group">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 14h2"></path>
                        <path d="M11 7h2v4"></path>
                        <circle cx="12" cy="12" r="10"></circle>
                      </svg>
                      <span className="relative inline-block group-hover:underline decoration-red-600 underline-offset-2">
                        Şikayet Et
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Another Sample Comment */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-gray-500 text-xl">👤</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium">Ayşe K.</h4>
                      <p className="text-sm text-gray-500">1 hafta önce</p>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>☆</span>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Atmosfer çok güzeldi, yemekler lezzetliydi. Fiyatlar biraz yüksek ama kalite buna değer.
                  </p>
                  <div className="mt-3 flex items-center gap-4">
                    <div className="text-sm text-gray-500 hover:text-[#f96815] hover:scale-105 hover:font-medium transition-all duration-200 cursor-pointer group">
                      <span className="relative inline-block group-hover:underline decoration-[#f96815] underline-offset-2">
                        Beğen
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f96815] group-hover:w-full transition-all duration-300"></span>
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 hover:text-red-600 hover:scale-105 hover:font-medium transition-all duration-200 flex items-center gap-1 cursor-pointer group">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 14h2"></path>
                        <path d="M11 7h2v4"></path>
                        <circle cx="12" cy="12" r="10"></circle>
                      </svg>
                      <span className="relative inline-block group-hover:underline decoration-red-600 underline-offset-2">
                        Şikayet Et
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <button
        onClick={() => setIsDialogOpen(!isDialogOpen)}
        className="fixed bottom-4 right-4 bg-[#f96815] text-white rounded-full p-3 shadow-lg hover:bg-[#d45c17] transition-colors duration-200 z-40"
      >
        <Search size={24} />
      </button>

      {/* Menu Decoder - Sayfanın En Altında */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isDialogOpen ? 'auto' : 0,
          opacity: isDialogOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] z-30 overflow-hidden"
      >
        <div className="container mx-auto p-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Menü Tercümanı</h2>
              <button 
                onClick={() => setIsDialogOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <p className="text-gray-600 mb-4">Menüdeki bir yemek adı veya tabaktaki bir elementi yazarak görselini keşfedin.</p>
            
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Örn: Coq au Vin, Ratatouille..."
                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#f96815]"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className={`px-5 py-2 bg-[#f96815] text-white rounded-lg hover:bg-[#d45c17] transition-colors duration-200 ${isSearching ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSearching ? (
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <Search size={20} />
                )}
              </button>
            </div>
            
            {searchResults && (
              <div className="bg-gray-50 rounded-lg overflow-hidden mb-4 shadow-sm">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <img 
                      src={searchResults.image} 
                      alt={searchResults.name}
                      className="w-full h-full object-cover max-h-[280px]"
                    />
                  </div>
                  <div className="p-4 md:w-2/3">
                    <h3 className="text-xl font-semibold text-gray-800">{searchResults.name}</h3>
                    <p className="text-gray-600 mt-2">{searchResults.description}</p>
                    
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">İçindekiler:</h4>
                      <div className="flex flex-wrap gap-1">
                        {searchResults.name === "Coq au Vin" && (
                          <>
                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">tavuk</span>
                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">kırmızı şarap</span>
                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">mantar</span>
                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">pastırma</span>
                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">soğan</span>
                          </>
                        )}
                        {searchResults.name !== "Coq au Vin" && (
                          <>
                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">temel malzemeler</span>
                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">baharatlar</span>
                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">garnitürler</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {searchQuery && !searchResults && !isSearching && (
              <div className="text-center py-6 text-gray-500">
                <p>Aramanıza uygun sonuç bulunamadı.</p>
                <p className="text-sm mt-1">Farklı bir yemek adı veya malzeme deneyebilirsiniz.</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default RestaurantProfile;
