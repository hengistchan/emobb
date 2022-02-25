import { reactive } from "vue";

export const getParentElement = (element: HTMLElement, className: string) => {
  while (element) {
    if (element.classList && element.classList.contains(className)) {
      return element;
    }
    element = element.parentNode as HTMLElement;
  }
  return null;
};

export const queryUrlHelpper = (
  url: string,
  data: { [key: string]: string | null | number },
) => {
  let temp = "?",
    flag = false;
  Object.entries(data).forEach(([key, value], index) => {
    if (value !== "" && value != null) {
      index >= 1 && flag && (temp += "&");
      flag = true;
      temp += key + "=" + value;
    }
  });
  return flag ? (url += temp) : url;
};

export const pageHelper = (page: number = 1, count: number = 20) => {
  return reactive({
    page,
    count,
  });
};
