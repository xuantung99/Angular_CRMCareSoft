export class InventoryModel {
  address: string;
  createdBy: string;
  createdOn: string;
  district: any = {};
  districtCode: string;
  districtName: string;
  inventoryCode: string;
  inventoryId: number;
  inventoryName: string;
  inventoryType: string;
  isDeleted: number;
  lastModifiedBy: string;
  lastModifiedOn: string;
  parentInventory: InventoryModel;
  parentInventoryCode: string;
  province: any;
  provinceCode: string;
  provinceName: string;
  subDistrict: any = {};
  subDistrictCode: string;
  subDistrictName: string;
  type: TypeInventoryModel = new TypeInventoryModel();
}

export class TypeInventoryModel {
  code: string;
  name: string;
}
