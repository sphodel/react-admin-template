import { Button, Input, message } from "antd";
import { useState } from "react";
import { gql } from "@apollo/client";
import { client } from "../../component/client.ts";
import { useNavigate } from "react-router-dom";
const ADD_NEW_USER =
  gql(`mutation NEW_USER($email: String!, $name: String!, $password: String!) {
  insert_users_one(object: {email: $email, name: $name, password: $password}) {
    id
  }
}`);
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const handleAdd = async () => {
    await client.mutate({
      mutation: ADD_NEW_USER,
      variables: { email: email, name: name, password: password },
    });
    void messageApi.open({
      type: "success",
      content: "注册成功",
    });
    navigate("/dashboard");
  };
  return (
    <div
      className={
        "h-screen w-screen bg-[#F9FAFB] flex items-center justify-center"
      }
    >
      {contextHolder}
      <div
        style={{ width: "565px", height: "488px" }}
        className={"bg-white flex flex-col px-16"}
      >
        <h2
          style={{ textAlign: "center" }}
          className={"text-4xl pt-9 pb-6 text-[#7E7E7E]"}
        >
          注册
        </h2>
        <div className={"py-9"}>
          <Input
            placeholder={"请输入姓名"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="邮箱"
            className={"my-6"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input.Password
            placeholder="密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button
          type="primary"
          htmlType="submit"
          className={"h-14 text-2xl font-light"}
          block
          onClick={async () => await handleAdd()}
        >
          注册
        </Button>
        <div className={"pt-8"}>
          <div className={"flex justify-between"}>
            <div>
              已有账号?
              <a href="login" className={"text-[#387AFF]"}>
                返回登录
              </a>
            </div>
            <a href="#">登录遇到问题？</a>
          </div>
          <div style={{ marginTop: 20 }} className={"flex justify-center"}>
            登陆即代表同意《<a href="#">服务协议</a>》及《
            <a href="#">用户隐私条款</a>》
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
