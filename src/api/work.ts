import { queryUrlHelpper } from "@/helper";
import _axios from "@/helper/request";
import { Page as PageRest, Nullable, PageResp, CommonResp } from "types";
import { Page } from "@/package/types/page";

export interface WorkDTO {
  id: number;
  uuid: string;
  title: string;
  description: string;
  user_id: number;
  cover_img: string;
  is_template: boolean;
  status: number;
  copied_count: number;
  latest_publish_time: string;
  is_hot: boolean;
  is_publish: boolean;
}

interface WorkDetailDTO extends WorkDTO {
  page: Page;
}

interface WorkContent {
  page: Page;
}

interface WorkCreateDTO {
  title?: Nullable<string>;
  description?: Nullable<string>;
}

interface WortCreateSuccess {
  uuid: string;
  title: string;
}

class Work {
  static getByUUID(uuid: string) {
    return _axios.get<WorkDTO>(`/work/${uuid}`);
  }

  static getDetailByUUID(uuid: string) {
    return _axios.get<WorkDetailDTO>(`/work/detail/${uuid}`);
  }

  static saveWorkContent(uuid: string, data: WorkContent) {
    return _axios.put(`/work/content/${uuid}`, data);
  }

  static createWork(data: WorkCreateDTO) {
    return _axios.post<WortCreateSuccess>(`/work`, data);
  }

  static getInRecycler(search: string | null, page: PageRest) {
    return _axios.get<PageResp<WorkDTO>>(
      queryUrlHelpper(`/work/can`, { search, ...page }),
    );
  }

  static recover(uuid: string) {
    return _axios.post<CommonResp>(`/work/recover/${uuid}`, null);
  }

  static getList(search: string | null, isTemplate: boolean, page: PageRest) {
    return _axios.get<PageResp<WorkDTO>>(
      queryUrlHelpper(`/work`, { search, template: isTemplate, ...page }),
    );
  }

  static deleteByUUID(uuid: string) {
    return _axios.delete(`/work/${uuid}`);
  }

  static getRecentWork(num: number) {
    return _axios.get<WorkDTO[]>(`/work/recent/${num}`);
  }

  static getCount() {
    return _axios.get<{ sum: number; template: number; publish: number }>(
      `/work/count`,
    );
  }
}

export default Work;
