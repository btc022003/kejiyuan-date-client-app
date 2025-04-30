import { useState, useEffect } from "react";
import { NavBar, SwipeAction, Toast } from "antd-mobile";
import { useNavigate } from "react-router";
import { AddOutline } from "antd-mobile-icons";
import { delUserFamilyByIdAPI, loadUserFamiliesAPI } from "../../services/api";

function UserFamily() {
  const [data, setData] = useState<IUserFamily[]>([]);
  const loadDataFromServer = () => {
    loadUserFamiliesAPI().then((res) => {
      setData(res.data);
    });
  };
  useEffect(() => {
    loadDataFromServer();
  }, []);
  const navigate = useNavigate();
  return (
    <div className="m-page flex flex-col">
      <NavBar
        onBack={() => {
          navigate(-1);
        }}
        right={
          <>
            <AddOutline
              className="float-right font-bold text-xl"
              onClick={() => {
                navigate("/user/family/edit");
              }}
            />
          </>
        }
      >
        家庭成员
      </NavBar>
      <div className="flex-1 overflow-auto">
        {data.map((item) => (
          <SwipeAction
            key={item.id}
            rightActions={[
              {
                text: "删除",
                key: "delete",
                color: "red",
                onClick: async () => {
                  await delUserFamilyByIdAPI(item.id);
                  Toast.show("删除成功");
                  loadDataFromServer(); // 重新加载数据
                },
              },
            ]}
          >
            <div className="item-person bg-white p-6 rounded-lg shadow-md w-96 mb-4">
              <h3 className="text-2xl font-bold text-gray-800">
                {item.realName}
              </h3>
              <p className="text-gray-600 mt-2">
                联系方式: <span className="font-medium">{item.mobile}</span>
              </p>
              <p className="text-gray-600">
                身份证号: <span className="font-medium">{item.ids}</span>
              </p>
              <div className="op flex justify-end mt-4">
                {/* <button
                  className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded-l-md"
                  onClick={async () => {
                    await delUserFamilyByIdAPI(item.id);
                    Toast.show("删除成功");
                    loadDataFromServer(); // 重新加载数据
                  }}
                >
                  删除
                </button> */}
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r-md"
                  onClick={() => {
                    navigate("/user/family/edit", {
                      state: item,
                    });
                  }}
                >
                  编辑
                </button>
              </div>
            </div>
          </SwipeAction>
        ))}
      </div>
    </div>
  );
}

export default UserFamily;
