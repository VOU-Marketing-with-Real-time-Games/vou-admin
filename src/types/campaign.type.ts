export interface ICampaignRequestDto {
  name: string;
  image: string;
  field: string;
  startDate: string;
  endDate: string;
  brandId: number;
}

export interface ICampaignRespondDto {
  id: number;
  name: string;
  image: string;
  field: string;
  startDate: string;
  endDate: string;
  status: string;
  createdAt: string;
  brandId: number;
}
