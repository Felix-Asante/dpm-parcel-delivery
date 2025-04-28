export type Order = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  pickupArea: string;
  pickupCity: string;
  senderPhone: string;
  pickupDate: string;
  dropOffArea: string;
  dropOffCity: string;
  recipientPhone: string;
  dropOffDate: string;
  extraInformation: any;
  shipmentOption: string;
  modeOfShipment: string;
  status: string;
  reference: string;
  rider: Rider;
  history: History[];
};

export type Rider = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  phone: string;
  email: string;
  fullName: string;
  address: any;
  isVerified: boolean;
  code: any;
  codeUseCase: any;
  codeExpiryDate: any;
  likes: any[];
  adminFor: any;
};

export type History = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  status: string;
  description: any;
  data: HistoryData;
};

export type HistoryData = Record<string, any>;
