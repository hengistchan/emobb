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
  last_publish_time: string;
  is_hot: boolean;
  is_publish: boolean;
}

interface WorkDetailDTO extends WorkDTO {
  page: Page;
}
