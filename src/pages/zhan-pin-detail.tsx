import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { loadZhanPinByIdAPI, loadZhanPinComments } from "../services/api";
import { dalImg, formatDate } from "../utils/tools";
import { Tabs, Form, TextArea, Button } from "antd-mobile";

function ZhanPinDetail() {
  const { id } = useParams();
  const [data, setData] = useState<IZhanpins | null>();
  const [comments, setComments] = useState<IZhanPinComment[]>([]);

  const loadCommentsFromServer = async () => {
    const res = await loadZhanPinComments(id);
    // console.log(res);
    setComments([...comments, ...res.data.list]);
  };

  useEffect(() => {
    loadZhanPinByIdAPI(id!).then((res) => {
      setData(res.data);
    });
    loadCommentsFromServer();
  }, []);
  return (
    <div className="container mx-auto max-w-4xl p-2 bg-white rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <img
          src={dalImg(data?.image)}
          alt={data?.name}
          className="w-full md:w-64 h-64 object-cover rounded-lg"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800">{data?.name}</h1>
          <p className="text-gray-600 mt-2">{data?.summary}</p>
        </div>
      </div>
      <hr className="my-6 border-gray-300" />
      <Tabs>
        <Tabs.Tab title="详情" key={1}>
          <div className="content">
            <div
              dangerouslySetInnerHTML={{ __html: data?.content || "" }}
              className="text-gray-700 leading-relaxed"
            ></div>
          </div>
        </Tabs.Tab>
        <Tabs.Tab title="评论" key={2}>
          <>
            <Form
              layout="horizontal"
              onFinish={(v) => {
                console.log(v);
              }}
            >
              <Form.Item name="content">
                <TextArea placeholder="请输入评论内容" />
              </Form.Item>
              <Form.Item>
                <Button type="submit" color="primary">
                  提交
                </Button>
              </Form.Item>
            </Form>
            <div className="comments">
              {comments.map((item) => (
                <div
                  key={item.id}
                  className="comment-item p-4 bg-white rounded-lg shadow-md mb-4"
                >
                  <h2 className="text-gray-800 text-lg font-semibold mb-2">
                    {item.content}
                  </h2>
                  <hr className="border-gray-200 my-2" />
                  <div className="c-user-info flex items-center">
                    <img
                      className="avatar w-10 h-10 rounded-full mr-2"
                      src={dalImg(item.user.avatar)}
                      alt={item.user.userName}
                    />
                    <div>
                      <span className="text-gray-700 font-medium">
                        {item.user.userName}
                      </span>
                      <span className="text-gray-500 ml-2">
                        {formatDate(item.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        </Tabs.Tab>
      </Tabs>
    </div>
  );
}

export default ZhanPinDetail;
