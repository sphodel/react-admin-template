import "../index.css";
import MenuItem from "./menuItem.tsx";
import menuItems, { filterMenuItems } from "./Navbar.tsx";
import { useSidebarFold } from "../pages/system/component/menuFold.tsx";
import { useTheme } from "./theme.tsx";
import { useAuth } from "./AuthContext.tsx";
const Menu = () => {
  const { fold } = useSidebarFold();
  const { mode } = useTheme();
  const { isAuthorized } = useAuth();
  const newMenuItems = filterMenuItems(menuItems, isAuthorized);
  return (
    <div
      className={`${fold ? "w-12" : "w-48"} flex flex-col h-screen border ${mode ? "border-[#2e2e2e] bg-[#2e2e2e]" : ""} overflow-auto menu`}
    >
      {newMenuItems.map((item, i) => (
        <MenuItem item={item} key={i} />
      ))}
    </div>
  );
};
export default Menu;
