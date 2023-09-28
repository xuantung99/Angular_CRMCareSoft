export class SearchMktFieldModel {
    typeDate : number = 1;
    startDate?: any;
    endDate?: any;
    source : string;
    oppSource : number; //lọc theo nguồn ticket
    advertisingSource : string = "";
    contactStatus: number; // lọc theo khách hàng
    type : number;
    productId: number; // lọc theo sản phẩm
    phone : string = "";
    searchText : string = ""; // lọc theo tên nhân viên
    processStatus : string = "-1"; // lọc theo trạng thái của Đã phân sale
    ipAddress? : boolean = false;
  }
