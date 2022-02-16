import { AxiosRequestConfig } from "axios";
declare type Nullable<T> = null | T;

declare module "axios" {
  export interface AxiosInstance {
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  }
}
