import { del, get, post, put } from "../utils/request";

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

/**
 * 登录
 * @param userName
 * @param password
 * @returns
 */
export const loginAPI = (userName: string, password: string) => {
  return post(`/api/v1/auth/login`, {
    userName,
    password,
  });
};

/**
 * 注册
 * @param userName
 * @param password
 * @returns
 */
export const regAPI = (userName: string, password: string) => {
  return post(`/api/v1/auth/reg`, {
    userName,
    password,
  });
};

/**
 * 获取用户信息
 * @returns
 */
export const loadUserInfoAPI = () => {
  return get(`/api/v1/user/info`);
};

/**
 * 评论展品
 * @param zhanPinId 展品id
 * @param content   内容
 * @returns
 */
export const commentZhanPinAPI = (zhanPinId: string, content: string) => {
  return post(`/api/v1/zhan_pin_comments/` + zhanPinId, {
    content,
  });
};

/**
 * 修改用户信息
 * @param data
 * @returns
 */
export const updateUserInfoAPI = (data: {
  avatar: string;
  trueName: string;
  mobile: string;
  ids: string;
}) => {
  return put(`/api/v1/user/info`, data);
};

/**
 * 修改密码
 * @param data
 * @returns
 */
export const updateUserPwdAPI = (data: {
  oldPassword: string;
  password: string;
}) => {
  return put(`/api/v1/user/update_password`, data);
};

/**
 * 加入收藏
 * @param zhanPinId
 * @returns
 */
export const addToCollectionAPI = (zhanPinId = "") =>
  post("/api/v1/zhan_pin_collects/" + zhanPinId);

/**
 * 获取当前用户的收藏
 * @returns
 */
export const loadUserCollectionsAPI = () => get("/api/v1/user/collects");

/**
 * 删除用户收藏
 * @param id
 * @returns
 */
export const delUserCollectionByIdAPI = (id: string) =>
  del("/api/v1/user/collects/" + id);

/**
 * 获取家庭成员信息
 * @returns
 */
export const loadUserFamiliesAPI = () => get("/api/v1/user/family_members");

/**
 * 添加家庭成员
 * @param data
 * @returns
 */
export const addUserFamilyAPI = (data: {
  realName: string;
  mobile: string;
  ids: string;
}) => {
  return post(`/api/v1/user/family_members`, data);
};

/**
 * 删除家庭成员
 * @param id
 * @returns
 */
export const delUserFamilyByIdAPI = (id: string) =>
  del("/api/v1/user/family_members/" + id);

/**
 * 修改家庭成员信息
 * @param id    需要修改的id
 * @param data  数据
 * @returns
 */
export const editUserFamilyAPI = (
  id: string,
  data: {
    realName: string;
    mobile: string;
    ids: string;
  }
) => {
  return put(`/api/v1/user/family_members/` + id, data);
};

/**
 * 获取用户的预约记录
 * @returns
 */
export const loadUserDateLogsAPI = () => get("/api/v1/user/yu_yues");

/**
 * 预约参观
 * @param data
 * @returns
 */
export const addToDateAPI = (data: { date: string; dateFamilies: string[] }) =>
  post("/api/v1/user/date", data);
