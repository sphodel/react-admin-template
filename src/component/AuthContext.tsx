import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { initialPermissions, roles } from "./role.tsx";
interface PermissionType {
  [key: string]: string[];
}

interface AuthContextType {
  role: string;
  updateRole: (newRole: string) => void;
  isAuthorized: (path: string) => boolean;
  setNewPermission: (permission: PermissionType) => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [role, setRole] = useState(roles.admin);
  const [permission, setPermission] = useState(initialPermissions);
  const [newPermission, setNewPermission] = useState<{
    [key: string]: string[];
  }>();

  useEffect(() => {
    if (newPermission) {
      const role = Object.keys(newPermission)[0];
      const newp = newPermission[role];
      setPermission((prev) => ({
        ...prev,
        [role]: newp,
      }));
    }
  }, [newPermission]);
  const updateRole = (newRole: string) => {
    setRole(newRole);
  };
  const isAuthorized = (path: string) => permission[role].includes(path);
  return (
    <AuthContext.Provider
      value={{ role, updateRole, isAuthorized, setNewPermission }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
