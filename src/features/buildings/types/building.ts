export type Building = {
  id: string;
  name: string;
  address: string;
  totalFloors: number;
  _count?: {
    floors: number;
  };
};

export type BuildingFormValues = {
  name: string;
  address: string;
  totalFloors: string;
};
