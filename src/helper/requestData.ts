"use strict";

import axios, { AxiosRequestConfig } from "axios";
import message from "./message";
import store from "store2";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const config: AxiosRequestConfig = {
  // baseURL: "http://81.69.58.208:3002",
  baseURL: "http://localhost:3002",
  timeout: 60 * 1000, // Timeout
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function (config) {
    config.headers &&
      (config.headers["Authorization"] = "Bearer " + store("token"));

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data

    return response.data;
  },
  function (error) {
    message("error", error?.response?.data?.message || "error！！！");
    // Do something with response error
    return { ...error?.response?.data, error: true };
  },
);

export default _axios;
