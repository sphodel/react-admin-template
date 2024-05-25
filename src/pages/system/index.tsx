import { Button, Switch } from "antd";
import { useSidebar } from "./component/menuLocation.tsx";
import { useSidebarFold } from "./component/menuFold.tsx";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoonOutlined,
  SunOutlined,
} from "@ant-design/icons";
import { useTheme } from "../../component/theme.tsx";
const System = () => {
  const { right, toggleSidebar } = useSidebar();
  const { fold, toggleFold } = useSidebarFold();
  const { mode, toggleTheme } = useTheme();
  return (
    <div className={"flex"}>
      <div className={`flex-1 pl-6 flex flex-col`}>
        <div>
          <span className={"text-xl font-bold"}>将侧边栏移动到右侧：</span>
          <Switch onChange={toggleSidebar} checked={right} />
        </div>
        <div className={"flex items-center"}>
          <Button onClick={toggleFold} className={"flex items-center mr-3"}>
            {fold ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
          <span className={"py-6 text-xl font-bold"}>设置侧边栏是否折叠</span>
        </div>
        <div className={"flex items-center gap-4"}>
          <span>{mode ? "夜晚模式" : "白天模式"}</span>
          <Button
            onClick={toggleTheme}
            className={`flex items-center ${mode ? "bg-black text-white" : ""}`}
          >
            {mode ? <MoonOutlined /> : <SunOutlined />}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default System;
