import _axios from "@/helper/requestData";

interface DataSet {
  _id: string;
  uuid: string;
  sheet: string;
  data: any;
  createAt: string;
  updateAt: string;
}

class Data {
  static getData = async (uuid: string) => {
    return await _axios.get<DataSet[]>(`/api/data/${uuid}`);
  };

  static getEvent = async (uuid: string) => {
    return await _axios.get(`/api/event?label=${uuid}`);
  };
}

export default Data;
