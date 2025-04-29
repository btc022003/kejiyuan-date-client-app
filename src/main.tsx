import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router";
import { ConfigProvider } from "antd-mobile";
import zhCN from "antd-mobile/es/locales/zh-CN";
import "./index.css";
import App from "./App.tsx";
import HomePage from "./pages/home-page.tsx";
import ZhanpinPage from "./pages/zhanpin-page.tsx";
import HuodongPage from "./pages/huodong-page.tsx";
import UserPage from "./pages/user-page.tsx";
import ErrorPage from "./pages/error-page.tsx";
import ZhanPinDetail from "./pages/zhan-pin-detail.tsx";
import LoginPage from "./pages/login.tsx";
import RegPage from "./pages/reg.tsx";
import PrivateRoute from "./components/private-route.tsx";
import UserInfoPage from "./pages/user/info.tsx";
import UserPwd from "./pages/user/pwd.tsx";
import UserCollection from "./pages/user/collection.tsx";
import UserFamily from "./pages/user/family.tsx";
import UserDateLogs from "./pages/user/date.tsx";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "zhan_pin",
        element: <ZhanpinPage />,
      },
      {
        path: "huo_dong",
        element: <HuodongPage />,
      },
      {
        path: "user",
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <UserPage />,
          },
          {
            path: "info",
            element: <UserInfoPage />,
          },
          {
            path: "pwd",
            element: <UserPwd />,
          },
          {
            path: "collection",
            element: <UserCollection />,
          },
          {
            path: "family",
            element: <UserFamily />,
          },
          {
            path: "date",
            element: <UserDateLogs />,
          },
        ],
      },
      {
        path: "zhan_pin/:id",
        element: <ZhanPinDetail />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "reg",
        element: <RegPage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <ConfigProvider locale={zhCN}>
    <RouterProvider router={router}></RouterProvider>
  </ConfigProvider>
);
