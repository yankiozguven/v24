"use client";

import { useEffect, useRef, useCallback } from "react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ArrowUpIcon, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MovingBorderButton } from "./moving-border-button";
import { GuideDialog } from "./guide-dialog";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import animationData from "../../assets/animations/Animation - 1744192683171.json";

interface UseAutoResizeTextareaProps {
    minHeight: number;
    maxHeight?: number;
}

function useAutoResizeTextarea({
    minHeight,
    maxHeight,
}: UseAutoResizeTextareaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustHeight = useCallback(
        (reset?: boolean) => {
            const textarea = textareaRef.current;
            if (!textarea) return;

            if (reset) {
                textarea.style.height = `${minHeight}px`;
                return;
            }

            // Temporarily shrink to get the right scrollHeight
            textarea.style.height = `${minHeight}px`;

            // Calculate new height
            const newHeight = Math.max(
                minHeight,
                Math.min(
                    textarea.scrollHeight,
                    maxHeight ?? Number.POSITIVE_INFINITY
                )
            );

            textarea.style.height = `${newHeight}px`;
        },
        [minHeight, maxHeight]
    );

    useEffect(() => {
        // Set initial height
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = `${minHeight}px`;
        }
    }, [minHeight]);

    // Adjust height on window resize
    useEffect(() => {
        const handleResize = () => adjustHeight();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [adjustHeight]);

    return { textareaRef, adjustHeight };
}

export function VercelV0Chat() {
    const [value, setValue] = useState("");
    const [showGuide, setShowGuide] = useState(false);
    const [isEnhancing, setIsEnhancing] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [enhancedSuggestions, setEnhancedSuggestions] = useState<string[]>([]);
    const [showAnimation, setShowAnimation] = useState(false);
    const [animationStep, setAnimationStep] = useState(0);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight: 60,
        maxHeight: 200,
    });

    // Dışarıya tıklama kontrolü için event listener
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }

            if (animationRef.current && !animationRef.current.contains(event.target as Node) && showAnimation) {
                setShowAnimation(false);
                setAnimationStep(0);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showAnimation]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (value.trim()) {
                navigate(`/search?q=${encodeURIComponent(value.trim())}`);
                setValue("");
                adjustHeight(true);
            }
        }
    };

    // Bu fonksiyon, girilen prompt'a göre geliştirilmiş öneriler oluşturur
    const generateEnhancedSuggestions = (input: string): string[] => {
        const lowerInput = input.toLowerCase();

        // Restoran aramaları için öneriler
        if (lowerInput.includes("restoran") || lowerInput.includes("mekan") || 
            lowerInput.includes("yemek") || lowerInput.includes("kafe") || 
            lowerInput.includes("cafe") || lowerInput.includes("steakhouse") ||
            lowerInput.includes("burger") || lowerInput.includes("pizza") ||
            lowerInput.includes("kebapçı") || lowerInput.includes("kebap")) {

            // Lokasyon tespiti
            const locationRegex = /(beşiktaş|kadıköy|şişli|beyoğlu|taksim|nişantaşı|üsküdar|bebek|etiler|levent|ataşehir|sarıyer|maslak|kartal|maltepe)/i;
            const locationMatch = input.match(locationRegex);
            const location = locationMatch ? locationMatch[0] : null;

            // Yemek türü tespiti
            const foodTypeRegex = /(steak|burger|pizza|türk|italian|italyan|deniz|seafood|balık|kahvaltı|brunch|çin|japon|sushi|kebap|döner|köfte|vejeteryan|vegan|kebapçı)/i;
            const foodMatch = input.match(foodTypeRegex);
            const foodType = foodMatch ? foodMatch[0] : null;

            // Özel öneriler oluştur
            const suggestions: string[] = [];

            if (location && foodType) {
                // Yemek türüne göre özelleştirilmiş öneriler
                if (foodType.toLowerCase().includes("kebap") || foodType.toLowerCase().includes("kebapçı")) {
                    suggestions.push(`${location} bölgesinde iyi döner yapan ${foodType} restoranları`);
                    suggestions.push(`${location}'da zengin rakı menüsü sunan ${foodType} mekanları`);
                    suggestions.push(`${location} civarında Adana ve Urfa kebap çeşitlerini bir arada sunan restoranlar`);
                    suggestions.push(`${location}'da özel baharatlar kullanan otantik ${foodType} mekanları`);
                } else if (foodType.toLowerCase().includes("balık") || foodType.toLowerCase().includes("seafood") || foodType.toLowerCase().includes("deniz")) {
                    suggestions.push(`${location}'da günlük taze balık servisi yapan restoranlar`);
                    suggestions.push(`${location} bölgesinde ekonomik balık menüleri sunan mekanlar`);
                    suggestions.push(`${location}'da meze çeşitleriyle ünlü balık restoranları`);
                    suggestions.push(`${location} sahilinde manzaralı deniz ürünleri restoranları`);
                } else if (foodType.toLowerCase().includes("burger")) {
                    suggestions.push(`${location}'da el yapımı özel köftesiyle ünlü burger mekanları`);
                    suggestions.push(`${location} bölgesinde gurme burger ve craft bira servisi yapan yerler`);
                    suggestions.push(`${location}'da vejetaryen burger alternatifleri sunan restoranlar`);
                    suggestions.push(`${location} civarında dev porsiyon ve özel sos seçenekleri olan burger dükkanları`);
                } else if (foodType.toLowerCase().includes("pizza")) {
                    suggestions.push(`${location}'da odun ateşinde pişen İtalyan pizzaları sunan restoranlar`);
                    suggestions.push(`${location} bölgesinde özel hamur ve ev yapımı soslarıyla ünlü pizzacılar`);
                    suggestions.push(`${location}'da gece geç saatlere kadar açık olan pizzacılar`);
                    suggestions.push(`${location} civarında İtalyan şeflerin çalıştığı otantik pizza restoranları`);
                } else if (foodType.toLowerCase().includes("steak")) {
                    suggestions.push(`${location}'da dry-aged et servisi yapan lüks steakhouse'lar`);
                    suggestions.push(`${location} bölgesinde özel pişirme teknikleri uygulayan steak restoranları`);
                    suggestions.push(`${location}'da ithal et çeşitleri ve zengin şarap menüsü sunan steakhouse'lar`);
                    suggestions.push(`${location} civarında uygun fiyatlı kaliteli steak servisi yapan restoranlar`);
                } else {
                    suggestions.push(`${location} bölgesindeki en iyi ${foodType} restoranları ve fiyat aralıkları`);
                    suggestions.push(`${location}'daki ${foodType} restoranlarında en çok övülen yemekler`);
                    suggestions.push(`${location}'da romantik bir atmosferde ${foodType} yiyebileceğim yerler`);
                    suggestions.push(`${location} civarında büyük gruplar için rezervasyon kabul eden ${foodType} restoranları`);
                }
            }
            else if (location) {
                suggestions.push(`${location} bölgesinde manzaralı ve iyi servisi olan restoranlar`);
                suggestions.push(`${location}'da şef önerileri olan ve özel menüsü bulunan yerler`);
                suggestions.push(`${location} bölgesindeki en iyi fiyat/performans restoranları`);
                suggestions.push(`${location}'da canlı müzik eşliğinde yemek yenebilecek mekanlar`);
                suggestions.push(`${location} civarında çocuk dostu ve oyun alanı olan restoranlar`);
                suggestions.push(`${location}'da geç saatlere kadar açık olan ve zengin içki menüsü sunan mekanlar`);
            }
            else if (foodType) {
                if (foodType.toLowerCase().includes("kebap") || foodType.toLowerCase().includes("kebapçı")) {
                    suggestions.push(`Kuzu etinden özel yapılan ${foodType} restoranları`);
                    suggestions.push(`Aile işletmesi olan ve geleneksel tariflerle yapılan ${foodType} mekanları`);
                    suggestions.push(`Izgara çeşitleri ve mezelerle zengin menüsü olan ${foodType} restoranları`);
                    suggestions.push(`Yanında özel ezme ve salata çeşitleri sunan ${foodType} mekanları`);
                } else if (foodType.toLowerCase().includes("balık") || foodType.toLowerCase().includes("seafood") || foodType.toLowerCase().includes("deniz")) {
                    suggestions.push(`Mevsiminde balık servisi yapan ve sürdürülebilir balıkçılığı destekleyen restoranlar`);
                    suggestions.push(`Özel tarif soğuk mezeler ve rakı seçenekleriyle ünlü ${foodType} mekanları`);
                    suggestions.push(`Kalamar, karides ve midye çeşitleriyle zengin menüsü olan ${foodType} restoranları`);
                    suggestions.push(`Balık dışında vejetaryen seçenekler de sunan alternatif ${foodType} mekanları`);
                } else {
                    suggestions.push(`En iyi ${foodType} yapan ve özel tarifleri olan restoranlar`);
                    suggestions.push(`Ailecek gidilebilecek, çocuk menüsü olan ${foodType} restoranları`);
                    suggestions.push(`Otantik ${foodType} deneyimi sunan ve yerel malzemeler kullanan restoranlar`);
                    suggestions.push(`Vejetaryen/vegan seçenekleri de olan ${foodType} mekanları`);
                }
            }
            else {
                const words = input.split(' ');
                if (words.length >= 2) {
                    // İki veya daha fazla kelimeden oluşuyorsa, içerik analizi yapalım
                    suggestions.push(`${input} (lezzetli ve özel tariflerle yapılan)`);
                    suggestions.push(`${input} (uygun fiyatlı ve porsiyonları büyük)`);
                    suggestions.push(`${input} (özel atmosferi ve ünlü şefleri olan)`);
                    suggestions.push(`${input} (canlı müzik eşliğinde yemek servisi yapan)`);
                    suggestions.push(`${input} (yerel malzemeler ve organik ürünler kullanan)`);
                } else {
                    // Tek kelimeyse, daha genel öneriler
                    suggestions.push(`${input} mekanları (özel atmosferi ve lezzetli yemekleriyle)`);
                    suggestions.push(`Ödüllü şeflerin çalıştığı ${input} restoranları`);
                    suggestions.push(`Uygun fiyatlı ve kaliteli ${input} mekanları`);
                    suggestions.push(`Romantik akşam yemeği için ideal ${input} restoranları`);
                }
            }

            // Steakhouse özel durumu
            if (lowerInput.includes("steakhouse") || lowerInput.includes("steak")) {
                suggestions.push("Dry-aged et servisi yapan ve et kalitesiyle bilinen steakhouse'lar");
                suggestions.push("Steak yanında özel soslar ve garnitürler sunan restoranlar");
                suggestions.push("Wagyu ve Angus gibi özel et çeşitleri sunan lüks steakhouse'lar");

                if (location) {
                    suggestions.push(`${location} bölgesinde ithal et menüsü olan lüks steakhouse'lar`);
                    suggestions.push(`${location}'da şömine başında yemek yiyebileceğiniz steakhouse'lar`);
                }
            }

            // Burger özel durumu
            if (lowerInput.includes("burger")) {
                suggestions.push("El yapımı burger köfteleri ve özel ekmekleriyle bilinen restoranlar");
                suggestions.push("Gurme burger menüleri ve eşsiz sos çeşitleri sunan yerler");
                suggestions.push("Sınırsız patates ikramı yapan burger restoranları");

                if (location) {
                    suggestions.push(`${location}'da smash burger servisi yapan popüler mekanlar`);
                    suggestions.push(`${location} bölgesinde craft bira eşliğinde burger servisi yapan yerler`);
                }
            }

            // Türk mutfağı özel durumu
            if (lowerInput.includes("türk") || lowerInput.includes("osmanlı")) {
                suggestions.push("Geleneksel Osmanlı saray mutfağından tarifleri sunan restoranlar");
                suggestions.push("Bölgesel Türk mutfaklarını bir arada sunan fusion restoranlar");
                suggestions.push("Tarihi mekanlarda otantik Türk mutfağı deneyimi sunan yerler");

                if (location) {
                    suggestions.push(`${location}'da ev yapımı mantı ve gözleme çeşitleri sunan Türk mutfağı restoranları`);
                    suggestions.push(`${location} bölgesinde özel pide ve lahmacun çeşitleri olan mekanlar`);
                }
            }

            return suggestions;
        }

        // Diğer aramalar için genel öneriler
        return [
            `${input} (daha detaylı ve kapsamlı sonuçlar için)`,
            `${input} (kullanıcı yorumlarıyla birlikte)`,
            `${input} (fiyat ve kalite kıyaslamalı)`,
            `${input} (bölgesel özellikler ve önerilerle)`,
            `${input} (özel teklifler ve kampanyalarla)`
        ];
    };

    const enhancePrompt = () => {
        if (!value.trim()) return;

        setIsEnhancing(true);
        setShowAnimation(true);
        setAnimationStep(0);

        // Promptu geliştir ve önerileri oluştur
        const suggestions = generateEnhancedSuggestions(value);
        setEnhancedSuggestions(suggestions);

        // Animasyon adımlarını zamanlayıcılarla ilerlet
        setTimeout(() => {
            setAnimationStep(1);

            setTimeout(() => {
                setAnimationStep(2);
                setIsEnhancing(false);
            }, 1500);
        }, 1000);
    };

    const handleSuggestionSelect = (suggestion: string) => {
        setValue(suggestion);
        setShowAnimation(false);
        setAnimationStep(0);
        adjustHeight();
    };

    const getAnimationPromptTips = () => {
        const lowerInput = value.toLowerCase();
        const promptTips = [];

        if (lowerInput.includes("restoran") || lowerInput.includes("yemek")) {
            if (!lowerInput.includes("manzara") && !lowerInput.includes("atmosfer")) {
                promptTips.push(`${value} (manzaralı ve romantik atmosfer ile)`);
            }
            if (!lowerInput.includes("fiyat") && !lowerInput.includes("bütçe")) {
                promptTips.push(`${value} (fiyat-performans dengesi en iyi olanlar)`);
                promptTips.push(`${value} (özel günler için lüks seçenekler)`);
            }
            if (!lowerInput.includes("şef") && !lowerInput.includes("özel tarif")) {
                promptTips.push(`${value} (şef imzalı özel tarifler sunan)`);
            }
        } else if (lowerInput.includes("kafe") || lowerInput.includes("kahve")) {
            if (!lowerInput.includes("wifi") && !lowerInput.includes("çalışma")) {
                promptTips.push(`${value} (uzun oturmalı çalışma ortamı olan)`);
            }
            if (!lowerInput.includes("kahve çeşit") && !lowerInput.includes("özel")) {
                promptTips.push(`${value} (özel kavurma ve demleme yöntemleri kullanan)`);
            }
            if (!lowerInput.includes("tatlı") && !lowerInput.includes("pasta")) {
                promptTips.push(`${value} (ev yapımı tatlı ve pastalar sunan)`);
            }
        } else if (lowerInput.includes("bar") || lowerInput.includes("içki") || lowerInput.includes("kokteyl")) {
            if (!lowerInput.includes("müzik") && !lowerInput.includes("canlı")) {
                promptTips.push(`${value} (canlı müzik performansları olan)`);
            }
            promptTips.push(`${value} (imza kokteyller ve özel içki menüsü sunan)`);
            promptTips.push(`${value} (yerel tatlar ve atıştırmalıklar eşliğinde)`);
        } else if (lowerInput.includes("tatil") || lowerInput.includes("otel")) {
            promptTips.push(`${value} (aileler için çocuk dostu aktiviteler sunan)`);
            promptTips.push(`${value} (yetişkinlere özel hizmetler ve spa imkanları)`);
            promptTips.push(`${value} (gurme restoran ve özel menü seçenekleri)`);
        } else {
            promptTips.push(`${value} (daha detaylı ve kapsamlı sonuçlar için)`);
            promptTips.push(`${value} (kullanıcı yorumlarıyla desteklenmiş)`);
            promptTips.push(`${value} (fiyat ve kalite karşılaştırmalı)`);
        }

        return promptTips;
    };

    return (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4 space-y-8">
            <h1 className="text-2xl font-bold text-[#1b100e]">
                Size nasıl yardımcı olabilirim?
            </h1>

            <div className="w-full relative">
                <div className="absolute -bottom-12 left-0 z-10">
                    <MovingBorderButton onClick={() => setShowGuide(true)}>
                        Guide
                    </MovingBorderButton>
                </div>

                {showAnimation && (
                    <motion.div 
                        ref={animationRef}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute bottom-full left-0 mb-4 bg-white rounded-lg shadow-lg p-4 max-w-md w-full border border-[#f96815]/30 z-50"
                    >
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-[#f96815] rounded-full flex items-center justify-center">
                                        <Sparkles className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-sm text-[#1b100e]">Garson Lütfen</h3>
                                        <p className="text-xs text-[#1b100e]/60">Aramanızı iyileştirme asistanı</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => {
                                        setShowAnimation(false);
                                        setAnimationStep(0);
                                    }}
                                    className="text-xs text-[#1b100e]/60 hover:text-[#1b100e] transition-colors"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="relative">
                                <AnimatePresence mode="wait">
                                    {animationStep === 0 && (
                                        <motion.div
                                            key="step0"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex flex-col items-center"
                                        >
                                            <div className="flex">
                                                <Lottie 
                                                    animationData={animationData} 
                                                    style={{ width: "200px", height: "160px" }}
                                                />
                                                <div className="flex items-center">
                                                    <p className="text-sm text-[#1b100e]">Aramanızı geliştirmek için çalışıyorum...</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {animationStep === 1 && (
                                        <motion.div
                                            key="step1"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <div className="flex">
                                                <Lottie 
                                                    animationData={animationData} 
                                                    style={{ width: "200px", height: "160px" }}
                                                />
                                                <div className="flex flex-col justify-center ml-2">
                                                    <p className="text-sm text-[#1b100e]">Detaylı sonuçlar için arama geliştiriliyor...</p>
                                                    <div className="mt-2 w-full grid grid-cols-5 gap-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <div 
                                                                key={i} 
                                                                className="h-1 bg-[#f96815]/30 rounded-full overflow-hidden"
                                                            >
                                                                <motion.div 
                                                                    className="h-full bg-[#f96815]" 
                                                                    initial={{ width: "0%" }}
                                                                    animate={{ width: "100%" }}
                                                                    transition={{ duration: 1.5, delay: i * 0.1 }}
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {animationStep === 2 && (
                                        <motion.div
                                            key="step2"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <div className="flex">
                                                <Lottie 
                                                    animationData={animationData} 
                                                    style={{ width: "200px", height: "160px" }}
                                                />
                                                <div className="flex flex-col justify-center ml-2">
                                                    <p className="font-semibold text-sm text-[#1b100e] mb-2">Daha detaylı sonuçlar için öneriler:</p>
                                                    <div className="max-h-[150px] overflow-y-auto pr-2 custom-scrollbar">
                                                        <ul className="space-y-2">
                                                            {enhancedSuggestions.map((suggestion, index) => (
                                                                <motion.li 
                                                                    key={index}
                                                                    initial={{ opacity: 0, x: -5 }}
                                                                    animate={{ opacity: 1, x: 0 }}
                                                                    transition={{ delay: 0.1 * index }}
                                                                    className="flex items-start gap-1.5"
                                                                >
                                                                    <span className="text-[#f96815] mt-0.5">•</span>
                                                                    <button
                                                                        onClick={() => handleSuggestionSelect(suggestion)}
                                                                        className="text-sm text-[#1b100e] text-left hover:text-[#f96815] transition-colors"
                                                                    >
                                                                        {suggestion}
                                                                    </button>
                                                                </motion.li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                )}

                <div className="relative bg-[#fdf2e4] rounded-xl border border-[#f96815] transition-colors duration-200 hover:bg-[#fdf2e4]/90">
                    <div className="overflow-y-auto">
                        <Textarea
                            ref={textareaRef}
                            value={value}
                            onChange={(e) => {
                                setValue(e.target.value);
                                adjustHeight();
                            }}
                            onKeyDown={handleKeyDown}
                            placeholder="En iyi restoranlar, yakındaki mekanlar..."
                            className={cn(
                                "w-full px-4 py-3",
                                "resize-none",
                                "bg-transparent",
                                "border-none",
                                "text-black text-sm",
                                "focus:outline-none",
                                "focus-visible:ring-0 focus-visible:ring-offset-0",
                                "placeholder:text-black placeholder:text-sm",
                                "min-h-[60px]"
                            )}
                            style={{
                                overflow: "hidden",
                            }}
                        />
                    </div>

                    <div className="flex items-center justify-end p-3 gap-2">
                        <div className="relative" ref={dropdownRef}>
                            <button
                                type="button"
                                onClick={enhancePrompt}
                                disabled={isEnhancing || !value.trim()}
                                className={cn(
                                    "px-2 py-1.5 rounded-lg text-sm transition-colors border border-[#f96815] hover:border-[#f96815]/80 hover:bg-neutral-100 flex items-center justify-between gap-1",
                                    value.trim() && !isEnhancing
                                        ? "bg-[#fdf2e4] text-black"
                                        : "bg-[#fdf2e4] text-black/50"
                                )}
                            >
                                {isEnhancing ? (
                                    <div className="w-4 h-4 border-2 border-[#f96815] border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <Sparkles className="w-4 h-4" />
                                )}
                                <span className="text-xs">Geliştir</span>
                            </button>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                if (value.trim()) {
                                    navigate(`/search?q=${encodeURIComponent(value.trim())}`);
                                    setValue("");
                                    adjustHeight(true);
                                }
                            }}
                            className={cn(
                                "px-1.5 py-1.5 rounded-lg text-sm transition-colors border border-[#f96815] hover:border-[#f96815]/80 hover:bg-[#f96815] flex items-center justify-between gap-1",
                                value.trim()
                                    ? "bg-[#fdf2e4] text-[#f96815]"
                                    : "bg-[#fdf2e4] text-black"
                            )}
                        >
                            <ArrowUpIcon
                                className="w-4 h-4 text-black"
                            />
                            <span className="sr-only">Gönder</span>
                        </button>
                    </div>
                </div>
            </div>

            <GuideDialog open={showGuide} onOpenChange={setShowGuide} />
        </div>
    );
}