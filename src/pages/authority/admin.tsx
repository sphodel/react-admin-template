import { Button, Input, message, Modal, Table, Tree } from "antd";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../component/AuthContext.tsx";
interface DataType {
  role: string;
  name: string;
  describe: string;
  key: string;
}
const initialPermissions = {
  admin: ["1", "2", "8", "9", "3", "4", "5", "10", "11", "12", "13", "6", "7"],
  user: ["1", "8", "3", "4", "5", "10", "11", "12", "13", "6", "7"],
  guest: ["1"],
};
const Admin = () => {
  const { setNewPermission } = useAuth();
  const [name, setName] = useState("");
  const [role, setRole] = useState("admin");
  const [des, setDes] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [roleAuth, setRoleAuth] = useState("admin");
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [permissions, setPermissions] = useState<{ [key: string]: string[] }>(
    initialPermissions,
  );
  const columns = [
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "describe",
      key: "describe",
    },
    {
      title: "Action",
      key: "action",
      render: (record: { key: React.Key; role: string }) => (
        <div className={"flex gap-3"}>
          <Button
            type="link"
            className={"bg-blue-500 text-white"}
            onClick={() => showModalAuth(record.role)}
          >
            编辑权限
          </Button>
          <Button
            className={"bg-red-600 text-white"}
            onClick={() => handleDelete(record.key)}
          >
            删除
          </Button>
        </div>
      ),
    },
  ];
  const treeData = [
    {
      title: "首页",
      key: "1",
      route: "/dashboard",
    },
    {
      title: "权限测试",
      key: "2",
      children: [
        {
          title: "页面权限",
          key: "8",
          route: "/permission/page",
        },
        {
          title: "角色权限",
          key: "9",
          route: "/permission/admin",
        },
      ],
    },
    {
      title: "表格",
      key: "3",
      route: "/table",
    },
    {
      title: "错误页面",
      key: "4",
      route: "/error-page",
    },
    {
      title: "路由嵌套",
      key: "5",
      children: [
        {
          title: "菜单1",
          key: "10",
          route: "/menu/menu1",
        },
        {
          title: "菜单2",
          key: "11",
          children: [
            {
              title: "菜单2-1",
              key: "12",
              route: "/menu/menu2/menu2-1",
            },
            {
              title: "菜单2-2",
              key: "13",
              route: "/menu/menu2/menu2-2",
            },
          ],
        },
      ],
    },
    {
      title: "国际化",
      key: "6",
      route: "/internation",
    },
    {
      title: "系统布局配置",
      key: "7",
      route: "/setting",
    },
  ];

  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      key: "0",
      role: "admin",
      name: "管理员",
      describe: "Super Administrator. Have access to view all pages.",
    },
    {
      key: "1",
      role: "user",
      name: "用户",
      describe: "Normal Editor. Can see all pages except permission page",
    },
    {
      key: "2",
      role: "guest",
      name: "游客",
      describe:
        "Just a visitor. Can only see the home page and the document page",
    },
  ]);
  const { TextArea } = Input;
  const showModal = () => {
    setIsModalOpen(true);
  };
  const showModalAuth = (role: string) => {
    setRoleAuth(role);
    setSelectedKeys(permissions[role]);
    setIsAuthOpen(true);
  };
  const handleCancelAuth = () => {
    setIsAuthOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk = () => {
    if (roleAuth) {
      if (selectedKeys.length > 0) {
        setPermissions((prev) => ({ ...prev, [roleAuth]: selectedKeys }));
        setIsAuthOpen(false);
      } else {
        void messageApi.open({
          type: "error",
          content: "至少保留一个页面",
        });
        return;
      }
    }
  };
  const onCheck = (keys: any) => {
    setSelectedKeys(keys);
  };
  const handleAdd = () => {
    const newData: DataType = {
      role: role,
      name: name,
      describe: des,
      key: `${dataSource.length}`,
    };
    setDataSource([...dataSource, newData]);
    setIsModalOpen(false);
  };
  const handleDelete = (key: React.Key) => {
    const roleName = dataSource.find((data) => data.key === key);
    if (roleName.role == "admin") {
      void messageApi.open({
        type: "error",
        content: "无法删除管理员账号",
      });
      return;
    }
    if (dataSource.length == 1) {
      void messageApi.open({
        type: "error",
        content: "至少保留一个账号",
      });
      return;
    } else {
      void messageApi.open({
        type: "success",
        content: "删除成功",
      });
    }

    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };
  useEffect(() => {
    const newPermissionRoutes = [];
    const newRoute = (data) => {
      if (data.route && permissions[roleAuth].includes(data.key)) {
        newPermissionRoutes.push(data.route);
      }
      if (data.children) {
        data.children.forEach((child) => newRoute(child));
      }
    };

    treeData.forEach((data) => newRoute(data));
    setNewPermission({ [roleAuth]: newPermissionRoutes });
  }, [permissions, roleAuth]);
  return (
    <div className={"flex"}>
      {contextHolder}
      <Modal
        onCancel={handleCancel}
        onOk={handleAdd}
        open={isModalOpen}
        closable={false}
      >
        <div className={"flex flex-col"}>
          <div className={"flex gap-4 pb-4"}>
            <select
              className={"flex-1 border"}
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value={"admin"}>admin</option>
              <option value={"user"}>user</option>
              <option value={"guest"}>guest</option>
            </select>
            <Input
              className={"flex-1"}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={"请输入名字"}
            />
          </div>
          <TextArea
            placeholder={"请输入描述"}
            style={{ resize: "none" }}
            maxLength={8}
            onChange={(e) => setDes(e.target.value)}
          />
        </div>
      </Modal>
      <Modal
        onCancel={handleCancelAuth}
        open={isAuthOpen}
        closable={false}
        onOk={handleOk}
      >
        <Tree
          checkable
          defaultExpandAll
          checkedKeys={selectedKeys}
          onCheck={onCheck}
          treeData={treeData}
        />
      </Modal>
      <div className={"flex-1 pl-6 "}>
        <Button className={"my-6 bg-blue-500 text-white"} onClick={showModal}>
          添加用户
        </Button>
        <Table columns={columns} dataSource={dataSource} pagination={false} />
      </div>
    </div>
  );
};
export default Admin;
