export const roles = {
  admin: "admin",
  user: "user",
  guest: "guest",
};
export const initialPermissions = {
  [roles.admin]: [
    "/dashboard",
    "/permission/admin",
    "/permission/page",
    "/table",
    "/error-page",
    "/menu/menu1",
    "/menu/menu2/menu2-1",
    "/menu/menu2/menu2-2",
    "/setting",
    "/Auth/login",
    "/Auth/register",
  ],
  [roles.user]: [
    "/dashboard",
    "/permission/page",
    "/table",
    "/error-page",
    "/menu/menu1",
    "/menu/menu2/menu2-1",
    "/menu/menu2/menu2-2",
    "/setting",
    "/Auth/login",
    "/Auth/register",
  ],
  [roles.guest]: ["/dashboard", "/login", "/Auth/login", "/Auth/register"],
};
