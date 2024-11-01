// context/ThemeContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Theme, ThemeContextType } from "./type";

// Default theme is dark
const defaultContextValue: ThemeContextType = {
  theme: "dark",
  toggleTheme: () => { },
};

const ThemeContext = createContext<ThemeContextType>(defaultContextValue);

// eslint-disable-next-line react-refresh/only-export-components
export const useThemeContext = () => {
  return useContext(ThemeContext);
};

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, defaultTheme = "dark" }) => {

  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    if(typeof window !== "undefined") {
      if(theme === "light"){
        localStorage.setItem("theme",  "dark");
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      } else {
        localStorage.setItem("theme",  "light");
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localTheme = localStorage.getItem("theme");
      if (localTheme) {
        setTheme(localTheme);
        document.documentElement.classList.add(localTheme);
      }
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};