import { Button } from "antd";
import { useAuth } from "../../component/AuthContext.tsx";

const Authority = () => {
  const { updateRole, role } = useAuth();
  return (
    <div className={"flex"}>
      <div className={`flex-1 pl-6 flex flex-col gap-6`}>
        <span className={"text-xl font-bold"}>你的权限：{role}</span>
        <div className={"flex gap-4"}>
          <Button
            onClick={() => {
              updateRole("admin");
            }}
            type={"primary"}
          >
            管理员
          </Button>
          <Button
            onClick={() => {
              updateRole("user");
            }}
            type={"primary"}
          >
            用户
          </Button>
          <Button
            onClick={() => {
              updateRole("guest");
            }}
            type={"primary"}
          >
            游客
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Authority;
