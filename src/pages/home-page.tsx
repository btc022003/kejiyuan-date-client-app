import { useState, useEffect } from "react";
import { Swiper } from "antd-mobile";
import dm from "../assets/dm.png";
import TabBar from "../components/tab-bar";
import { loadHomeDataAPI } from "../services/api";
import { dalImg, formatDate } from "../utils/tools";

function HomePage() {
  const [data, setData] = useState<{
    banners: IBanners[];
    zhanPins: IZhanpins[];
    huoDongs: IHuodongs[];
  }>({
    banners: [],
    zhanPins: [],
    huoDongs: [],
  });
  useEffect(() => {
    loadHomeDataAPI().then((res) => {
      setData({
        banners: res.data.banners,
        zhanPins: res.data.hot_zhanpins,
        huoDongs: res.data.hot_huodongs,
      });
    });
  }, []);
  return (
    <div className="container m-page">
      <div className="m-page-content">
        <Swiper
          trackOffset={10}
          slideSize={80}
          style={
            {
              // "--border-radius": "8px",
            }
          }
          defaultIndex={0}
        >
          {data.banners.map((item) => (
            <Swiper.Item key={item.id}>
              <img src={dalImg(item.image)} alt="" className="w-full" />
            </Swiper.Item>
          ))}
        </Swiper>
        <div className="flex flex-row items-center justify-between p-8 bg-white shadow-md rounded-lg max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            <img
              src={dm}
              alt="科技馆"
              className="w-24 h-24 border border-gray-200"
            />
            <div className="info">
              <h1 className="text-2xl font-bold text-gray-800">江城科技馆</h1>
              <p className="text-gray-600">开放时间: 8:00-18:00</p>
              <p className="text-gray-600">全年无休，如需参观，提前预约</p>
            </div>
          </div>
          <div className="right">
            <button className="btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
              预约
            </button>
          </div>
        </div>
        <div className="zhan-pins mx-auto max-w-6xl py-8 ">
          <h1 className="text-2xl font-bold text-left mb-4 text-white bg-sky-600 inline-block px-4 py-1">
            热门展品
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {data.zhanPins.map((item) => (
              <div
                key={item.id}
                className="zhanpin-item bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl p-2 transition-shadow flex"
              >
                <img
                  src={dalImg(item.image)}
                  alt={item.name}
                  className="w-1/3 object-cover"
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
        </div>

        <div className="zhan-pins mx-auto max-w-6xl py-8 ">
          <h1 className="text-2xl font-bold text-left mb-4 text-white bg-sky-600 inline-block px-4 py-1">
            近期活动
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {data.huoDongs.map((item) => (
              <div
                key={item.id}
                className="zhanpin-item bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl p-2 transition-shadow"
              >
                <img
                  src={dalImg(item.image)}
                  alt={item.name}
                  className="w-full"
                />
                <div className="info p-2 gap-2">
                  <h1 className="title text-xl mb-2">{item.name}</h1>
                  <p className="font-bold">
                    活动时间:{formatDate(item.huoDongShiJian)}
                  </p>
                  <p className="font-bold">活动地址:{item.huoDongAddress}</p>
                  <p className="summary text-gray-700 font-mono line-clamp-3">
                    {item.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <TabBar currentIndex={0} />
    </div>
  );
}

export default HomePage;
