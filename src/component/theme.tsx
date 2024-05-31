import { createContext, useState, useContext } from "react";
import { ConfigProvider, theme } from "antd";
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
    <ConfigProvider
      theme={{
        algorithm: mode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Theme.Provider value={{ mode, toggleTheme }}>{children}</Theme.Provider>
    </ConfigProvider>
  );
};

export const useTheme = () => {
  const context = useContext(Theme);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
