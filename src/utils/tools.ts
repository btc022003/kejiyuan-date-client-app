import dayjs from "dayjs";
import { hostName } from "./request";

/**
 * 处理图片数据
 * @param img
 * @returns
 */
export function dalImg(img: string | undefined) {
  if (img) {
    if (img.startsWith("http")) return img;
    return hostName + img;
  }
  return "https://img0.baidu.com/it/u=3600954679,641662266&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500";
}

export function formatDate(date: string) {
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
}
