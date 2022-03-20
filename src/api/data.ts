import _axios from "@/helper/requestData";

export interface DataSet {
  _id: string;
  uuid: string;
  sheet: string;
  data: any;
  createAt: string;
  updateAt: string;
}

export interface EventData {
  _id: string;
  eventData: { pv: number; uv: number };
  eventDate: string;
  eventKey: string;
}

class Data {
  static getData = async (uuid: string) => {
    return await _axios.get<DataSet[]>(`/api/data/${uuid}`);
  };

  static getEvent = async (uuid: string) => {
    return await _axios.get<EventData[]>(`/api/event?label=${uuid}`);
  };

  static getExcel = async (uuid: string) => {
    return await _axios.get(`/api/data/excel/${uuid}`, {
      responseType: "blob",
    });
  };
}

export default Data;
