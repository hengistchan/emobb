import { AxiosRequestConfig } from "axios";
declare type Nullable<T> = null | T;

declare module "axios" {
  export interface AxiosInstance {
    get<T>(url: string, config?: AxiosRequestConfig): RespPromise<T>;
    post<T, K = any>(
      url: string,
      data: K,
      config?: AxiosRequestConfig,
    ): RespPromise<T>;

    put<T, K = any>(
      url: string,
      data: K,
      config?: AxiosRequestConfig,
    ): RespPromise<T>;
  }
}

type RespPromise<T> = Promise<T & Partial<CommonResp> & { error?: boolean }>;

declare type CommonResp = {
  code: number;
  message: string;
  request: string;
};

declare type Headers = { [key: string]: string };
