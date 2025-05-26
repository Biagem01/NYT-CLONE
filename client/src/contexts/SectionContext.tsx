import { createContext, useContext, ReactNode, useMemo } from "react";
import { useLocation } from "wouter";

interface SectionContextType {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const SectionContext = createContext<SectionContextType | undefined>(undefined);

export function SectionProvider({ children }: { children: ReactNode }) {
  const [location, navigate] = useLocation();

  // Estrai la sezione dall'URL
  const match = location.match(/^\/([^/]+)/);
  const activeSection = match ? match[1] : "home";

  // Quando chiama setActiveSection, navighi al path giusto
  const setActiveSection = (section: string) => {
    navigate(`/${section}`);
  };

  // Memo per evitare ricreazioni inutili del context
  const value = useMemo(
    () => ({ activeSection, setActiveSection }),
    [activeSection]
  );

  return (
    <SectionContext.Provider value={value}>
      {children}
    </SectionContext.Provider>
  );
}

export function useSection() {
  const context = useContext(SectionContext);
  if (!context) {
    throw new Error("useSection must be used within a SectionProvider");
  }
  return context;
}
