import "../index.css";
import MenuItem from "./menuItem.tsx";
import menuItems, { filterMenuItems } from "./Navbar.tsx";
import { useSidebarFold } from "../pages/system/component/menuFold.tsx";
import { useTheme } from "./theme.tsx";
import { useAuth } from "./AuthContext.tsx";
import { useEffect, useState } from "react";
const Menu = () => {
  const { fold } = useSidebarFold();
  const { mode } = useTheme();
  const { isAuthorized } = useAuth();
  const newMenuItems = filterMenuItems(menuItems, isAuthorized);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div
      className={`${fold || windowWidth <= 768 ? "w-12" : "w-48"} flex flex-col h-screen border ${mode ? "border-[#2e2e2e] bg-[#2e2e2e] menu-dark" : "menu"} overflow-auto `}
    >
      {newMenuItems.map((item, i) => (
        <MenuItem item={item} key={i} />
      ))}
    </div>
  );
};
export default Menu;
