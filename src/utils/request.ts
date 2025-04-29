import axios from "axios";
import nprogress from "nprogress";

export const hostName = "http://localhost:3000";

/**
 * 文件上传的接口地址
 */
export const uploadActionUrl = hostName + "/api/v1/common/upload";

const instance = axios.create({
  baseURL: hostName,
  timeout: 5000, // 网络请求超时时间
});

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    nprogress.start();
    // 在发送请求之前做些什么
    config.headers["token"] = sessionStorage.getItem("token"); // 添加token到请求头中
    return config;
  },
  function (error) {
    nprogress.done();
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    nprogress.done();
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    nprogress.done();
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

/**
 * 发起get请求
 * @param url
 * @param params
 * @returns
 */
export function get(url: string, params = {}) {
  return instance.get(url, { params }).then((res) => res.data);
}

/**
 * 新增数据
 * @param url
 * @param data
 * @returns
 */
export function post(url: string, data = {}) {
  return instance.post(url, data).then((res) => res.data);
}

/**
 * 修改
 * @param url
 * @param data
 * @returns
 */
export function put(url: string, data = {}) {
  return instance.put(url, data).then((res) => res.data);
}

/**
 * 修改
 * @param url
 * @param data
 * @returns
 */
export function patch(url: string, data = {}) {
  return instance.patch(url, data).then((res) => res.data);
}

/**
 * 删除
 * @param url
 * @returns
 */
export function del(url: string) {
  return instance.delete(url).then((res) => res.data);
}

export default instance;
