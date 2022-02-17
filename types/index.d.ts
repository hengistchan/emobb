import axios, { AxiosRequestConfig } from "axios";
declare type Nullable<T> = null | T;

declare module "axios" {
  export interface AxiosInstance {
    get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T, K = any>(
      url: string,
      data: K,
      config?: AxiosRequestConfig,
    ): Promise<T>;
  }
}

declare interface CommonResp {
  code: number;
  message: string;
  request: string;
}
