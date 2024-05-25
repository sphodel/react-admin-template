// src/Layout.tsx
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Menu from "./menu.tsx";
import { useTheme } from "./theme.tsx";
import { useSidebar } from "../pages/system/component/menuLocation.tsx";

const Layout: React.FC = () => {
  const { mode } = useTheme();
  const { right } = useSidebar();
  const navigate = useNavigate();
  useEffect(() => {
    const data = localStorage.getItem("account");
    if (data) {
      return;
    }
    navigate("/Auth/login");
  }, []);
  return (
    <div className={`flex ${mode ? "bg-[#242525] text-white" : ""}`}>
      <div className={` ${right ? "order-1" : ""}`}>
        <Menu />
      </div>
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
