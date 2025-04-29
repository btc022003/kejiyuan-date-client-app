import { Link } from "react-router"; // 确保使用正确的导入路径
import errorIcon from "../assets/error.png";

function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <img
        src={errorIcon}
        alt="Error"
        className="w-40 h-40 mb-4" // 根据图片大小调整
      />
      <h2 className="text-4xl font-bold text-red-600 mb-6">出错了。。。</h2>
      <Link
        to="/"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        返回首页{" >>"}
      </Link>
    </div>
  );
}

export default ErrorPage;
