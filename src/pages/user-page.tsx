import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import TabBar from "../components/tab-bar";
import { loadUserInfoAPI } from "../services/api";
import { dalImg } from "../utils/tools";
function UserPage() {
  const [userInfo, setUserInfo] = useState<IUser | undefined>();
  useEffect(() => {
    loadUserInfoAPI().then((res) => {
      setUserInfo(res.data);
    });
  }, []);
  const navigate = useNavigate();
  return (
    <div className="container m-page">
      <div className="user bg-white p-8 rounded-lg  max-w-md mx-auto m-page-content">
        <div className="avatar-container mb-8">
          <img
            src={dalImg(userInfo?.avatar)}
            className="avatar w-32 h-32 rounded-full mx-auto mb-4"
            alt="用户头像"
          />
          <p className="text-center text-xl font-semibold">
            用户名: {userInfo?.userName}
          </p>
        </div>

        <div className="m-ops space-y-2">
          <div
            className="op-item flex justify-between items-center border-b border-gray-200 pb-4"
            onClick={() => {
              navigate("/user/info", {
                state: userInfo,
              });
            }}
          >
            <span className="text-gray-700">个人信息</span>
            <span className="text-gray-500">{">"}</span>
          </div>
          <div
            className="op-item flex justify-between items-center border-b border-gray-200 pb-4"
            onClick={() => {
              navigate("/user/date");
            }}
          >
            <span className="text-gray-700">预约记录</span>
            <span className="text-gray-500">{">"}</span>
          </div>
          <div
            className="op-item flex justify-between items-center border-b border-gray-200 pb-4"
            onClick={() => {
              navigate("/user/collection");
            }}
          >
            <span className="text-gray-700">我的收藏</span>
            <span className="text-gray-500">{">"}</span>
          </div>
          <div
            className="op-item flex justify-between items-center border-b border-gray-200 pb-4"
            onClick={() => {
              navigate("/user/pwd");
            }}
          >
            <span className="text-gray-700">修改密码</span>
            <span className="text-gray-500">{">"}</span>
          </div>
          <div
            className="op-item flex justify-between items-center border-b border-gray-200 pb-4"
            onClick={() => {
              navigate("/user/family");
            }}
          >
            <span className="text-gray-700">家庭成员</span>
            <span className="text-gray-500">{">"}</span>
          </div>
        </div>

        <button
          className="bg-red-500 text-white px-6 w-3/5 py-3 mt-8 mx-auto block rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          onClick={() => {
            sessionStorage.removeItem("token");
            navigate("/");
          }}
        >
          退出登录
        </button>
      </div>
      <TabBar currentIndex={3} />
    </div>
  );
}

export default UserPage;
