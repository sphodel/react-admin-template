import MenuItem from "./menuItem.tsx";
import React from "react";
type SubmenuItemType = {
  name: string;
  route: string;
  submenu?: SubmenuItemType[];
};

type SubmenuProps = {
  submenu: SubmenuItemType[];
};
const Submenu: React.FC<SubmenuProps> = ({ submenu }) => {
  return (
    <div className={"pl-3"}>
      {submenu.map((item, index) => (
        <MenuItem key={index} item={item} />
      ))}
    </div>
  );
};
export default Submenu;
