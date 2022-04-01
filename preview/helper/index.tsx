import _axios from "@/helper/request";
import { WorkDetailDTO } from "preview";

/**
 * It takes a key and returns the value of that key in the URL query string.
 * @param {string} key - The name of the parameter.
 * @returns The value of the key in the URL query string.
 */
export const getURLParam = (key: string) => {
  let data = window.location.href.split("?");
  if (data.length !== 2) return null;
  const map = (data[1] as string).split("&").reduce((prev, next) => {
    let p = next.split("=");
    prev[p[0]] = p[1];
    return prev;
  }, {} as { [key: string]: string });
  return map[key] || null;
};

export const getPage = (uuid: string) => {
  return _axios.get<WorkDetailDTO>(`/work/preview/${uuid}`);
};
