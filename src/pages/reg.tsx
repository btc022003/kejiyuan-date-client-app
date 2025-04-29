import React from "react";
import { Form, Input, Button } from "antd-mobile";
import dm from "../assets/dm.png";
import { Link } from "react-router";
function RegPage() {
  return (
    <div className="m-page p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800">江城科技馆欢迎你</h1>
        <p className="text-gray-600">全宇宙最大的科技馆</p>
        <img className="w-40 mx-auto block mt-4" src={dm} alt="Logo" />
      </div>
      <Form className="mt-8">
        <Form.Item
          name="userName"
          label="用户名"
          rules={[
            {
              required: true,
              message: "请输入用户名",
            },
          ]}
        >
          <Input
            placeholder="请输入用户名"
            clearable
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[
            {
              required: true,
              message: "请输入密码",
            },
          ]}
        >
          <Input
            placeholder="请输入密码"
            clearable
            type="password"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </Form.Item>
        <Form.Item
          name="repassword"
          label="确认密码"
          rules={[
            {
              required: true,
              message: "请再一次输入密码",
            },
          ]}
        >
          <Input
            placeholder="请输入密码"
            clearable
            type="password"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </Form.Item>
        <Form.Item>
          <Button type="submit" color="primary" block>
            登录
          </Button>
        </Form.Item>
      </Form>
      <Link to="/login" className="text-right">
        已有账号，我要登录&gt;&gt;
      </Link>
    </div>
  );
}

export default RegPage;
