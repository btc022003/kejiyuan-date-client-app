import React, { useRef, useState } from "react";
import { UploadOutline } from "antd-mobile-icons";
import { useLocation, useNavigate } from "react-router";
import { post } from "../../utils/request";
import { dalImg } from "../../utils/tools";
import { updateUserInfoAPI } from "../../services/api";
import { NavBar, Toast } from "antd-mobile";
function UserInfoPage() {
  const { state } = useLocation();
  const fileRef = useRef<HTMLInputElement>(null);
  const txtRef = useRef<HTMLInputElement>(null);
  const txtMobileRef = useRef<HTMLInputElement>(null);
  const txtIdsRef = useRef<HTMLInputElement>(null);
  const [img, setImg] = useState(state.avatar || "");
  const navigate = useNavigate();

  return (
    <div className="m-page">
      <NavBar
        onBack={() => {
          navigate(-1); // 回退
        }}
      >
        修改个人信息
      </NavBar>
      {/* 使用原生标签实现文件上传以及数据录入操作 */}
      <input
        type="file"
        ref={fileRef}
        style={{ display: "none" }}
        onChange={(e) => {
          //
          const formData = new FormData();
          formData.append("file", e.target.files![0]);
          // 组织一个文件数据，进行上传
          post("/api/v1/common/upload", formData).then((res) => {
            // console.log(res);
            setImg(res.data.url);
          });
        }}
      />
      {img ? (
        <img
          className="w-40 h-40 rounded-full mx-auto mt-20 block"
          src={dalImg(img)}
          onClick={() => {
            fileRef.current?.click(); // 手动触发file的点击事件
          }}
          alt=""
        />
      ) : (
        <UploadOutline
          style={{ fontSize: 160 }}
          className="block mx-auto mt-20"
          onClick={() => {
            fileRef.current?.click(); // 手动触发file的点击事件
          }}
        />
      )}

      <input
        ref={txtRef}
        placeholder="请输入实名"
        defaultValue={state.trueName}
        className="w-4/5 block mx-auto mt-8 border-b border-rose-500 p-2"
      />
      <input
        ref={txtMobileRef}
        placeholder="请输入联系方式"
        defaultValue={state.mobile}
        className="w-4/5 block mx-auto mt-8 border-b border-rose-500 p-2"
      />
      <input
        ref={txtIdsRef}
        placeholder="请输入身份证号"
        defaultValue={state.ids}
        className="w-4/5 block mx-auto mt-8 border-b border-rose-500 p-2"
      />
      <button
        className="bg-rose-500 text-white p-2 rounded-lg block mx-auto mt-8 w-3/5"
        onClick={async () => {
          // 修改个人信息
          // console.log(txtIdsRef.current?.value);
          await updateUserInfoAPI({
            avatar: img,
            trueName: txtRef.current?.value as string,
            mobile: txtMobileRef.current?.value as string,
            ids: txtIdsRef.current?.value as string,
          });
          Toast.show("修改成功");
          navigate("/user");
        }}
      >
        保存
      </button>
    </div>
  );
}

export default UserInfoPage;
