import AxiosClient from "./client";
import { ICampaignRequestDto, ICampaign } from "../types/campaign.type.ts";

const PREFIX = "campaigns";
const URL_GET_ALL = PREFIX;
const URL_GET_CAMPAIGN_BY_ID = PREFIX;
const URL_UPDATE_CAMPAIGN = PREFIX;
const URL_DELETE_CAMPAIGN = PREFIX;
const URL_CREATE_CAMPAIGN = PREFIX;

const campaignApi = {
  getAllCampaigns: async (): Promise<any> => {
    const res = await AxiosClient.get(URL_GET_ALL);
    return res.data;
  },
  getCampaignById: async (id: number): Promise<ICampaign> => {
    const res = await AxiosClient.get(`${URL_GET_CAMPAIGN_BY_ID}/${id}`);
    return res.data;
  },
  updateCampaign: async (id: number, campaignDto: ICampaign): Promise<ICampaign> => {
    const res = await AxiosClient.put(`${URL_UPDATE_CAMPAIGN}/${id}`, campaignDto);
    return res.data;
  },
  deleteCampaign: async (id: number): Promise<void> => {
    await AxiosClient.delete(`${URL_DELETE_CAMPAIGN}/${id}`);
  },
  createCampaign: async (campaignDto: ICampaignRequestDto): Promise<ICampaign> => {
    const res = await AxiosClient.post(URL_CREATE_CAMPAIGN, campaignDto);
    return res.data;
  },
};

export default campaignApi;