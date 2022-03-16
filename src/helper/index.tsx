import dayjs from "dayjs";
import { reactive } from "vue";

/**
 * Find the first element in the DOM tree that has the className className
 * @param {HTMLElement} element - The element to search from.
 * @param {string} className - The class name of the parent element you want to find.
 * @returns The parent element of the element that has the className.
 */
export const getParentElement = (element: HTMLElement, className: string) => {
  while (element) {
    if (element.classList && element.classList.contains(className)) {
      return element;
    }
    element = element.parentNode as HTMLElement;
  }
  return null;
};

/**
 * This function takes in a URL and a dictionary of key-value pairs and returns a URL with the
 * key-value pairs as query parameters
 * @param {string} url - The URL to which the query will be appended.
 * @param data - { [key: string]: string | null | number | boolean }
 * @returns The url with the query string.
 */
export const queryUrlHelpper = (
  url: string,
  data: { [key: string]: string | null | number | boolean },
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

/**
 * The `pageHelper` function returns a reactive object with the current page and count
 * @param {number} [page=1] - The current page number.
 * @param {number} [count=20] - The number of items to show per page.
 * @returns A reactive object.
 */
export const pageHelper = (page: number = 1, count: number = 20) => {
  return reactive({
    page,
    count,
  });
};

/**
 * It takes a date string and a format string and returns a formatted date string.
 * @param {string} date - The date to be formatted.
 * @param [format=YYYY-MM-DD HH:mm:ss] - The format of the date.
 * @returns A string.
 */
export const dateFormat = (date: string, format = "YYYY-MM-DD HH:mm:ss") => {
  return dayjs(date).format(format);
};
