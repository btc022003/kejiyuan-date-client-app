import React from "react";
import { Form, Input, Button } from "antd-mobile";
import dm from "../assets/dm.png";
import { Link } from "react-router";
function LoginPage() {
  return (
    <div className="m-page p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800">江城科技馆欢迎你</h1>
        <p className="text-gray-600">全宇宙最大的科技馆</p>
        <img className="w-40 mx-auto block mt-4" src={dm} alt="Logo" />
      </div>
      <Form className="mt-8">
        <Form.Item
          name="userName"
          label="用户名"
          rules={[{ required: true, message: "请输入用户名" }]}
          className="mb-4"
        >
          <Input
            placeholder="请输入用户名"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[{ required: true, message: "请输入密码" }]}
          className="mb-4"
        >
          <Input
            placeholder="请输入密码"
            type="password"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="submit"
            color="primary"
            className="w-full  bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg py-2 px-4 hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring focus:ring-blue-300"
          >
            登录
          </Button>
        </Form.Item>
      </Form>
      <div className="text-right mt-4">
        <Link
          to="/reg"
          className="text-blue-500 hover:text-blue-600 focus:underline"
        >
          没有账号，我要注册&gt;&gt;
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
