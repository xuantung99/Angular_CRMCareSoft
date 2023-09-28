export class OppByMktModel {
    typeDate? : number = 1;
    startDate?: any;
    endDate?: any;
    contactStatus: number = -1; // lọc theo khách hàng
    oppSource : number = -1;
    type : number = -1;
    productId: string; // lọc theo sản phẩm
    phone : string = "";
    processStatus : string = "-1"; // lọc theo trạng thái của Đã phân sale
    status?: number = -1;
  }
