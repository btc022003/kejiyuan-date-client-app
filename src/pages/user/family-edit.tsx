import { useEffect } from "react";
import { NavBar, Toast, Form, Input, Button } from "antd-mobile";
import { useNavigate, useLocation } from "react-router";
import { addUserFamilyAPI, editUserFamilyAPI } from "../../services/api";

function FamilyEditPage() {
  const navigate = useNavigate();
  const [myForm] = Form.useForm();
  const { state } = useLocation();
  const id = state ? state.id : null;

  useEffect(() => {
    if (id) {
      myForm.setFieldsValue(state);
    }
  }, []);

  return (
    <div className="m-page flex flex-col items-center min-h-screen bg-gray-100 p-8">
      <NavBar
        onBack={() => {
          navigate(-1); // 回退
        }}
        className="w-full mb-8"
      >
        家庭成员编辑
      </NavBar>
      <Form
        form={myForm}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
        onFinish={async (v) => {
          let res = {
            success: false,
            errorMessage: "",
          };
          // 根据当前id判断是新增还是修改
          if (id) {
            //
            res = await editUserFamilyAPI(id, v);
          } else {
            //
            res = await addUserFamilyAPI(v);
          }

          if (res.success) {
            Toast.show("保存成功");
            navigate(-1);
          } else {
            Toast.show(res.errorMessage);
          }
        }}
      >
        <Form.Item
          label="姓名"
          name="realName"
          rules={[
            {
              required: true,
              message: "请输入姓名",
            },
          ]}
          className="mb-4"
        >
          <Input placeholder="请输入姓名" className="w-full" />
        </Form.Item>
        <Form.Item
          label="身份证号"
          name="ids"
          rules={[
            {
              required: true,
              message: "请输入身份证号",
            },
          ]}
          className="mb-4"
        >
          <Input placeholder="请输入身份证号" className="w-full" />
        </Form.Item>
        <Form.Item
          label="联系方式"
          name="mobile"
          rules={[
            {
              required: true,
              message: "请输入联系方式",
            },
          ]}
          className="mb-4"
        >
          <Input placeholder="请输入联系方式" className="w-full" />
        </Form.Item>
        <Form.Item>
          <Button
            type="submit"
            color="primary"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
          >
            保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default FamilyEditPage;
