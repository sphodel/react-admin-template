import { createContext, useState, useContext } from "react";

interface SidebarFoldType {
  fold: boolean;
  toggleFold: () => void;
}
const SidebarFold = createContext<SidebarFoldType>();
export const IsSidebarFold = ({ children }) => {
  const [fold, setFold] = useState(() => {
    const storedFold = localStorage.getItem("sidebarFold");
    return storedFold ? JSON.parse(storedFold) : false;
  });

  const toggleFold = () => {
    setFold((prevFold) => {
      const newFold = !prevFold;
      localStorage.setItem("sidebarFold", JSON.stringify(newFold));
      return newFold;
    });
  };

  return (
    <SidebarFold.Provider value={{ fold, toggleFold }}>
      {children}
    </SidebarFold.Provider>
  );
};

export const useSidebarFold = () => {
  const context = useContext(SidebarFold);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
