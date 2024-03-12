export interface ICatFiltersInputs {
  name?: string;
  race?: string;
  minimumPrice?: string;
  highestPrice?: string;
  page?: number;
}

export interface ICat {
  id: number;
  name: string;
  race: string;
  birth: string;
  price: number;
  photoName: string;
  photoUrl: string;
}