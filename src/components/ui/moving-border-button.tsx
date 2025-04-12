import { cn } from "@/lib/utils";

interface MovingBorderButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function MovingBorderButton({ children, onClick, className }: MovingBorderButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative inline-flex h-10 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50",
        className
      )}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#f96815_0%,#fad6a5_50%,#f96815_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-[#fdf2e4] px-4 py-1 text-sm font-medium text-[#1b100e] backdrop-blur-3xl">
        {children}
      </span>
    </button>
  );
} 