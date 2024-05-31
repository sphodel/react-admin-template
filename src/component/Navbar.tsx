import {
  CloseCircleOutlined,
  GlobalOutlined,
  HomeOutlined,
  LockOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  TableOutlined,
} from "@ant-design/icons";
import { ReactNode } from "react";
const menuItems = [
  {
    name: "首页",
    icon: <HomeOutlined />,
    route: "/dashboard",
  },
  {
    name: "权限测试",
    icon: <LockOutlined />,
    route: "/permission/page",
    submenu: [
      {
        name: "页面权限",
        route: "/permission/page",
      },
      {
        name: "角色权限(管理员列表）",
        route: "/permission/admin",
      },
    ],
  },
  {
    name: "表格",
    icon: <TableOutlined />,
    route: "/table",
  },
  {
    name: "错误页面",
    icon: <CloseCircleOutlined />,
    route: "/error-page",
  },
  {
    name: "路由嵌套",
    icon: <MenuUnfoldOutlined />,
    route: "/menu/menu1",
    submenu: [
      {
        name: "菜单1",
        route: "/menu/menu1",
      },
      {
        name: "菜单2",
        route: "/menu/menu2",
        submenu: [
          {
            name: "菜单2-1",
            route: "/menu/menu2/menu2-1",
          },
          {
            name: "菜单2-2",
            route: "/menu/menu2/menu2-2",
          },
        ],
      },
    ],
  },
  {
    name: "国际化",
    icon: <GlobalOutlined />,
    route: "/internation",
  },
  {
    name: "系统布局配置",
    icon: <SettingOutlined />,
    route: "/setting",
  },
  {
    name: "退出",
    icon: <LogoutOutlined />,
    route: "/Auth/login",
  },
];
interface MenuItem {
  name: string;
  icon: ReactNode;
  route: string;
  submenu?: MenuItem[];
}
export const filterMenuItems = (
  items: MenuItem[],
  isAuthorized: (path: string) => boolean,
) => {
  return items
    .map((item) => {
      if (item.submenu) {
        const filteredSubmenu = filterMenuItems(item.submenu, isAuthorized);
        if (filteredSubmenu.length > 0) {
          return { ...item, submenu: filteredSubmenu };
        }
      } else if (isAuthorized(item.route)) {
        return item;
      }
      return null;
    })
    .filter((item) => item !== null);
};
export default menuItems;
