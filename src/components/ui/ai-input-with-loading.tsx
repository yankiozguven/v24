"use client";

import { CornerRightUp, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useAutoResizeTextarea } from "@/components/hooks/use-auto-resize-textarea";

interface AIInputWithLoadingProps {
  id?: string;
  placeholder?: string;
  minHeight?: number;
  maxHeight?: number;
  loadingDuration?: number;
  thinkingDuration?: number;
  onSubmit?: (value: string) => void | Promise<void>;
  onEnhance?: (value: string) => void | Promise<void>;
  className?: string;
  autoAnimate?: boolean;
}

export function AIInputWithLoading({
  id = "ai-input-with-loading",
  placeholder = "Ask me anything!",
  minHeight = 56,
  maxHeight = 200,
  loadingDuration = 3000,
  thinkingDuration = 1000,
  onSubmit,
  onEnhance,
  className,
  autoAnimate = false
}: AIInputWithLoadingProps) {
  const [inputValue, setInputValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(autoAnimate);
  const [isEnhancing, setIsEnhancing] = useState(false);
  
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight,
    maxHeight,
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const runAnimation = () => {
      if (!isAnimating) return;
      setSubmitted(true);
      timeoutId = setTimeout(() => {
        setSubmitted(false);
        timeoutId = setTimeout(runAnimation, thinkingDuration);
      }, loadingDuration);
    };

    if (isAnimating) {
      runAnimation();
    }

    return () => clearTimeout(timeoutId);
  }, [isAnimating, loadingDuration, thinkingDuration]);

  const handleSubmit = async () => {
    if (!inputValue.trim() || submitted) return;
    
    setIsAnimating(true);
    setSubmitted(true);
    
    try {
      await onSubmit?.(inputValue);
      setInputValue("");
      adjustHeight(true);
    } finally {
      setTimeout(() => {
        setSubmitted(false);
        setIsAnimating(false);
      }, loadingDuration);
    }
  };

  const handleEnhance = async () => {
    if (!inputValue.trim() || submitted) return;
    
    setIsEnhancing(true);
    setSubmitted(true);
    
    try {
      await onEnhance?.(inputValue);
    } finally {
      setTimeout(() => {
        setSubmitted(false);
        setIsEnhancing(false);
      }, loadingDuration);
    }
  };

  return (
    <div className={cn("w-full py-4", className)}>
      <div className="relative max-w-xl w-full mx-auto flex items-start flex-col gap-2">
        <div className="relative max-w-xl w-full mx-auto">
          <Textarea
            id={id}
            placeholder={placeholder}
            className={cn(
              "max-w-xl bg-[#4a8fa1] w-full rounded-3xl pl-6 pr-24 py-4",
              "placeholder:text-white/70",
              "border-none ring-white/30",
              "text-white resize-none text-wrap leading-[1.2]",
              `min-h-[${minHeight}px]`
            )}
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              adjustHeight();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            disabled={submitted}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {onEnhance && (
              <button
                onClick={handleEnhance}
                className={cn(
                  "rounded-xl py-1 px-1",
                  submitted ? "bg-none" : "bg-white/10"
                )}
                type="button"
                disabled={submitted || !inputValue.trim()}
                title="Aramayı geliştir"
              >
                {isEnhancing ? (
                  <div
                    className="w-4 h-4 bg-[#f9a215] rounded-sm animate-spin transition duration-700"
                    style={{ animationDuration: "3s" }}
                  />
                ) : (
                  <Sparkles
                    className={cn(
                      "w-4 h-4 transition-opacity text-[#f9a215]",
                      inputValue ? "opacity-100" : "opacity-30"
                    )}
                  />
                )}
              </button>
            )}
            <button
              onClick={handleSubmit}
              className={cn(
                "rounded-xl py-1 px-1",
                submitted ? "bg-none" : "bg-white/10"
              )}
              type="button"
              disabled={submitted}
            >
              {submitted && !isEnhancing ? (
                <div
                  className="w-4 h-4 bg-[#f96815] rounded-sm animate-spin transition duration-700"
                  style={{ animationDuration: "3s" }}
                />
              ) : (
                <CornerRightUp
                  className={cn(
                    "w-4 h-4 transition-opacity text-[#f96815]",
                    inputValue ? "opacity-100" : "opacity-30"
                  )}
                />
              )}
            </button>
          </div>
        </div>
        <p className="pl-4 h-4 text-xs mx-auto text-white/70">
          {submitted ? "AI düşünüyor..." : "Göndermeye hazır!"}
        </p>
      </div>
    </div>
  );
} 