import { useState, useEffect } from "react";
import { InfiniteScroll } from "antd-mobile";
import { useNavigate } from "react-router";
import TabBar from "../components/tab-bar";
import { loadHuoDongListAPI } from "../services/api";
import { dalImg, formatDate } from "../utils/tools";

function HuodongPage() {
  const [data, setData] = useState<IHuodongs[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  const loadDataFromServer = async () => {
    const res = await loadHuoDongListAPI(page);
    setData([...data, ...res.data.list]);
    // 计算一个总页数，用来处理没有更多数据的情况
    const totalPages = Math.ceil(res.data.total / 10);
    if (totalPages === page) {
      setHasMore(false);
    } else {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    //
    loadDataFromServer();
  }, []);
  return (
    <div className="container m-page">
      <div className="m-page-content">
        <h1 className="text-xl p-1 shadow shadow-gray-200">近期活动</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {data.map((item) => (
            <div
              className="zhanpin-item bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl p-2 transition-shadow cursor-pointer"
              onClick={() => navigate(`/detail/${item.id}`)} // 假设 navigate 是一个跳转函数
            >
              <img
                src={dalImg(item.image)}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="info p-4 bg-white">
                <h1 className="title text-xl font-bold mb-2">{item.name}</h1>
                <p className="text-sm text-gray-600">
                  活动时间:{" "}
                  <span className="font-medium">
                    {formatDate(item.huoDongShiJian)}
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  活动地点:{" "}
                  <span className="font-medium">{item.huoDongAddress}</span>
                </p>
                <p className="summary text-gray-700 text-base line-clamp-3 mt-2">
                  {item.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
        <InfiniteScroll
          loadMore={async () => {
            // console.log("加载更多");
            if (data.length > 0) {
              loadDataFromServer();
            }
          }}
          hasMore={hasMore}
          threshold={50}
        />
      </div>
      <TabBar currentIndex={2} />
    </div>
  );
}

export default HuodongPage;
