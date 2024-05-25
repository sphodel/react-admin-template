import { createContext, useState, useContext } from "react";
interface SidebarFoldType {
  mode: boolean;
  toggleTheme: () => void;
}
const Theme = createContext<SidebarFoldType>();
export const ThemeChange = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const storedFold = localStorage.getItem("theme");
    return storedFold ? JSON.parse(storedFold) : false;
  });

  const toggleTheme = () => {
    setMode((prevMode) => {
      const newTheme = !prevMode;
      localStorage.setItem("theme", JSON.stringify(newTheme));
      return newTheme;
    });
  };

  return (
    <Theme.Provider value={{ mode, toggleTheme }}>{children}</Theme.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(Theme);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
