import React, { ReactNode, useEffect, useState } from "react";
import Submenu from "./Submenu.tsx";
import { DownOutlined } from "@ant-design/icons";
import { useSidebarFold } from "../pages/system/component/menuFold.tsx";
import Foldmenu from "./foldmenu.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "./theme.tsx";
type SubmenuItemType = {
  name: string;
  route: string;
  submenu?: SubmenuItemType[];
};
type itemType = {
  name: string;
  icon: ReactNode;
  route?: string;
  submenu?: SubmenuItemType[];
};
type menuItemProps = {
  item: itemType | SubmenuItemType;
};
const MenuItem: React.FC<menuItemProps> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const { t } = useTranslation();
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const { fold } = useSidebarFold();
  const navigate = useNavigate();
  const location = useLocation();
  const { mode } = useTheme();
  useEffect(() => {
    if (location.state) {
      setSelected(location.state.path);
    }
  }, [location.state]);
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
  return fold || windowWidth <= 768 ? (
    <Foldmenu item={item} />
  ) : (
    <div>
      {"submenu" in item ? (
        <div
          onClick={handleClick}
          className={`p-4 font-light text-gray-600 cursor-pointer flex justify-between ${mode ? "hover:bg-[#263445]" : "hover:bg-[#F0FCFF] hover:text-[#3EC0DD]"}`}
        >
          <div>
            {"icon" in item && item.icon}
            <span className={"text-sm pl-4"}>{t(item.name)}</span>
          </div>
          <div
            className={`flex text-xs font-light ${isOpen ? "rotate-180" : ""} ease-in-out duration-300`}
          >
            <DownOutlined />
          </div>
        </div>
      ) : (
        <div
          onClick={() => {
            navigate(`${item.route}`, { state: { path: item.route } });
          }}
        >
          <div
            className={`p-4 font-light text-gray-600 ${mode ? `hover:bg-[#263445] ${selected === item.route ? "bg-[#263445]" : ""}` : `hover:bg-[#F0FCFF] hover:text-[#3EC0DD] ${selected === item.route ? "bg-[#F0FCFF]" : ""}`}  focus:bg-[#DFF9FF] focus:font-medium focus:text-[#DFF9FF] focus:outline-none cursor-pointer `}
          >
            {"icon" in item && item.icon}
            <span className={"text-sm pl-4"}>{item.name}</span>
          </div>
        </div>
      )}
      <div className={"ease-in-out duration-300 overflow-hidden"}>
        {isOpen && item.submenu && <Submenu submenu={item.submenu} />}
      </div>
    </div>
  );
};
export default MenuItem;
