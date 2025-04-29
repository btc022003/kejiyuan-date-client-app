import React from "react";
import { Form, Input, Button, NavBar, Toast } from "antd-mobile";
import { useNavigate } from "react-router";
import { updateUserPwdAPI } from "../../services/api";
function UserPwd() {
  const navigate = useNavigate();
  return (
    <div className="m-page">
      <NavBar
        onBack={() => {
          navigate(-1); // 回退
        }}
      >
        修改密码
      </NavBar>
      <Form
        onFinish={async (v) => {
          const res = await updateUserPwdAPI(v);
          if (res.success) {
            sessionStorage.removeItem("token");
            Toast.show("修改密码成功");
            navigate("/login");
          } else {
            Toast.show(res.errorMessage);
          }
        }}
      >
        <Form.Item
          label="原始密码"
          name="oldPassword"
          rules={[
            {
              required: true,
              message: "请输入原始密码",
            },
          ]}
        >
          <Input placeholder="请输入原始密码" type="password" />
        </Form.Item>
        <Form.Item
          label="新密码"
          name="password"
          rules={[
            {
              required: true,
              message: "请输入密码",
            },
          ]}
        >
          <Input placeholder="请输入原始密码" type="password" />
        </Form.Item>
        <Form.Item>
          <Button type="submit" color="danger" block>
            修改密码
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default UserPwd;
