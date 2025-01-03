import AxiosClient from "./client";
import { IBrandRequestDto, IBrandRespondDto } from "../types/brand.type.ts";

const PREFIX = "brands/";
const URL_GET_ALL = PREFIX;
const URL_GET_BRAND_BY_ID = PREFIX;
const URL_UPDATE_BRAND = PREFIX;
const URL_DELETE_BRAND = PREFIX;
const URL_CREATE_BRAND = PREFIX;

const brandApi = {
  getAllBrands: async (): Promise<IBrandRespondDto[]> => {
    const res = await AxiosClient.get(URL_GET_ALL);
    return res.data;
  },
  getBrandById: async (id: number): Promise<IBrandRespondDto> => {
    const res = await AxiosClient.get(`${URL_GET_BRAND_BY_ID}/${id}`);
    return res.data;
  },
  updateBrand: async (id: number, brandDto: IBrandRequestDto): Promise<IBrandRespondDto> => {
    const res = await AxiosClient.put(`${URL_UPDATE_BRAND}/${id}`, brandDto);
    return res.data;
  },
  deleteBrand: async (id: number): Promise<void> => {
    await AxiosClient.delete(`${URL_DELETE_BRAND}/${id}`);
  },
  createBrand: async (brandDto: IBrandRequestDto): Promise<IBrandRespondDto> => {
    const res = await AxiosClient.post(URL_CREATE_BRAND, brandDto);
    return res.data;
  },
};

export default brandApi;