import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";
import React, { useState, createContext, useContext } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface Links {
  label: string;
  href: string;
  icon: React.ReactNode;
  value: string;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SidebarContext = createContext<SidebarContextProps>({
  open: false,
  setOpen: () => {},
});

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  className,
  ...props
}: {
  children: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  className?: string;
  props?: any;
}) => {
  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      <div className={cn("flex", className)} {...props}>
        <DesktopSidebar>{children}</DesktopSidebar>
        <MobileSidebar>{children}</MobileSidebar>
      </div>
    </SidebarContext.Provider>
  );
};

export const SidebarBody = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  props?: any;
}) => {
  return (
    <div className={cn("flex flex-col", className)} {...props}>
      {children}
    </div>
  );
};

export const DesktopSidebar = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  props?: any;
}) => {
  const { open, setOpen } = useSidebar();
  return (
    <motion.div
      animate={{
        width: open ? "280px" : "80px",
      }}
      transition={{ duration: 0.3 }}
      className={cn(
        "hidden md:flex h-full bg-[#fad6a5] rounded-xl p-4",
        className
      )}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const MobileSidebar = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  props?: any;
}) => {
  const { open, setOpen } = useSidebar();
  return (
    <motion.div
      animate={{
        x: open ? "0%" : "-100%",
      }}
      transition={{ duration: 0.3 }}
      className={cn(
        "md:hidden fixed inset-y-0 left-0 w-[280px] bg-[#fad6a5] rounded-r-xl p-4 z-50",
        className
      )}
      {...props}
    >
      <button
        onClick={() => setOpen(false)}
        className="absolute top-4 right-4 text-neutral-700 dark:text-neutral-200"
      >
        <X size={24} />
      </button>
      {children}
    </motion.div>
  );
};

export const SidebarLink = ({
  link,
  className,
  onClick,
  ...props
}: {
  link: Links;
  className?: string;
  onClick?: () => void;
  props?: any;
}) => {
  const { open } = useSidebar();
  return (
    <Link
      to={link.href}
      className={cn(
        "flex items-center justify-start gap-2 group/sidebar py-2",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {link.icon}
      <motion.span
        animate={{
          display: open ? "inline-block" : "none",
          opacity: open ? 1 : 0,
        }}
        className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
      >
        {link.label}
      </motion.span>
    </Link>
  );
};
