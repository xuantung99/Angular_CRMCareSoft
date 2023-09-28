import { formatDate } from "@angular/common";
import { Injectable } from "@angular/core";
import * as FileSaver from 'file-saver';
import * as moment from "moment";
import * as XLSX from 'xlsx';


@Injectable({providedIn: 'root'})

export class ExportExcelService {

    excelType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    excelExtension = '.xlsx';
    startDate = Date.now();

    constructor() {
    }

    ExportDataReportRealtime(typeTicket:string){
        let tbls = document.getElementsByTagName("table");
        // Mới được phân
        let worksheet_tmp11 = XLSX.utils.table_to_sheet(tbls[0]);
        let worksheet_tmp12 = XLSX.utils.table_to_sheet(tbls[1]);
        let worksheet_tmp13 = XLSX.utils.table_to_sheet(tbls[2]);

        let a1:any = XLSX.utils.sheet_to_json(worksheet_tmp11, { header: 1 })
        let b1:any = XLSX.utils.sheet_to_json(worksheet_tmp12, { header: 1 })
        let c1:any = XLSX.utils.sheet_to_json(worksheet_tmp13, { header: 1 })
       // customer
       b1[0][0] = "Tổng xử lý trong ngày";

       ///
        a1[0] = [" ","Tất cả"].concat(b1[0]).concat(c1[0])
        a1[1] = ["Mới được phân"].concat(a1[1]).concat(b1[1]).concat(c1[1])
        // Theo lịch phải gọi
        let worksheet_tmp21 = XLSX.utils.table_to_sheet(tbls[3]);
        let worksheet_tmp22 = XLSX.utils.table_to_sheet(tbls[4]);
        let worksheet_tmp23 = XLSX.utils.table_to_sheet(tbls[5]);

        let a2:any = XLSX.utils.sheet_to_json(worksheet_tmp21, { header: 1 })
        let b2:any = XLSX.utils.sheet_to_json(worksheet_tmp22, { header: 1 })
        let c2:any = XLSX.utils.sheet_to_json(worksheet_tmp23, { header: 1 })

        a1[2] = ["Thời lịch gọi lại"].concat(a2[1]).concat(b2[1]).concat(c2[1])
        // Tự thêm
        let worksheet_tmp31 = XLSX.utils.table_to_sheet(tbls[6]);
        let worksheet_tmp32 = XLSX.utils.table_to_sheet(tbls[7]);
        let worksheet_tmp33 = XLSX.utils.table_to_sheet(tbls[8]);

        let a3:any = XLSX.utils.sheet_to_json(worksheet_tmp31, { header: 1 })
        let b3:any = XLSX.utils.sheet_to_json(worksheet_tmp32, { header: 1 })
        let c3:any = XLSX.utils.sheet_to_json(worksheet_tmp33, { header: 1 })

        a1[3] = ["Tự thêm"].concat(a3[1]).concat(b3[1]).concat(c3[1])
        let worksheet = XLSX.utils.json_to_sheet(a1, { skipHeader: true })

        const new_workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(new_workbook, worksheet, "worksheet")
        XLSX.writeFile(new_workbook, 'Report_ticket_' + typeTicket +"_"+ formatDate(this.startDate, 'yyyy-MM-dd HH:mm', 'en-US').toString()+'.xlsx')
     }
     ExportDataReportByLeader(){
        let tbls = document.getElementsByTagName("table");
        let worksheet_tmp11 = XLSX.utils.table_to_sheet(tbls[0]);

        let a:any = XLSX.utils.sheet_to_json(worksheet_tmp11, { header: 1 })

        let worksheet = XLSX.utils.json_to_sheet(a, { skipHeader: true })

        const new_workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(new_workbook, worksheet, "worksheet")
        XLSX.writeFile(new_workbook, 'Report_ticket_'+ formatDate(this.startDate, 'yyyy-MM-dd HH:mm', 'en-US').toString()+'.xlsx')
     }
     ExportDataReportByMember(){
      let tbls = document.getElementsByTagName("table");
      let worksheet_tmp11 = XLSX.utils.table_to_sheet(tbls[0],{dateNF:'mm/dd/yyyy;@',cellDates:true, raw: true});

      let a:any = XLSX.utils.sheet_to_json(worksheet_tmp11, { header: 1 })

      let worksheet = XLSX.utils.json_to_sheet(a, { skipHeader: true })

      const new_workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(new_workbook, worksheet, "worksheet")
      XLSX.writeFile(new_workbook, 'Report_ticket_'+ formatDate(this.startDate, 'yyyy-MM-dd HH:mm', 'en-US').toString()+'.xlsx')
   }
   ExportDataPlanByManagerLeader(elementName:string){
    let tbls = document.getElementById(`${elementName}`);
    let worksheet_tmp11 = XLSX.utils.table_to_sheet(tbls,{dateNF:'mm/dd/yyyy;@',cellDates:true, raw: true});

    let a:any = XLSX.utils.sheet_to_json(worksheet_tmp11, { header: 1 })

    let worksheet = XLSX.utils.json_to_sheet(a, { skipHeader: true })

    const new_workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(new_workbook, worksheet, "worksheet")
    XLSX.writeFile(new_workbook, 'Report_ticket_'+ formatDate(this.startDate, 'yyyy-MM-dd HH:mm', 'en-US').toString()+'.xlsx')
 }
   ExportDataReportByMarketing(dataTickets:any){
    let worksheet_tmp11 = XLSX.utils.json_to_sheet(dataTickets);
    let a:any = XLSX.utils.sheet_to_json(worksheet_tmp11, { header: 1 })
    //Sửa lại hàng đầu tiên trong excel
    a[0][0] = 'Mã ticket';
    a[0][1] = 'Người tạo';
    a[0][2] = 'Ngày tạo';
    a[0][3] = 'Họ tên';
    a[0][4] = 'Số điện thoại';
    a[0][5] = 'UTM Code';
    a[0][6] = 'Mô tả';
    a[0][7] = 'Kết quả cuộc gọi';
    a[0][8] = 'Nguồn cơ hội';
    a[0][9] = 'Nguồn tạo';
    a[0][10] = 'Tỉnh / Thành phố';
    a[0][11] = 'Quận / Huyện'
    a[0][12] = 'Phường / Xã';
    a[0][13] = 'Địa chỉ';
    a[0][14] = 'Giới tính';
    a[0][15] = 'Độ tuổi';
    a[0][16] = 'Bệnh lý';
    a[0][17] = 'Nghề nghiệp';
    a[0][18] = 'Trạng thái xử lý';
    a[0][19] = 'Trạng thái KH';
    a[0][20] = 'NV phụ trách';
    a[0][21] = 'Trạng thái kết nối';
    a[0][22] = 'Ngày cập nhật cuối';
    a[0][23] = 'Ngày phải gọi';
    a[0][23] = 'Ngày hết hàng';
    a[0][24] = 'Loại ticket';
    let worksheet = XLSX.utils.json_to_sheet(a, { skipHeader: true })

    const new_workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(new_workbook, worksheet, "worksheet")
    XLSX.writeFile(new_workbook, 'Report_ticket_'+ formatDate(this.startDate, 'yyyy-MM-dd HH:mm', 'en-US').toString()+'.xlsx')
  }
  ExportDataOrderByMarketing(dataOrders:any){
    let worksheet_tmp11 = XLSX.utils.json_to_sheet(dataOrders);
    let a:any = XLSX.utils.sheet_to_json(worksheet_tmp11, { header: 1 })
    //Sửa lại hàng đầu tiên trong excel
    a[0][0] = 'Ngày tạo ticket';
    a[0][1] = 'UTM Code';
    a[0][2] = 'Mã ticket';
    a[0][3] = 'Mã đơn hàng';
    a[0][4] = 'Ngày tạo đơn';
    a[0][5] = 'Số điện thoại';
    a[0][6] = 'Tỉnh/Thành phố';
    a[0][7] = 'Quận/Huyện';
    a[0][8] = 'Phường/Xã';
    a[0][9] = 'Địa chỉ';
    a[0][10] = 'Số tiền phải thu';
    a[0][11] = 'Giá trị đơn hàng';
    a[0][12] = 'Phí ship'
    a[0][13] = 'Họ tên';
    a[0][14] = 'Trạng thái đơn hàng';
    a[0][15] = 'Nguồn tạo';
    a[0][16] = 'Giá trị SP mua kèm';
    a[0][17] = 'Số lượng SP mua kèm';
    a[0][18] = 'Tên SP mua kèm';
    a[0][19] = 'Giá trị SP chính';
    a[0][20] = 'Số lượng SP chính';
    a[0][21] = 'Tên SP chính';
    a[0][22] = 'Loại ticket';
    a[0][23] = 'Bệnh lý';
    a[0][24] = 'Độ tuổi';
    a[0][25] = 'Giới tính';
    a[0][26] = 'Nghề nghiệp';
    a[0][27] = 'NV tạo ticket';
    a[0][28] = 'NV tạo đơn';
    let worksheet = XLSX.utils.json_to_sheet(a, { skipHeader: true })

    const new_workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(new_workbook, worksheet, "worksheet")
    XLSX.writeFile(new_workbook, 'Report_ticket_'+ formatDate(this.startDate, 'yyyy-MM-dd HH:mm', 'en-US').toString()+'.xlsx')
  }
  ExportDataProductByMarketing(){
    let tbls = document.getElementById("table-order");
    let worksheet_tmp11 = XLSX.utils.table_to_sheet(tbls,{dateNF:'mm/dd/yyyy;@',cellDates:true, raw: true});

    let a:any = XLSX.utils.sheet_to_json(worksheet_tmp11, { header: 1 })

    let worksheet = XLSX.utils.json_to_sheet(a, { skipHeader: true })

    const new_workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(new_workbook, worksheet, "worksheet")
    XLSX.writeFile(new_workbook, 'Report_ticket_'+ formatDate(this.startDate, 'yyyy-MM-dd HH:mm', 'en-US').toString()+'.xlsx')
 }
 ExportDataReportByDigitalMarketing(dataTickets:any){
  let worksheet_tmp11 = XLSX.utils.json_to_sheet(dataTickets);
  let a:any = XLSX.utils.sheet_to_json(worksheet_tmp11, { header: 1 })
  //Sửa lại hàng đầu tiên trong excel
  a[0][0] = 'Mã ticket';
  a[0][1] = 'Người tạo';
  a[0][2] = 'Ngày tạo';
  a[0][3] = 'Họ tên';
  a[0][4] = 'Số điện thoại';
  a[0][5] = 'UTM Code';
  a[0][6] = 'Mô tả';
  a[0][7] = 'Kết quả cuộc gọi';
  a[0][8] = 'Nguồn cơ hội';
  a[0][9] = 'Nguồn tạo';
  a[0][10] = 'Giới tính';
  a[0][11] = 'Độ tuổi';
  a[0][12] = 'Bệnh lý';
  a[0][13] = 'Nghề nghiệp';
  a[0][14] = 'Trạng thái xử lý';
  a[0][15] = 'Trạng thái KH';
  a[0][16] = 'NV phụ trách';
  a[0][17] = 'Trạng thái kết nối';
  a[0][18] = 'Ngày cập nhật cuối';
  a[0][19] = 'Ngày phải gọi';
  a[0][20] = 'Loại ticket';
  a[0][21] = 'Địa chỉ IP'
  let worksheet = XLSX.utils.json_to_sheet(a, { skipHeader: true })

  const new_workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(new_workbook, worksheet, "worksheet")
  XLSX.writeFile(new_workbook, 'Report_ticket_'+ formatDate(this.startDate, 'yyyy-MM-dd HH:mm', 'en-US').toString()+'.xlsx')
}
  ExportData(){
    let tbls = document.getElementsByTagName("table");
    let worksheet_tmp11 = XLSX.utils.table_to_sheet(tbls[0],{dateNF:'mm/dd/yyyy;@',cellDates:true, raw: true});

    let a:any = XLSX.utils.sheet_to_json(worksheet_tmp11, { header: 1 })

    let worksheet = XLSX.utils.json_to_sheet(a, { skipHeader: true })

    const new_workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(new_workbook, worksheet, "worksheet")
    XLSX.writeFile(new_workbook, 'Report_ticket_'+ formatDate(this.startDate, 'yyyy-MM-dd HH:mm', 'en-US').toString()+'.xlsx')
  }
}
