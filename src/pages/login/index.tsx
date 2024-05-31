import { Input, Button, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../component/theme.tsx";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const handleLogin = () => {
    if (email == "123456" && password == "123456") {
      const data = { email: email, password: password };
      localStorage.setItem("account", JSON.stringify(data));
      void messageApi.open({
        type: "success",
        content: "登录成功",
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
      return;
    }
    void messageApi.open({
      type: "error",
      content: "账号不存在",
    });
    return;
  };
  const { mode } = useTheme();
  return (
    <div
      className={`h-screen w-screen flex items-center justify-center ${mode ? "bg-[#1e1e1e] text-white" : "bg-[#F9FAFB]"}`}
    >
      {contextHolder}
      <div
        style={{ width: "565px", height: "488px" }}
        className={`flex flex-col px-16 ${mode ? "bg-[#2e2e2e]" : "bg-white"}`}
      >
        <h2
          style={{ textAlign: "center" }}
          className={"text-4xl pt-9 pb-6 text-[#7E7E7E]"}
        >
          登录
        </h2>
        <Input
          placeholder="邮箱"
          className={"mb-6"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input.Password
          className={"mb-6"}
          placeholder="密码"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="primary"
          htmlType="submit"
          className={"h-14 text-2xl font-light"}
          block
          onClick={handleLogin}
        >
          登录
        </Button>
        <div className={"pt-8"}>
          <div className={"flex justify-between"}>
            <div>
              未有账号?
              <a href="register" className={"text-[#387AFF]"}>
                立即注册
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
export default Login;
