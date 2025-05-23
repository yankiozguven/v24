import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Zap, ArrowLeft, Sparkles, Filter, ChevronDown, ChevronUp, Instagram, Info, Image, Lightbulb, Share2, MessageSquare, List, AlertTriangle, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import * as HoverCard from '@radix-ui/react-hover-card';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Tabs from '@radix-ui/react-tabs';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from "lottie-react";
import * as Tooltip from '@radix-ui/react-tooltip';
import filterAnimationData from '../assets/animations/filter-animation.json';

// Özel kaydırma çubuğu stili
import './scrollbar.css';

interface Restaurant {
  id: number;
  name: string;
  image: string;
  badges: string[];
  description: string;
  isControversial: boolean;
  controversyStats: {
    positive: number;
    negative: number;
    quote: string;
  };
  popularity: number;
  tags: {
    name: string;
    description: string;
    icon: string;
  }[];
  gallery: string[];
  localInsider: {
    tips: {
      title: string;
      description: string;
      source: string;
      date: string;
    }[];
  };
  socialPresence: {
    platform: 'instagram' | 'twitter' | 'facebook' | 'youtube';
    stats: {
      followers: number;
      engagement: number;
      trending: boolean;
    };
    highlights: {
      title: string;
      description: string;
      date: string;
    }[];
  }[];
  aiReviews: {
    type: 'highlight' | 'warning';
    summary: string;
    sentiment: 'positive' | 'neutral' | 'negative';
    keyPoints: string[];
    source: string;
    date: string;
    helpfulCount: number;
  }[];
  timeCapsule: {
    awards: {
      title: string;
      year: string;
      description: string;
    }[];
    lists: {
      title: string;
      platform: string;
      year: string;
      description: string;
    }[];
    socialStats: {
      followers: number;
      posts: number;
      engagement: number;
    };
  };
}

// Lottie animasyonunuzu import edin
const filterAnimation = {
  // Lottiefiles'dan aldığınız JSON'u buraya yapıştırın
};

function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchQuery = searchParams.get('q') || '';
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
  const [popularityRange, setPopularityRange] = useState<[number, number]>([0, 100]);
  const [expandedRestaurantId, setExpandedRestaurantId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>('gallery');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeDropdownPage, setActiveDropdownPage] = useState<'filters' | 'enrichment'>('filters');
  const [showEnrichment, setShowEnrichment] = useState(false);
  const [badgeSearchQuery, setBadgeSearchQuery] = useState('');
  const filterRef = useRef<HTMLDivElement>(null);
  const filterButtonRef = useRef<HTMLDivElement>(null);

  // Dışarı tıklamayı dinlemek için useEffect
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (isFilterOpen && 
          filterRef.current && 
          !filterRef.current.contains(event.target as Node) &&
          filterButtonRef.current && 
          !filterButtonRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterOpen]);

  const aiSuggestions = [
    "Vejetaryen seçenekler ekle",
    "Fiyat aralığını belirt",
    "Özel günler için uygunluğunu sor",
    "Rezervasyon gerekliliğini öğren"
  ];

  const restaurants: Restaurant[] = [
    {
      id: 1,
      name: "Le Petit Bistro",
      image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
      badges: ["🌟 Michelin Yıldızlı", "🍷 Şarap Mükemmelliği", "💑 Romantik Mekan", "📅 Rezervasyon Gerekli"],
      description: "The escargot will make you question everything you thought you knew about French cuisine",
      isControversial: true,
      controversyStats: {
        positive: 70,
        negative: 30,
        quote: "En otantik Fransız deneyimi vs 'Tereyağında pahalı salyangozlar'"
      },
      popularity: 2499,
      tags: [
        {
          name: "Romantik Akşam Yemeği",
          description: "Mükemmel bir akşam yemeği için ideal atmosfer ve ışıklandırma",
          icon: "💑"
        },
        {
          name: "Şarap Uzmanı",
          description: "Geniş şarap koleksiyonu ve uzman sommelier hizmeti",
          icon: "🍷"
        },
        {
          name: "Özel Günler",
          description: "Doğum günü, yıldönümü gibi özel günler için özel menüler",
          icon: "🎉"
        }
      ],
      gallery: [
        "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1600891964599-f61f4c5ad4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
      ],
      localInsider: {
        tips: [
          {
            title: "En İyi Masa",
            description: "Pencereden Boğaz manzarası olan köşe masaları için akşam 19:00'dan önce gelin",
            source: "Düzenli Müşteri Yorumu",
            date: "2024-03-15"
          },
          {
            title: "Gizli Menü",
            description: "Şef'in günün menüsünü mutlaka sorun, yaz mevsiminde özel deniz ürünleri servis ediliyor",
            source: "Personel Önerisi",
            date: "2024-03-10"
          }
        ]
      },
      socialPresence: [
        {
          platform: "instagram",
          stats: {
            followers: 12500,
            engagement: 8.5,
            trending: true
          },
          highlights: [
            {
              title: "Viral Olan Şef'in Özel Menüsü",
              description: "Şef Pierre'in özel truffle menüsü sosyal medyada büyük ilgi gördü",
              date: "2024-03-01"
            }
          ]
        },
        {
          platform: "twitter",
          stats: {
            followers: 8300,
            engagement: 6.2,
            trending: false
          },
          highlights: [
            {
              title: "Yemek Eleştirmenleri Ödülü",
              description: "En iyi Fransız restoranı ödülünü kazandı",
              date: "2024-02-15"
            }
          ]
        }
      ],
      aiReviews: [
        {
          type: 'highlight',
          summary: "",
          sentiment: "positive",
          keyPoints: [
            "Otantik lezzetler ve sunumlar",
            "Profesyonel servis ekibi",
            "Zengin şarap menüsü",
            "Romantik atmosfer"
          ],
          source: "",
          date: "2024-03-10",
          helpfulCount: 245
        },
        {
          type: 'warning',
          summary: "",
          sentiment: "neutral",
          keyPoints: [
            "Yoğun saatlerde masa bulmak zor",
            "Özel menüler için önceden haber vermek gerekiyor",
            "Hafta sonları çok kalabalık"
          ],
          source: "",
          date: "2024-03-05",
          helpfulCount: 245
        }
      ],
      timeCapsule: {
        awards: [
          {
            title: "En İyi Fransız Restoranı",
            year: "2023",
            description: "Gastronomi Dünyası Ödülleri"
          },
          {
            title: "Yılın Şefi",
            year: "2022",
            description: "Lezzet Ödülleri"
          }
        ],
        lists: [
          {
            title: "İstanbul'un En İyi 10 Restoranı",
            platform: "Time Out",
            year: "2023",
            description: "Boğaz manzarası ve otantik lezzetleriyle"
          },
          {
            title: "Dünyanın En İyi 100 Restoranı",
            platform: "La Liste",
            year: "2022",
            description: "Fransız mutfağının en iyi temsilcilerinden"
          }
        ],
        socialStats: {
          followers: 12500,
          posts: 850,
          engagement: 8.5
        }
      }
    },
    {
      id: 2,
      name: "Sushi Master",
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
      badges: ["🌟 Michelin Yıldızlı", "🐟 Taze Deniz Ürünleri", "📸 Instagram'lık", "👨‍🍳 Şef Masası"],
      description: "Where tradition meets rebellion - their fusion rolls are causing quite the stir",
      isControversial: true,
      controversyStats: {
        positive: 65,
        negative: 35,
        quote: "'En iyi sushi' vs 'Gelenekselciler için fazla deneysel'"
      },
      popularity: 1865,
      tags: [
        {
          name: "Omakase Deneyimi",
          description: "Şef'in özel seçimleriyle benzersiz bir Japon mutfağı deneyimi",
          icon: "👨‍🍳"
        },
        {
          name: "Taze Balık",
          description: "Günlük taze balık ve deniz ürünleri",
          icon: "🐟"
        },
        {
          name: "Modern Sunum",
          description: "Instagram'da paylaşmaya değer yaratıcı sunumlar",
          icon: "📸"
        }
      ],
      gallery: [
        "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1582450871972-ab5ca641643d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
      ],
      localInsider: {
        tips: [
          {
            title: "Taze Balık",
            description: "Taze balık için en iyi yer",
            source: "Düzenli Müşteri Yorumu",
            date: "2024-03-15"
          },
          {
            title: "Omakase",
            description: "Şef'in özel seçimleri",
            source: "Personel Önerisi",
            date: "2024-03-10"
          }
        ]
      },
      socialPresence: [
        {
          platform: "instagram",
          stats: {
            followers: 10000,
            engagement: 7.5,
            trending: true
          },
          highlights: [
            {
              title: "Viral Olan Omakase",
              description: "Şef'in viral omakase menüsü",
              date: "2024-03-01"
            }
          ]
        },
        {
          platform: "twitter",
          stats: {
            followers: 6000,
            engagement: 5.5,
            trending: false
          },
          highlights: [
            {
              title: "Sushi Eleştirmenleri Ödülü",
              description: "En iyi sushi restoranı ödülünü kazandı",
              date: "2024-02-15"
            }
          ]
        }
      ],
      aiReviews: [
        {
          type: 'highlight',
          summary: "",
          sentiment: "positive",
          keyPoints: [
            "Yaratıcı sunumlar",
            "Taze malzemeler",
            "Modern atmosfer",
            "Şef'in özel menüleri"
          ],
          source: "",
          date: "2024-03-10",
          helpfulCount: 195
        },
        {
          type: 'warning',
          summary: "",
          sentiment: "neutral",
          keyPoints: [
            "Fusion tarifler gelenekselcilere uygun değil",
            "Yüksek fiyatlar",
            "Yoğun ortam",
            "Rezervasyon gerekli"
          ],
          source: "",
          date: "2024-03-05",
          helpfulCount: 195
        }
      ],
      timeCapsule: {
        awards: [
          {
            title: "En İyi Fusion Restoranı",
            year: "2023",
            description: "Asya Mutfağı Ödülleri"
          },
          {
            title: "Yenilikçi Menü Ödülü",
            year: "2022",
            description: "Gastronomi İnovasyonu"
          }
        ],
        lists: [
          {
            title: "En İyi 50 Sushi Restoranı",
            platform: "Sushi Guide",
            year: "2023",
            description: "Modern yaklaşımı ve taze malzemeleriyle"
          },
          {
            title: "Yenilikçi Restoranlar Listesi",
            platform: "Food & Wine",
            year: "2022",
            description: "Geleneksel ve moderni birleştiren yaklaşımıyla"
          }
        ],
        socialStats: {
          followers: 10000,
          posts: 720,
          engagement: 7.5
        }
      }
    },
    {
      id: 3,
      name: "The Hungry Bear",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
      badges: ["👑 Porsiyon Kralı", "⭐ Yerel Favori", "🌿 Çiftlikten Sofraya", "🏆 Ödüllü"],
      description: "Their 72oz steak challenge has become legendary - only 3% succeed!",
      isControversial: true,
      controversyStats: {
        positive: 75,
        negative: 25,
        quote: "Et severlerin rüyası vs Kalp krizi riski"
      },
      popularity: 1065,
      tags: [
        {
          name: "Büyük Porsiyonlar",
          description: "Et severler için ideal, cömert porsiyonlar",
          icon: "👑"
        },
        {
          name: "Yerel Favori",
          description: "Mahalle sakinlerinin vazgeçilmez mekanı",
          icon: "⭐"
        },
        {
          name: "Çiftlikten Sofraya",
          description: "Çiftlikten direkt gelen taze ürünlerle hazırlanan yemekler",
          icon: "🌿"
        }
      ],
      gallery: [
        "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
      ],
      localInsider: {
        tips: [
          {
            title: "72oz Steak Challenge",
            description: "72oz steak challenge'ı denemek için en iyi yer",
            source: "Düzenli Müşteri Yorumu",
            date: "2024-03-15"
          },
          {
            title: "Ev Yemekleri",
            description: "Ev yemekleri için en iyi yer",
            source: "Personel Önerisi",
            date: "2024-03-10"
          }
        ]
      },
      socialPresence: [
        {
          platform: "instagram",
          stats: {
            followers: 8000,
            engagement: 6.0,
            trending: false
          },
          highlights: [
            {
              title: "72oz Steak Challenge",
              description: "72oz steak challenge'ının viral videosu",
              date: "2024-03-01"
            }
          ]
        },
        {
          platform: "twitter",
          stats: {
            followers: 4000,
            engagement: 4.5,
            trending: false
          },
          highlights: [
            {
              title: "Yemek Eleştirmenleri Ödülü",
              description: "En iyi et restoranı ödülünü kazandı",
              date: "2024-02-15"
            }
          ]
        }
      ],
      aiReviews: [
        {
          type: 'highlight',
          summary: "",
          sentiment: "positive",
          keyPoints: [
            "Büyük porsiyonlar",
            "Lezzetli etler",
            "Samimi ortam",
            "Uygun fiyatlar"
          ],
          source: "",
          date: "2024-03-10",
          helpfulCount: 150
        },
        {
          type: 'warning',
          summary: "",
          sentiment: "neutral",
          keyPoints: [
            "Ağır yemekler",
            "Yüksek kalori",
            "Basit sunum",
            "Vejetaryen seçenekler sınırlı"
          ],
          source: "",
          date: "2024-03-05",
          helpfulCount: 150
        }
      ],
      timeCapsule: {
        awards: [
          {
            title: "En İyi Steakhouse",
            year: "2023",
            description: "Et Restoranları Ödülleri"
          },
          {
            title: "Halkın Seçimi",
            year: "2022",
            description: "Yemek Eleştirmenleri Ödülleri"
          }
        ],
        lists: [
          {
            title: "En İyi 20 Steakhouse",
            platform: "Meat Lovers",
            year: "2023",
            description: "72oz steak challenge'ı ile ünlü"
          },
          {
            title: "Yerel Favoriler",
            platform: "City Guide",
            year: "2022",
            description: "Mahalle sakinlerinin vazgeçilmez mekanı"
          }
        ],
        socialStats: {
          followers: 8000,
          posts: 650,
          engagement: 6.0
        }
      }
    }
  ];

  // Yeni restoranlar ekliyorum, toplam 10 olacak şekilde
  const additionalRestaurants: Restaurant[] = [
    {
      id: 4,
      name: "La Pizzeria Napoli",
      image: "https://images.unsplash.com/photo-1593504049359-74330189a345?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
      badges: ["🍕 Otantik Pizza", "🔥 Odun Fırını", "🏆 Ödüllü", "🌿 Taze Malzemeler"],
      description: "Naples usulü hazırlanan gerçek İtalyan pizzası deneyimi",
      isControversial: false,
      controversyStats: {
        positive: 90,
        negative: 10,
        quote: "İtalya dışındaki en iyi pizza vs Sınırlı menü seçenekleri"
      },
      popularity: 1930,
      tags: [
        {
          name: "Otantik İtalyan",
          description: "Geleneksel tariflerle hazırlanan İtalyan lezzetleri",
          icon: "🇮🇹"
        },
        {
          name: "Odun Fırını",
          description: "900 derecede odun ateşinde pişirilen pizzalar",
          icon: "🔥"
        },
        {
          name: "Şef Özel",
          description: "Napoli'den gelen şefin özel tarifleri",
          icon: "👨‍🍳"
        }
      ],
      gallery: [
        "https://images.unsplash.com/photo-1593504049359-74330189a345?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
      ],
      localInsider: {
        tips: [
          {
            title: "En İyi Saatler",
            description: "Akşam 18:00'da gelin, taze hamur ve daha sakin bir ortam bulun",
            source: "Düzenli Müşteri Yorumu",
            date: "2024-04-05"
          },
          {
            title: "Gizli Menü",
            description: "Menüde olmayan 'Şef'in Özel Pizza'sını mutlaka deneyin",
            source: "Personel Önerisi",
            date: "2024-03-20"
          }
        ]
      },
      socialPresence: [
        {
          platform: "instagram",
          stats: {
            followers: 9500,
            engagement: 7.2,
            trending: true
          },
          highlights: [
            {
              title: "Hamur Açma Sanatı",
              description: "Şef Antonio'nun hamur açma performansı viral oldu",
              date: "2024-03-25"
            }
          ]
        }
      ],
      aiReviews: [
        {
          type: 'highlight',
          summary: "",
          sentiment: "positive",
          keyPoints: [
            "Otantik Napoli pizzası",
            "Taze ve kaliteli malzemeler",
            "Geleneksel pişirme teknikleri",
            "İtalyan atmosferi"
          ],
          source: "",
          date: "2024-04-01",
          helpfulCount: 187
        },
        {
          type: 'warning',
          summary: "",
          sentiment: "neutral",
          keyPoints: [
            "Yoğun saatlerde uzun bekleme süreleri",
            "Sınırlı menü seçenekleri",
            "Küçük oturma alanı"
          ],
          source: "",
          date: "2024-03-15",
          helpfulCount: 132
        }
      ],
      timeCapsule: {
        awards: [
          {
            title: "En İyi Pizza",
            year: "2023",
            description: "Uluslararası Pizza Yarışması"
          }
        ],
        lists: [
          {
            title: "Şehrin En İyi 5 Pizzacısı",
            platform: "Food Guide",
            year: "2023",
            description: "Otantik İtalyan lezzetini en iyi yansıtan"
          }
        ],
        socialStats: {
          followers: 9500,
          posts: 620,
          engagement: 7.2
        }
      }
    },
    {
      id: 5,
      name: "Tokyo Ramen Bar",
      image: "https://images.unsplash.com/photo-1591814468924-caf88d1232e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
      badges: ["🍜 El Yapımı Noodle", "🏮 Otantik Japon", "⭐ Şef Önerisi", "🥢 Uzak Doğu"],
      description: "48 saat kaynatılan özel tonkotsu suyu ile hazırlanan geleneksel ramen",
      isControversial: false,
      controversyStats: {
        positive: 85,
        negative: 15,
        quote: "Japonya dışındaki en iyi ramen vs Fazla yoğun lezzetler"
      },
      popularity: 1720,
      tags: [
        {
          name: "El Yapımı Noodle",
          description: "Her gün taze hazırlanan el yapımı erişte",
          icon: "🍜"
        },
        {
          name: "Geleneksel Ramen",
          description: "Bölgesel Japon tarifleriyle hazırlanan otantik çorbalar",
          icon: "🏮"
        }
      ],
      gallery: [
        "https://images.unsplash.com/photo-1591814468924-caf88d1232e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1618956569906-b7c438e4c921?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1552611052-33e04de081de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
      ],
      localInsider: {
        tips: [
          {
            title: "İpucu",
            description: "Tonkotsu ramenin yanında ajitama (marineli yumurta) ekletmeyi unutmayın",
            source: "Şef Önerisi",
            date: "2024-04-02"
          }
        ]
      },
      socialPresence: [
        {
          platform: "instagram",
          stats: {
            followers: 7800,
            engagement: 6.8,
            trending: false
          },
          highlights: [
            {
              title: "Ramen Yapım Süreci",
              description: "48 saatlik tonkotsu suyu hazırlama süreci",
              date: "2024-02-20"
            }
          ]
        }
      ],
      aiReviews: [
        {
          type: 'highlight',
          summary: "",
          sentiment: "positive",
          keyPoints: [
            "Zengin ve derin lezzetli çorbalar",
            "El yapımı taze erişte",
            "Otantik Japon ortamı",
            "Geleneksel pişirme yöntemleri"
          ],
          source: "",
          date: "2024-03-18",
          helpfulCount: 165
        }
      ],
      timeCapsule: {
        awards: [
          {
            title: "En İyi Asya Restoranı",
            year: "2023",
            description: "Şehir Gastronomi Ödülleri"
          }
        ],
        lists: [
          {
            title: "En İyi Ramen Mekanları",
            platform: "Asian Food Guide",
            year: "2023",
            description: "Geleneksel teknikleri koruyan"
          }
        ],
        socialStats: {
          followers: 7800,
          posts: 450,
          engagement: 6.8
        }
      }
    },
    {
      id: 6,
      name: "El Mariachi Taqueria",
      image: "https://images.unsplash.com/photo-1551504734-5ee1c4a3479c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
      badges: ["🌮 Otantik Taco", "🌶️ Acı Seçenekler", "🥑 Taze Guacamole", "🍹 Margarita Uzmanı"],
      description: "Sokak lezzetlerinin otantik Meksika yorumu ve el yapımı tortillalar",
      isControversial: false,
      controversyStats: {
        positive: 80,
        negative: 20,
        quote: "Gerçek Meksika lezzeti vs Bazıları için fazla baharatlı"
      },
      popularity: 1550,
      tags: [
        {
          name: "Sokak Lezzetleri",
          description: "Mexico City'nin ünlü sokak tariflerinden esinlenilen menü",
          icon: "🌮"
        },
        {
          name: "Taze Malzemeler",
          description: "Günlük hazırlanan salsa ve guacamole",
          icon: "🥑"
        }
      ],
      gallery: [
        "https://images.unsplash.com/photo-1551504734-5ee1c4a3479c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1613514785940-daed07799d9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
      ],
      localInsider: {
        tips: [
          {
            title: "Gizli Menü",
            description: "Menüde olmayan 'Pastor Especial'i mutlaka deneyin",
            source: "Düzenli Müşteri Yorumu",
            date: "2024-04-01"
          }
        ]
      },
      socialPresence: [
        {
          platform: "instagram",
          stats: {
            followers: 6900,
            engagement: 5.9,
            trending: false
          },
          highlights: [
            {
              title: "Margarita Yapımı",
              description: "Geleneksel margarita yapım videosu",
              date: "2024-03-12"
            }
          ]
        }
      ],
      aiReviews: [
        {
          type: 'highlight',
          summary: "",
          sentiment: "positive",
          keyPoints: [
            "Otantik Meksika lezzetleri",
            "El yapımı tortillalar",
            "Taze hazırlanan salsalar",
            "Kaliteli tekila seçenekleri"
          ],
          source: "",
          date: "2024-03-25",
          helpfulCount: 148
        }
      ],
      timeCapsule: {
        awards: [
          {
            title: "En İyi Meksika Restoranı",
            year: "2023",
            description: "Şehir Gastronomi Ödülleri"
          }
        ],
        lists: [
          {
            title: "En İyi Taco Mekanları",
            platform: "Latin Food Guide",
            year: "2023",
            description: "Otantik lezzetleri ile öne çıkan"
          }
        ],
        socialStats: {
          followers: 6900,
          posts: 380,
          engagement: 5.9
        }
      }
    },
    {
      id: 7,
      name: "Mama's Kitchen",
      image: "https://images.unsplash.com/photo-1600335895229-6e75511892c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
      badges: ["👵 Ev Yapımı", "⭐ Yerel Favori", "🧁 Tatlı Uzmanı", "🍲 Comfort Food"],
      description: "Anneannelerimizin mutfağından çıkan nostaljik lezzetler",
      isControversial: false,
      controversyStats: {
        positive: 95,
        negative: 5,
        quote: "Gerçek ev yemeği vs Çok geleneksel menü"
      },
      popularity: 1820,
      tags: [
        {
          name: "Nostaljik Tatlar",
          description: "Geleneksel tariflere sadık kalınarak hazırlanan yemekler",
          icon: "👵"
        },
        {
          name: "Ev Yapımı Tatlılar",
          description: "Her gün taze hazırlanan pastalar ve tatlılar",
          icon: "🧁"
        }
      ],
      gallery: [
        "https://images.unsplash.com/photo-1600335895229-6e75511892c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1606103920129-82e627d82383?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1598214886806-c87b84b7078b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
      ],
      localInsider: {
        tips: [
          {
            title: "Günün Spesiyali",
            description: "Çarşamba günü yapılan fırın makarnayı mutlaka deneyin",
            source: "Düzenli Müşteri Yorumu",
            date: "2024-04-05"
          }
        ]
      },
      socialPresence: [
        {
          platform: "instagram",
          stats: {
            followers: 5600,
            engagement: 8.7,
            trending: true
          },
          highlights: [
            {
              title: "Tatlı Yapımı",
              description: "Özel elmalı turta yapımı videosu",
              date: "2024-03-15"
            }
          ]
        }
      ],
      aiReviews: [
        {
          type: 'highlight',
          summary: "",
          sentiment: "positive",
          keyPoints: [
            "Nostaljik ev yemekleri",
            "Sıcak ve samimi ortam",
            "Bol porsiyonlar",
            "El yapımı tatlılar"
          ],
          source: "",
          date: "2024-03-20",
          helpfulCount: 212
        }
      ],
      timeCapsule: {
        awards: [
          {
            title: "En İyi Comfort Food",
            year: "2023",
            description: "Yerel Gastronomi Ödülleri"
          }
        ],
        lists: [
          {
            title: "Şehrin En Samimi Restoranları",
            platform: "Food Guide",
            year: "2023",
            description: "Ev sıcaklığını hissettiren mekanlar"
          }
        ],
        socialStats: {
          followers: 5600,
          posts: 340,
          engagement: 8.7
        }
      }
    },
    {
      id: 8,
      name: "Green Garden",
      image: "https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
      badges: ["🌱 Vegan", "🥗 Organik", "🌿 Çiftlikten Sofraya", "🏆 Sürdürülebilir"],
      description: "Sürdürülebilir tarım ve yerel üreticilerden temin edilen ürünlerle hazırlanan sağlıklı seçenekler",
      isControversial: false,
      controversyStats: {
        positive: 85,
        negative: 15,
        quote: "En iyi vegan seçenekler vs Yüksek fiyatlar"
      },
      popularity: 1480,
      tags: [
        {
          name: "Organik Menü",
          description: "Sertifikalı organik ürünlerle hazırlanan yemekler",
          icon: "🌱"
        },
        {
          name: "Yerel Üreticiler",
          description: "50 km çevredeki çiftliklerden temin edilen malzemeler",
          icon: "🌿"
        }
      ],
      gallery: [
        "https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
      ],
      localInsider: {
        tips: [
          {
            title: "Mevsimlik Menü",
            description: "Ayın ilk haftası değişen mevsimlik menüyü deneyin",
            source: "Şef Önerisi",
            date: "2024-04-02"
          }
        ]
      },
      socialPresence: [
        {
          platform: "instagram",
          stats: {
            followers: 7200,
            engagement: 6.5,
            trending: true
          },
          highlights: [
            {
              title: "Çiftlik Ziyareti",
              description: "Tedarikçi çiftliklere yapılan ziyaret videoları",
              date: "2024-03-10"
            }
          ]
        }
      ],
      aiReviews: [
        {
          type: 'highlight',
          summary: "",
          sentiment: "positive",
          keyPoints: [
            "Taze ve organik malzemeler",
            "Yaratıcı vegan seçenekler",
            "Sürdürülebilir iş modeli",
            "Sağlık odaklı menü"
          ],
          source: "",
          date: "2024-03-22",
          helpfulCount: 178
        }
      ],
      timeCapsule: {
        awards: [
          {
            title: "En İyi Sürdürülebilir Restoran",
            year: "2023",
            description: "Yeşil Gastronomi Ödülleri"
          }
        ],
        lists: [
          {
            title: "En Sağlıklı Restoranlar",
            platform: "Health Food Guide",
            year: "2023",
            description: "Sürdürülebilir ve sağlıklı seçenekler sunan"
          }
        ],
        socialStats: {
          followers: 7200,
          posts: 410,
          engagement: 6.5
        }
      }
    },
    {
      id: 9,
      name: "Burger Republic",
      image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
      badges: ["🍔 Gourmet Burger", "🥩 Dry-Aged Et", "🏆 Ödüllü", "🌮 Fusion"],
      description: "Artisan ekmekler ve özel reçeteli soslar ile hazırlanan el yapımı gurme burgerler",
      isControversial: true,
      controversyStats: {
        positive: 70,
        negative: 30,
        quote: "En iyi burgerciler vs Fazla abartılı ve pahalı"
      },
      popularity: 1920,
      tags: [
        {
          name: "Özel Karışım Etler",
          description: "Günlük hazırlanan özel karışım burger köfteleri",
          icon: "🥩"
        },
        {
          name: "El Yapımı Ekmekler",
          description: "Yerinde günlük hazırlanan artisan ekmekler",
          icon: "🍞"
        }
      ],
      gallery: [
        "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
      ],
      localInsider: {
        tips: [
          {
            title: "Gizli Menü",
            description: "Kasiyer'den 'Şef'in Özel'ini isteyin, menüde olmayan çifte katlı özel burger",
            source: "Düzenli Müşteri Yorumu",
            date: "2024-04-05"
          }
        ]
      },
      socialPresence: [
        {
          platform: "instagram",
          stats: {
            followers: 9800,
            engagement: 7.8,
            trending: true
          },
          highlights: [
            {
              title: "Burger Yapım Süreci",
              description: "Sıfırdan burger hazırlama videosu",
              date: "2024-03-18"
            }
          ]
        }
      ],
      aiReviews: [
        {
          type: 'highlight',
          summary: "",
          sentiment: "positive",
          keyPoints: [
            "Kaliteli et karışımları",
            "El yapımı ekmekler",
            "Yaratıcı burger kombinasyonları",
            "Geniş yan ürün seçenekleri"
          ],
          source: "",
          date: "2024-03-25",
          helpfulCount: 193
        }
      ],
      timeCapsule: {
        awards: [
          {
            title: "En İyi Burger",
            year: "2023",
            description: "Şehir Yemek Festivali"
          }
        ],
        lists: [
          {
            title: "En İyi Burger Mekanları",
            platform: "Burger Guide",
            year: "2023",
            description: "Kaliteli malzemeleri ile öne çıkan"
          }
        ],
        socialStats: {
          followers: 9800,
          posts: 580,
          engagement: 7.8
        }
      }
    },
    {
      id: 10,
      name: "Cafe Midnight",
      image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
      badges: ["☕ Özel Kahve", "🍰 Butik Pastane", "🏆 Ödüllü", "📚 Kitap Kafe"],
      description: "24 saat açık, dünyanın farklı bölgelerinden özenle seçilmiş kahve çekirdekleri ve el yapımı tatlılar",
      isControversial: false,
      controversyStats: {
        positive: 90,
        negative: 10,
        quote: "Şehrin en iyi kahvesi vs Gürültülü çalışma ortamı"
      },
      popularity: 2100,
      tags: [
        {
          name: "Özel Kavurma",
          description: "Yerinde kavrulan butik kahve çekirdekleri",
          icon: "☕"
        },
        {
          name: "El Yapımı Tatlılar",
          description: "Günlük hazırlanan pasta ve kekler",
          icon: "🍰"
        }
      ],
      gallery: [
        "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1445116572660-236099ec97a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1551887196-72e32bfc7bf3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
      ],
      localInsider: {
        tips: [
          {
            title: "Sessiz Çalışma",
            description: "Arka bahçedeki oturma alanı, daha sakin bir çalışma ortamı sunuyor",
            source: "Düzenli Müşteri Yorumu",
            date: "2024-04-01"
          }
        ]
      },
      socialPresence: [
        {
          platform: "instagram",
          stats: {
            followers: 8500,
            engagement: 9.2,
            trending: true
          },
          highlights: [
            {
              title: "Latte Art",
              description: "Ödüllü barista ekibinin latte art gösterileri",
              date: "2024-03-20"
            }
          ]
        }
      ],
      aiReviews: [
        {
          type: 'highlight',
          summary: "",
          sentiment: "positive",
          keyPoints: [
            "Özel kavurma kahve çekirdekleri",
            "Yaratıcı kahve teknikleri",
            "El yapımı tatlı çeşitleri",
            "24 saat hizmet"
          ],
          source: "",
          date: "2024-03-28",
          helpfulCount: 205
        }
      ],
      timeCapsule: {
        awards: [
          {
            title: "En İyi Kahve Deneyimi",
            year: "2023",
            description: "Şehir Kahve Festivali"
          }
        ],
        lists: [
          {
            title: "En İyi Çalışma Kafeleri",
            platform: "Digital Nomad Guide",
            year: "2023",
            description: "24 saat hizmet veren kahve mekanları"
          }
        ],
        socialStats: {
          followers: 8500,
          posts: 630,
          engagement: 9.2
        }
      }
    }
  ];

  // Tüm restoranları birleştirme
  const allRestaurants = [...restaurants, ...additionalRestaurants];

  const allBadges = Array.from(new Set(allRestaurants.flatMap(r => r.badges)));

  return (
    <div className="min-h-screen bg-[#fcf9f8] px-4 md:px-8 py-8">
      <div className="max-w-[960px] mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div 
                onClick={() => navigate(-1)} 
                className="p-2 hover:bg-gray-100 rounded-full cursor-pointer"
              >
                <ArrowLeft className="h-6 w-6" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">"{searchQuery}"</h1>
            </div>
          </div>

          {/* Results Grid */}
          <div className="flex flex-col gap-4 mt-4">
            {allRestaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div 
                  className="relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-[#e7d4d0] w-full sm:w-9/12 mx-auto cursor-pointer"
                  onClick={() => setExpandedRestaurantId(expandedRestaurantId === restaurant.id ? null : restaurant.id)}
                >
                  <div className="relative">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm text-center">
                      <span className="font-bold text-[#1b100e] text-sm">#{index + 1}</span>
                    </div>
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-sm">
                      <span className="flex items-center gap-1 text-[#f96815] text-xs">
                        🔥 {restaurant.popularity} kişi bugün baktı
                      </span>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <h3 className="text-lg font-bold text-[#1b100e]">{restaurant.name}</h3>
                        {restaurant.isControversial && (
                          <DropdownMenu.Root>
                            <DropdownMenu.Trigger asChild>
                              <div 
                                className="text-[#f96815] hover:text-[#f96815]/80 transition-colors ml-2 cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                              >
                                <Zap size={20} className="drop-shadow-md text-[#ff4500]" />
                              </div>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Portal>
                              <DropdownMenu.Content 
                                sideOffset={5}
                                className="w-60 bg-white rounded-xl p-3 shadow-lg border border-[#e7d4d0] z-50"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <div className="space-y-2">
                                  <h3 className="font-medium text-[#1b100e] text-sm">Gidenler ne diyor?</h3>
                                  <div className="flex items-center justify-between">
                                    <span className="text-green-600 text-sm">%{restaurant.controversyStats.positive} seviyor</span>
                                    <span className="text-red-500 text-sm">%{restaurant.controversyStats.negative} hayranı değil</span>
                                  </div>
                                  <div className="text-xs italic p-2 bg-gray-50 rounded-lg">
                                    "{restaurant.controversyStats.quote}"
                                  </div>
                                </div>
                                <DropdownMenu.Arrow className="fill-white" />
                              </DropdownMenu.Content>
                            </DropdownMenu.Portal>
                          </DropdownMenu.Root>
                        )}
                      </div>
                      <div className="p-1 hover:bg-gray-100 rounded-full cursor-pointer">
                        {expandedRestaurantId === restaurant.id ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {restaurant.badges.slice(0, 4).map((badge, badgeIndex) => (
                        <span
                          key={badgeIndex}
                          className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-[#fdf2e4] text-[#1b100e] rounded-full text-[10px] sm:text-xs max-w-[180px] sm:max-w-[200px] inline-block"
                          title={badge}
                        >
                          {badge}
                        </span>
                      ))}
                    </div>

                    <p className="text-sm text-gray-600 italic">{restaurant.description}</p>

                    <AnimatePresence>
                      {expandedRestaurantId === restaurant.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 border-t border-gray-200 space-y-6">
                            {/* Tabs */}
                            <Tabs.Root 
                              value={activeTab} 
                              onValueChange={setActiveTab}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Tabs.List 
                                className="flex border-b border-gray-200 overflow-x-auto no-scrollbar"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <div
                                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium border-b-2 transition-colors data-[state=active]:text-[#f96815] data-[state=active]:border-b-2 data-[state=active]:border-[#f96815] data-[state=inactive]:border-transparent whitespace-nowrap cursor-pointer hover:text-[#f96815] hover:border-[#f96815]/50"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveTab("gallery");
                                  }}
                                  data-state={activeTab === "gallery" ? "active" : "inactive"}
                                >
                                  <Image className="h-3 w-3 sm:h-4 sm:w-4" />
                                  <span className="hidden sm:inline">Galeri</span>
                                  <span className="sm:hidden">Foto</span>
                                </div>
                                <div
                                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium border-b-2 transition-colors data-[state=active]:text-[#f96815] data-[state=active]:border-b-2 data-[state=active]:border-[#f96815] data-[state=inactive]:border-transparent whitespace-nowrap cursor-pointer hover:text-[#f96815] hover:border-[#f96815]/50"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveTab("insider");
                                  }}
                                  data-state={activeTab === "insider" ? "active" : "inactive"}
                                >
                                  <Lightbulb className="h-3 w-3 sm:h-4 sm:w-4" />
                                  <span className="hidden sm:inline">İçeriden Bilgi</span>
                                  <span className="sm:hidden">İpuçları</span>
                                </div>
                                <div
                                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium border-b-2 transition-colors data-[state=active]:text-[#f96815] data-[state=active]:border-b-2 data-[state=active]:border-[#f96815] data-[state=inactive]:border-transparent whitespace-nowrap cursor-pointer hover:text-[#f96815] hover:border-[#f96815]/50"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveTab("social");
                                  }}
                                  data-state={activeTab === "social" ? "active" : "inactive"}
                                >
                                  <Instagram className="h-3 w-3 sm:h-4 sm:w-4" />
                                  <span className="hidden sm:inline">Spot Işığı</span>
                                  <span className="sm:hidden">Sosyal</span>
                                </div>
                                <div
                                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium border-b-2 transition-colors data-[state=active]:text-[#f96815] data-[state=active]:border-b-2 data-[state=active]:border-[#f96815] data-[state=inactive]:border-transparent whitespace-nowrap cursor-pointer hover:text-[#f96815] hover:border-[#f96815]/50"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveTab("reviews");
                                  }}
                                  data-state={activeTab === "reviews" ? "active" : "inactive"}
                                >
                                  <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
                                  <span className="hidden sm:inline">Yorumlar</span>
                                  <span className="sm:hidden">Yorum</span>
                                </div>
                              </Tabs.List>

                              <Tabs.Content 
                                value="gallery" 
                                className="pt-4"
                              >
                                <div className="grid grid-cols-3 gap-1 sm:gap-2">
                                  {restaurant.gallery.map((image, index) => (
                                    <img 
                                      key={index}
                                      src={image}
                                      alt={`${restaurant.name} gallery ${index + 1}`}
                                      className="w-full h-16 sm:h-24 object-cover rounded-md sm:rounded-lg"
                                    />
                                  ))}
                                </div>
                              </Tabs.Content>

                              <Tabs.Content 
                                value="insider" 
                                className="pt-4"
                              >
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                                  {restaurant.localInsider.tips.map((tip, index) => (
                                    <div key={index} className="bg-[#fdf2e4] p-3 sm:p-4 rounded-lg text-xs sm:text-sm">
                                      <div className="flex items-center gap-1 sm:gap-2">
                                        <Info className="h-3 w-3 sm:h-4 sm:w-4 text-[#975a4e]" />
                                        <p>{tip.description}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </Tabs.Content>

                              <Tabs.Content 
                                value="social" 
                                className="pt-4"
                              >
                                <div className="space-y-4 sm:space-y-6">
                                  {/* Ödüller */}
                                  <div className="bg-white rounded-lg p-3 sm:p-4 border border-[#e7d4d0]">
                                    <h4 className="font-medium text-[#1b100e] mb-2 sm:mb-3 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                                      <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-[#f96815]" />
                                      Ödüller
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                                      {restaurant.timeCapsule.awards.map((award, index) => (
                                        <div key={index} className="bg-[#fdf2e4] p-2 sm:p-3 rounded-lg">
                                          <div className="flex items-center justify-between mb-1">
                                            <span className="font-medium text-[#1b100e] text-xs sm:text-sm">{award.title}</span>
                                            <span className="text-[10px] sm:text-xs text-[#975a4e]">{award.year}</span>
                                          </div>
                                          <p className="text-[10px] sm:text-sm text-gray-600">{award.description}</p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Listeler */}
                                  <div className="bg-white rounded-lg p-4 border border-[#e7d4d0]">
                                    <h4 className="font-medium text-[#1b100e] mb-3 flex items-center gap-2">
                                      <List className="h-4 w-4 text-[#f96815]" />
                                      Yer Aldığı Listeler
                                    </h4>
                                    <div className="grid grid-cols-2 gap-4">
                                      {restaurant.timeCapsule.lists.map((list, index) => (
                                        <div key={index} className="bg-[#fdf2e4] p-3 rounded-lg">
                                          <div className="flex items-center justify-between mb-1">
                                            <span className="font-medium text-[#1b100e]">{list.title}</span>
                                            <span className="text-xs text-[#975a4e]">{list.year}</span>
                                          </div>
                                          <span className="text-xs text-[#975a4e]">{list.platform}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Sosyal Medya İstatistikleri */}
                                  <div className="bg-white rounded-lg p-4 border border-[#e7d4d0]">
                                    <h4 className="font-medium text-[#1b100e] mb-3 flex items-center gap-2">
                                      <Instagram className="h-4 w-4 text-[#f96815]" />
                                      Sosyal Medya Varlığı
                                    </h4>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="bg-[#fdf2e4] p-3 rounded-lg">
                                        <div className="flex flex-col">
                                          <div className="flex items-center gap-2 mb-1">
                                            <Instagram className="h-4 w-4 text-[#f96815]" />
                                            <span className="font-medium text-[#1b100e] text-sm">Takipçi</span>
                                          </div>
                                          <div className="text-xl font-bold text-[#1b100e]">
                                            {restaurant.timeCapsule.socialStats.followers.toLocaleString()}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="bg-[#fdf2e4] p-3 rounded-lg">
                                        <div className="flex flex-col">
                                          <div className="flex items-center gap-2 mb-1">
                                            <Share2 className="h-4 w-4 text-[#f96815]" />
                                            <span className="font-medium text-[#1b100e] text-sm">Paylaşım</span>
                                          </div>
                                          <div className="text-xl font-bold text-[#1b100e]">
                                            {restaurant.timeCapsule.socialStats.posts.toLocaleString()}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Tabs.Content>

                              <Tabs.Content 
                                value="reviews" 
                                className="pt-4"
                              >
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                                  {restaurant.aiReviews.map((review, index) => (
                                    <div 
                                      key={index}
                                      className={`p-3 sm:p-4 rounded-lg ${
                                        review.type === 'highlight' 
                                          ? 'bg-green-50 border border-green-100' 
                                          : 'bg-amber-50 border border-amber-100'
                                      }`}
                                    >
                                      <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-1 sm:gap-2">
                                          {review.type === 'highlight' ? (
                                            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                                          ) : (
                                            <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-amber-600" />
                                          )}
                                          <span className="font-medium text-xs sm:text-sm">
                                            {review.type === 'highlight' ? 'Öne Çıkanlar' : 'Dikkat Edilmesi Gerekenler'}
                                          </span>
                                        </div>
                                      </div>
                                      <ul className="text-xs sm:text-sm space-y-1">
                                        {review.keyPoints.map((point, i) => (
                                          <li key={i} className="flex items-center gap-1">
                                            <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-current"></span>
                                            {point}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              </Tabs.Content>
                            </Tabs.Root>

                            {/* Rezervasyon Butonu */}
                            <div className="flex justify-end gap-2 sm:gap-4">
                              <Link 
                                to={`/restaurant/${restaurant.id}`}
                                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#f96815] text-white rounded-lg hover:bg-[#c52e16] transition-colors text-xs sm:text-sm"
                              >
                                Detaylı Profili Gör
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Sağ Alt Köşede Filtre Dialog Butonu */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center">
          <div 
            className="font-['Chicle'] text-[#1b100e] font-medium text-lg mb-[-10px] bg-[#fdf2e4] px-4 py-1 rounded-full"
            style={{ zIndex: 40 }}
          >
            Garson Lütfen
          </div>
          <div 
            className="cursor-pointer relative z-45"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            ref={filterButtonRef}
          >
            <Lottie 
              animationData={filterAnimationData}
              style={{ width: '150px', height: '150px' }}
            />
          </div>
          
          {/* Filtre Dropdown'u */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                ref={filterRef}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-[150px] right-0 w-64 bg-white rounded-xl p-4 shadow-lg border border-[#e7d4d0] z-50 max-h-[400px] overflow-y-auto custom-scrollbar"
              >
                {/* Dropdown Başlık ve Navigasyon */}
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
                  <h3 className="font-medium text-[#1b100e]">
                    {activeDropdownPage === 'filters' ? 'Filtreler' : 'Arama Zenginleştir'}
                  </h3>
                  <div className="flex items-center gap-2">
                    {activeDropdownPage === 'enrichment' && (
                      <div 
                        onClick={() => setActiveDropdownPage('filters')}
                        className="p-1 hover:bg-gray-100 rounded-full cursor-pointer"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </div>
                    )}
                    {activeDropdownPage === 'filters' && (
                      <div 
                        onClick={() => setActiveDropdownPage('enrichment')}
                        className="p-1 hover:bg-gray-100 rounded-full cursor-pointer"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Filtreler Sayfası */}
                <AnimatePresence mode="wait">
                  {activeDropdownPage === 'filters' && (
                    <motion.div
                      key="filters"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      {/* Badgeler */}
                      <div>
                        <h3 className="font-medium text-[#1b100e] mb-2">Badgeler <span className="text-xs text-gray-500">({allBadges.length})</span></h3>
                        <div className="relative mb-2">
                          <input
                            type="text"
                            value={badgeSearchQuery}
                            onChange={(e) => setBadgeSearchQuery(e.target.value)}
                            placeholder="Filtrelerde ara..."
                            className="w-full p-1.5 pl-7 text-xs rounded-lg border border-[#e7d4d0] focus:outline-none focus:ring-1 focus:ring-[#f96815]"
                          />
                          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                        </div>
                        <div className="max-h-32 overflow-y-auto pr-1 flex flex-wrap gap-1 custom-scrollbar">
                          {allBadges
                            .filter(badge => badge.toLowerCase().includes(badgeSearchQuery.toLowerCase()))
                            .map((badge) => (
                            <button
                              key={badge}
                              onClick={() => {
                                setSelectedBadges(prev => 
                                  prev.includes(badge) 
                                    ? prev.filter(b => b !== badge)
                                    : [...prev, badge]
                                );
                              }}
                              className={`px-2 py-0.5 rounded-full text-xs transition-colors mb-1 ${
                                selectedBadges.includes(badge)
                                  ? 'bg-[#f96815] text-white'
                                  : 'bg-[#fdf2e4] text-[#1b100e] hover:bg-[#e7d4d0]'
                              }`}
                            >
                              {badge}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Popülarite Aralığı */}
                      <div>
                        <h3 className="font-medium text-[#1b100e] mb-2">Popülarite Aralığı</h3>
                        <div className="flex items-center gap-4">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={popularityRange[1]}
                            onChange={(e) => setPopularityRange([popularityRange[0], parseInt(e.target.value)])}
                            className="w-full"
                          />
                          <span className="text-sm text-[#1b100e]">{popularityRange[1]}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Arama Zenginleştirme Sayfası */}
                  {activeDropdownPage === 'enrichment' && (
                    <motion.div
                      key="enrichment"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4 custom-scrollbar"
                    >
                      <div className="bg-[#f9f5f2] p-3 rounded-xl">
                        <div className="flex items-start gap-2 mb-2">
                          <div className="bg-[#f96815] rounded-full p-1.5 mt-0.5">
                            <Sparkles className="h-3 w-3 text-white" />
                          </div>
                          <div className="text-xs text-[#1b100e]">
                            <p className="font-medium mb-1">Aramayı daha spesifik hale getirmek ister misiniz?</p>
                            <p className="text-gray-600">"{searchQuery}" aramanızı zenginleştirebilirim.</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {aiSuggestions.map((suggestion, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-2" 
                          >
                            <div className="bg-[#fdf2e4] rounded-xl p-2.5 flex-grow">
                              <div 
                                className="flex items-center justify-between w-full cursor-pointer"
                                onClick={() => {
                                  // Burada seçilen öneriyi işleyebilirsiniz
                                  console.log(`Suggestion selected: ${suggestion}`);
                                }}
                              >
                                <span className="text-xs text-[#1b100e]">{suggestion}</span>
                                <ChevronRight className="h-3.5 w-3.5 text-[#f96815]" />
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-gray-200">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="Kendi sorunuzu yazın..."
                            className="w-full p-2 text-xs rounded-lg border border-[#e7d4d0] focus:outline-none focus:ring-1 focus:ring-[#f96815]"
                          />
                          <div className="bg-[#f96815] p-2 rounded-lg flex items-center justify-center cursor-pointer">
                            <ChevronRight className="h-4 w-4 text-white" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
