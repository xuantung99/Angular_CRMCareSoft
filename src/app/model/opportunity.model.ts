import {OrderModel} from './order.model';
import {OpportunityLogModel} from './opportunityLog.model';

export class OpportunityModel {
  address: string;
  advertisingSource: string;
  age: number;
  birthday: string;
  contactStatus: number;
  contactStatusName: string;
  createdBy: string;
  createdOn: string;
  customerId: number;
  dateOfBirth: string;
  description: string;
  email: string;
  facebook: string;
  firstName: string;
  fullName: string;
  gender: number;
  id: number;
  items: ItemOpportuinityModel[];
  lastName: string;
  logs: OpportunityLogModel[];
  modifiedBy: string;
  modifiedOn: string;
  oppSource: number;
  oppSourceName: string;
  opportunityCreatedDate: string;
  orders: OrderModel[];
  pendingToDate: string;
  phone: string;
  processStatus: number;
  subProcessStatus: number;
  promotionCode: string;
  provinceCode: any;
  provinceName: string;
  rating: null;
  source: number;
  sourceName: string;
  status: number;
  statusName: string;
  stt?: number;
  subDistrictCode: any;
  subDistrictName: string;
  tags: any = [];
  ticketClassify: string;
  userId: number;
  userName: string;
  users: any = [];
  website: string;
  works: any = [];
  districtCode: any;
  districtName: string;
  type: number;
  oppReOpened: number;
  referenceOppId: null;
  orderCode: string;
  teamId : number;
  divisionId : number;
}

export class ItemOpportuinityModel {
  productDescription: string;
  productDescription2: string;
  productId: number;
  productName: string;
  quantity: number;
  status: any;
}

export class CountOppStatus {
  statusId: number;
  statusName: string;
  total: number;
}


