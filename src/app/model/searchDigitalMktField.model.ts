export class SearchDigitalMktFieldModel {
    typeDate : number = 1;
    startDate?: any = new Date();
    endDate?: any = new Date();
    source : string = "-1";
    oppSource : number; //lọc theo nguồn ticket
    advertisingSource : string = "";
    contactStatus: number ; // lọc theo khách hàng
    type : number;
    productId: number; // lọc theo sản phẩm
    phone : string = "";
    ipAddress? : boolean = false;
  }
