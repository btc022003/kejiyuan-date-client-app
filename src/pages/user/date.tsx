import { NavBar } from "antd-mobile";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { loadUserDateLogsAPI } from "../../services/api";
import { formatDate } from "../../utils/tools";

function UserDateLogs() {
  const navigate = useNavigate();
  const [data, setData] = useState<IUserDate[]>([]);
  const loadDataFromServer = async () => {
    const res = await loadUserDateLogsAPI();
    // console.log(res);
    setData(res.data);
  };
  useEffect(() => {
    loadDataFromServer();
  }, []);
  return (
    <div className="m-page flex flex-col">
      <NavBar
        onBack={() => {
          navigate(-1);
        }}
      >
        预约记录
      </NavBar>
      <div className="list-date flex-1 overflow-auto p-6 bg-gray-100">
        {data.map((item) => (
          <div
            key={item.id}
            className="date-item bg-white p-4 mb-4 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              预约时间: {formatDate(item.dateShiJian)}
            </h3>
            <div className="p-list">
              {item.userDateFamilies.map((p) => (
                <div
                  key={p.id}
                  className="p-item border-b border-gray-200 pb-4 last:border-b-0"
                >
                  <h2 className="text-lg font-semibold text-gray-700">
                    {p.userFamily?.realName}
                  </h2>
                  <p className="text-gray-600">
                    联系方式:{" "}
                    <span className="font-medium">{p.userFamily?.mobile}</span>
                  </p>
                  <p className="text-gray-600">
                    身份证号:{" "}
                    <span className="font-medium">{p.userFamily?.ids}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserDateLogs;
