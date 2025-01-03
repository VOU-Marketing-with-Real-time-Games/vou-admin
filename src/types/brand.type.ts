
export interface IBrandRequestDto {
  name: string;
  field: string;
}

export interface IBrandRespondDto {
  id: number;
  name: string;
  field: string;
  status: string;
  enabled: boolean;
  creator: string;
  createdAt: string;
}