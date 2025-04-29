import { get } from "../utils/request";

/**
 * 获取首页数据
 * @param maxAds        最大广告数量
 * @param maxZhanPins   最大展品数量
 * @param maxHuoDongs   最大活动数量
 * @returns
 */
export const loadHomeDataAPI = (
  maxAds = 5,
  maxZhanPins = 5,
  maxHuoDongs = 5
) => {
  return get(
    `/api/v1/home?maxAds=${maxAds}&maxZhanPins=${maxZhanPins}&maxHuoDongs=${maxHuoDongs}`
  );
};

/**
 * 获取列表数据
 * @param page      页码
 * @param pageSize  每页显示的数量
 * @returns
 */
export const loadZhanPinListAPI = (page = 1, pageSize = 10) => {
  return get(`/api/v1/zhan_pins?page=${page}&pageSize=${pageSize}`);
};

/**
 * 根据id获取展品详情
 * @param id
 * @returns
 */
export const loadZhanPinByIdAPI = (id: string) => {
  return get(`/api/v1/zhan_pins/${id}`);
};

/**
 * 获取活动数据
 * @param page
 * @param pageSize
 * @returns
 */
export const loadHuoDongListAPI = (page = 1, pageSize = 10) => {
  return get(`/api/v1/huo_dongs?page=${page}&pageSize=${pageSize}`);
};

/**
 * 获取展品的评论
 * @param zhanPinId   展品id
 * @param page        页码
 * @param pageSize    每页显示的数量
 * @returns
 */
export const loadZhanPinComments = (
  zhanPinId = "",
  page = 1,
  pageSize = 10
) => {
  return get(
    `http://localhost:3000/api/v1/zhan_pin_comments/${zhanPinId}?page=${page}&pageSize=${pageSize}`
  );
};
