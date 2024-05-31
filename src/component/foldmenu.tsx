import React, { ReactNode } from "react";
import { Popover } from "antd";

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

const Foldmenu: React.FC<menuItemProps> = ({ item }) => {
  const content = (
    <div className={"flex w-20 flex-col gap-6"}>
      {item.submenu?.map((im, i) => (
        <a key={i} href={im.route}>
          {im.submenu ? (
            <Popover
              content={
                <div className={"flex w-20 flex-col gap-6"}>
                  {im.submenu?.map((sub, i) => (
                    <a key={i} href={sub.route}>
                      {sub.name}
                    </a>
                  ))}
                </div>
              }
              placement={"left"}
            >
              {im.name}
            </Popover>
          ) : (
            <div>{im.name}</div>
          )}
        </a>
      ))}
    </div>
  );
  return item.submenu ? (
    <Popover content={content} placement={"right"}>
      <a
        className={
          "p-4 font-light text-gray-600 hover:bg-[#F0FCFF] hover:text-[#3EC0DD] cursor-pointer flex-col"
        }
        href={item.route}
      >
        <div>{"icon" in item && item.icon}</div>
      </a>
    </Popover>
  ) : (
    <a
      className={
        "p-4 font-light text-gray-600 hover:bg-[#F0FCFF] hover:text-[#3EC0DD] cursor-pointer flex-col"
      }
      href={item.route}
    >
      <div>{"icon" in item && item.icon}</div>
    </a>
  );
};
export default Foldmenu;
