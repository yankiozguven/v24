"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Tab {
  title: string;
  icon: LucideIcon;
  type?: never;
  href?: string;
}

interface Separator {
  type: "separator";
  title?: never;
  icon?: never;
  href?: never;
}

export type TabItem = Tab | Separator;

interface ExpandableTabsProps {
  tabs: TabItem[];
  className?: string;
  activeColor?: string;
  onChange?: (index: number | null) => void;
}

const buttonVariants = {
  initial: {
    gap: 0,
    paddingLeft: ".25rem",
    paddingRight: ".25rem",
  },
  animate: (isSelected: boolean) => ({
    gap: isSelected ? ".25rem" : 0,
    paddingLeft: isSelected ? ".5rem" : ".25rem",
    paddingRight: isSelected ? ".5rem" : ".25rem",
  }),
};

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

const transition = { delay: 0.1, type: "spring", bounce: 0, duration: 0.6 };

export function ExpandableTabs({
  tabs,
  className,
  activeColor = "text-primary",
  onChange,
}: ExpandableTabsProps) {
  const [selected, setSelected] = React.useState<number | null>(null);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const outsideClickRef = React.useRef(null);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = React.useState(false);

  // Ekran boyutu değişikliklerini izle
  React.useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // İlk yükleme
    checkIfMobile();
    
    // Resize olayını dinle
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useOnClickOutside(outsideClickRef, () => {
    setSelected(null);
    setIsExpanded(false);
    onChange?.(null);
  });

  const handleSelect = (index: number) => {
    const tab = tabs[index];
    if (!tab || 'type' in tab) return;

    if (!isExpanded) {
      // İlk tıklama: Sadece genişlet
      setSelected(index);
      setIsExpanded(true);
      onChange?.(index);
    } else {
      // İkinci tıklama: Yönlendir
      if (tab.href) {
        navigate(tab.href);
        setSelected(null);
        setIsExpanded(false);
        onChange?.(null);
      }
    }
  };

  const Separator = () => (
    <div className="mx-0.5 sm:mx-1 h-[18px] sm:h-[24px] w-[1px] sm:w-[1.2px] bg-border" aria-hidden="true" />
  );

  return (
    <div
      ref={outsideClickRef}
      className={cn(
        "flex flex-wrap items-center gap-1 sm:gap-2 rounded-lg sm:rounded-2xl border bg-background p-0.5 sm:p-1 shadow-sm",
        className
      )}
    >
      {tabs.map((tab, index) => {
        if (tab.type === "separator") {
          return <Separator key={`separator-${index}`} />;
        }

        const Icon = tab.icon;
        return (
          <motion.button
            key={tab.title}
            variants={buttonVariants}
            initial={false}
            animate="animate"
            custom={selected === index}
            onClick={() => handleSelect(index)}
            transition={transition}
            className={cn(
              "relative flex items-center rounded-md sm:rounded-xl px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium transition-colors duration-300 mobile-compact",
              selected === index
                ? cn("bg-muted", activeColor)
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon size={isMobile ? 16 : 20} />
            <AnimatePresence initial={false}>
              {selected === index && (
                <motion.span
                  variants={spanVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={transition}
                  className="overflow-hidden text-xs sm:text-sm ml-1 sm:ml-2"
                >
                  {tab.title}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
} 