import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { NavBar } from "antd-mobile";
import {
  delUserCollectionByIdAPI,
  loadUserCollectionsAPI,
} from "../../services/api";
import { dalImg } from "../../utils/tools";
function UserCollection() {
  const navigate = useNavigate();
  const [data, setData] = useState<ICollection[]>([]);
  const loadDataFromServer = () => {
    loadUserCollectionsAPI().then((res) => {
      // 过滤一下服务器返回的数据，如果展品不存在就不显示
      setData(res.data.filter((item: ICollection) => item.zhanPin));
    });
  };
  useEffect(() => {
    loadDataFromServer();
  }, []);
  return (
    <div className="m-page">
      <NavBar
        onBack={() => {
          navigate(-1); // 回退
        }}
      >
        我的收藏
      </NavBar>
      <div className="collections grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
        {data.length == 0 && (
          <div className="text-center text-gray-500">暂无数据</div>
        )}
        {data.map((item) => (
          <div
            className="item bg-white shadow-md rounded-lg overflow-hidden"
            key={item.id}
          >
            <img
              src={dalImg(item.zhanPin.image)}
              alt={item.zhanPin.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h1 className="text-xl font-semibold text-gray-800">
                {item.zhanPin.name}
              </h1>
              <button
                className="bg-red-500 text-white px-4 py-2 mt-4 rounded hover:bg-red-600"
                onClick={async () => {
                  await delUserCollectionByIdAPI(item.id);
                  loadDataFromServer();
                }}
              >
                删除
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserCollection;
