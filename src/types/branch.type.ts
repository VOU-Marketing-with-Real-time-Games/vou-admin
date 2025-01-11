export interface IBranchRequestDto {
  brandId: number;
  name: string;
  address: string;
  long: number;
  lat: number;
}

export interface IBranch {
  id: number;
  brandId: number;
  name: string;
  address: string;
  longitude: number;
  latitude: number;
}
