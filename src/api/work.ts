import _axios from "@/helper/request";

interface WorkDTO {
  id: number;
  uuid: string;
  title: string;
  description: string;
  user_id: number;
  cover_img: string;
  is_template: boolean;
  status: number;
  copied_count: number;
  last_publish_time: string;
  is_hot: boolean;
  is_publish: boolean;
}

interface WorkDetailDTO extends WorkDTO {
  page: object;
}

class Work {
  static getByUUID(uuid: string) {
    return _axios.get<WorkDTO>(`/work/${uuid}`);
  }

  static getDetailByUUID(uuid: string) {
    return _axios.get<WorkDetailDTO>(`/work/detail/${uuid}`);
  }
}

export default Work;
