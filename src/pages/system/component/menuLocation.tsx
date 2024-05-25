import { createContext, useState, useContext } from "react";

interface SidebarContextType {
  right: boolean;
  toggleSidebar: (check: boolean) => void;
}
const SidebarContext = createContext<SidebarContextType>();
export const SidebarProvider = ({ children }) => {
  const [right, setRight] = useState(() => {
    const storedRight = localStorage.getItem("sidebarRight");
    return storedRight ? JSON.parse(storedRight) : false;
  });

  const toggleSidebar = (check: boolean) => {
    setRight(check);
    localStorage.setItem("sidebarRight", JSON.stringify(check));
  };

  return (
    <SidebarContext.Provider value={{ right, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
