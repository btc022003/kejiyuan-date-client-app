import { useState, useEffect } from "react";
import { InfiniteScroll } from "antd-mobile";
import { useNavigate } from "react-router";
import TabBar from "../components/tab-bar";
import { loadZhanPinListAPI } from "../services/api";
import { dalImg } from "../utils/tools";

function ZhanpinPage() {
  const [data, setData] = useState<IZhanpins[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  const loadDataFromServer = async () => {
    const res = await loadZhanPinListAPI(page);
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
        <h1 className="text-xl p-1 shadow shadow-gray-200">热门展品</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {data.map((item) => (
            <div
              key={item.id}
              className="zhanpin-item bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl p-2 transition-shadow flex"
            >
              <img
                src={dalImg(item.image)}
                alt={item.name}
                className="w-1/3 object-cover"
                onClick={() => {
                  navigate("/zhan_pin/" + item.id);
                }}
              />
              <div className="info p-2">
                <h1 className="title text-xl mb-2">{item.name}</h1>
                <p className="summary text-gray-700 text-base line-clamp-3">
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
      <TabBar currentIndex={1} />
    </div>
  );
}

export default ZhanpinPage;
