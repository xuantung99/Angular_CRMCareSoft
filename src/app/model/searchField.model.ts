export class SearchFieldModel {
    typeDate : number = 1;
    selectedTypeDate:number = 1;
    startDate?: any = Date.now();
    endDate?: any = Date.now();
    contactId: number = -1; // lọc theo khách hàng
    oppSource : number = -1; //lọc theo nguồn ticket
    productId: number; // lọc theo sản phẩm
    phone : string;
    searchText : string; // lọc theo tên nhân viên
    status: number = -1;
    groupSale : number = -1; // lọc theo nhóm sản phẩm
    teamId : number = -1; // lọc theo nhóm kinh doanh
    employeeId : number = -1; // lọc theo id nhân viên
    processStatus : string // lọc theo trạng thái của Đã phân sale
  }
