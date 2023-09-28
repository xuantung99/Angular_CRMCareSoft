import { NbNullableInput } from "@nebular/theme/components/helpers";

export class AppConstants {
  public static version_local  = '20230906';
  /**
   * enum message action
   */
  public static createSuccessMessage = 'Tạo mới thành công!';
  public static editSuccessMessage = 'Cập nhật thành công!';
  public static createFailureMessage = 'Tạo mới không thành công!';
  public static editFailureMessage = 'Cập nhật không thành công!';
  public static deleteFailureMessage = 'Xóa không thành công!';
  public static deleteSuccessMessage = 'Xóa thành công!';

  public static basePath = 'https://backend.5nhatnhat.com';

  /**
   * enum process status
   */
  public static ticketNewResultCalls = 1;  /*Mới tạo*/
  public static ticketStatusCreate = 10;  /*Mới tạo*/
  public static ticketStatusRecovery = 15; /*Thu hồi chưa phân sale*/
  public static ticketStatusAssigned = 20;  /*Đã phân sale*/
  public static ticketStatusRecoveryAssigned = 25; /*Thu hồi chưa phân sale*/
  public static ticketStatusProcessing = 30;  /*Đang xử lý*/
  public static ticketStatusCallOne = 31;  /*Đang xử lý -goi1*/
  public static ticketStatusCallTwo = 32;  /*Chờ xử lý -goi 2*/
  public static ticketStatusCallThree = 33;  /*Chờ xử lý -goi 3*/
  public static ticketStatusCancel = 40;  /*Hủy ticket*/
  public static ticketStatusOrderLate = 41;  /*Chốt chưa tạo đơn*/
  public static ticketStatusDelete = 99;  /*Xóa ticket trùng*/
  public static ticketStatusCallAgain = 45;  /*Hủy ticket gọi lai sau*/
  public static ticketStatusBought = 50;  /*Đã mua hàng*/
  public static conditionPoint = 50;

  public static oppTypeTicket = 1;
  public static oppTypeUpsale = 5;
  public static oppTypeReopen = 4;

  public static LogTypeNew = 110;
  public static LogTypeAssigned = 120;
  public static LogTypeProcessing = 130;
  public static LogTypeClosed = 140;
  public static LogTypeOrder = 141;
  public static LogTypeCallBack = 145;
  public static LogTypeOrderResolved = 150;
  public static LogTypeCancel = 199;
  public static LogTypeRecovery = 115;
  public static LogTypeRecoveryAssigned = 125;

  public static get oppTypes(): any {
    return [
      {id: 1, name: 'Ticket Normal'},
      {id: 5, name: 'Ticket UpSale'},
      {id: 4, name: 'Ticket ReOpen'},
    ];
  }

  public static get questionTime(): any {
    return [
      {id: 1, name: 'Trong tuần'},
      {id: 2, name: 'Trong tháng'},
      {id: 3, name: 'Trong Quý'},
      {id: 4, name: 'Trong năm'},
      {id: 0, name: 'Tất cả'},
    ];
  }

  public static get questionStatus(): any {
    return [
      {id: 0, name: 'Chưa trả lời'},
      {id: 1, name: 'Đã trả lời'},
      {id: 2, name: 'Tất cả'},
    ];
  }

  public static get answerStatus(): any {
    return [
      {id: 0, name: 'Chưa gửi khách hàng'},
      {id: 1, name: 'Đã gửi khách hàng'},
    ];
  }

  public static get contactStatus(): any {
    return [
      {id: 1, name: 'KH mới'},
      {id: 2, name: 'KH đã lh'},
      {id: 3, name: 'KH đã mua'},
    ];
  }

  public static get statusPendingtoDates(): any {
    return [
      {id: -1, name: 'Tất cả'},
      {id: 0, name: 'Quá hạn'},
      {id: 1, name: 'Hôm nay'},
      {id: 2, name: 'Sắp tới'},
    ];
  }

  public static get resultCalls(): any {
    return [
      {code: 10, name: 'Sai số'},
      {code: 11, name: 'Spam'},
      {code: 12, name: 'KH Không Mua'},
      {code: 20, name: 'KH phân vân'},
      {code: 21, name: 'Khác'},
      {code: 30, name: 'SDT Bận/K nghe máy'},
      {code: 31, name: 'KH Hẹn gọi lại'},
      {code: 40, name: 'KH Chốt'},
      {code: 41, name: 'Chốt tạo đơn sau'},
      {code: 45, name: 'Đóng gọi lại sau'},
      {code: 50, name: 'Đã mua hàng'},
      {code: 99, name: 'Đóng trùng'},
    ];
  }

  public static get ContactMethods(): any {
    return [
      {code: 1, name: 'Gọi điện'},
      {code: 2, name: 'Facebook'},
      {code: 3, name: 'Zalo'},
      {code: 4, name: 'Khác'},

    ];
  }

  public static get processStatus(): any {
    return [
      {id: 10, name: 'Mới tạo', code: 'new'},
      {id: 20, name: 'Đã phân sale', code: 'assigned'},
      {id: 25, name: 'Đã phân sale', code: 'recovery_assigned'},
      {id: 30, name: 'Đang xử lý', code: 'processing'},
      {id: 40, name: 'Đã Hủy Ticket', code: 'cancel'},
      {id: 41, name: 'Chốt tạo đơn sau', code: 'order'},
      {id: 45, name: 'Đóng ticket gọi lại sau', code: 'call_back'},
      {id: 50, name: 'Đã mua hàng', code: 'order_resolved'},
      {id: 99, name: 'Đóng trùng ticket', code: 'delicate'},
    ];
  }

  public static get subProcessStatus(): any {
    return [
      {id: 0, name: 'Kết nối', code: 'new'},
      {id: 10, name: 'Chăm sóc', code: 'processing'},
      {id: 20, name: 'Bán hàng', code: 'resolved'},
    ];
  }

  public static get shipmentMethods(): string[] {
    return ['Giao hàng nhanh', 'Giao hàng tiết kiệm', 'Ninja Van', 'Shopee Express', 'J&T', 'Nowship', 'Grab',
      'VnPost nhanh', 'VnPost tiết kiệm', 'Viettel Post', 'Best Express', 'TIKI'];
  }

  // HuyPx : ẩn chức năng thu hồi và phân ticket cho leader
  public static get userCodeAllow(): string[] {
    return ['linhthan', 'anhdongoc','	linhnguyenthi01'];
  }
  //end
  public static shipmentMethodsBySource(sourceId): string[] {
    var resultArr = [];
    switch (sourceId) {
      case "postmart":
        resultArr = ['VnPost nhanh', 'VnPost tiết kiệm'];
        break;
      default:
        resultArr = ['Giao hàng nhanh', 'Giao hàng tiết kiệm', 'Ninja Van', 'Shopee Express', 'J&T', 'Nowship', 'Grab',
        'VnPost nhanh', 'VnPost tiết kiệm', 'Viettel Post', 'Best Express', 'TIKI'];
        break;
    }
    return resultArr;
  }

  public static get oppSource(): any {
    return [
      {id: 1, name: 'Có nhu cầu'},
      {id: 2, name: 'Cần tư vấn'},
      {id: 3, name: 'Đặt hàng'},
      {id: 4, name: 'Đã OTP'},
    ];
  }

  public static get orderStatus(): any {
    return [
      {id: 'quotation', name: 'Đơn hàng mới tạo'},
      {id: 'sale_open', name: 'Đơn hàng đợi xác nhận'},
      {id: 'sale_processing', name: 'Nhân viên sale đang xử lý'},
      {id: 'sale_resolved', name: 'Nhân viên sale đã xử lý'},
      {id: 'pending_sale', name: 'Tạm dừng'},
      {id: 'cancel_sale', name: 'Đã hủy'},
      {id: 'inventory_open', name: 'Kho tiếp nhận'},
      {id: 'inventory_processing', name: 'Kho đang xử lý'},
      {id: 'inventory_resolved', name: 'Kho đã xử lý'},
      {id: 'inventory_pending', name: 'Tạm dừng tại kho'},
      {id: 'inventory_cancel', name: 'Đã hủy tại kho'},
      {id: 'ship_open', name: 'Ship tiếp nhận'},
      {id: 'ship_processing', name: 'Ship đang xử lý'},
      {id: 'ship_resolved', name: 'Ship hoàn thành'},
      {id: 'ship_failure', name: 'Không ship được hàng'},
      {id: 'ship_return', name: 'Hàng đã trả lại'},
      {id: 'ship_pending', name: 'Tạm dừng ship'},
      {id: 'ship_problem', name: 'Ship gặp sự cố cần xử lý'},
      {id: 'ship_cancel', name: 'Đã hủy tại ship'},
    ];
  }

  public static get createdSourceOrder(): any {
    return [
      {id: 'backend', name: 'Backend', fee: 2.2},
      {id: 'web', name: 'Đơn hàng từ web', fee: 2.2},
      {id: 'shopee', name: 'Hệ thống shopee', fee: 2.2},
      {id: 'tiki', name: 'Hệ thống tiki', fee: 2.2},
      {id: 'postmart', name: 'Hệ thống postmart', fee: 2.2},
      {id: 'tiktok', name: 'Hệ thống Tiktok', fee: 2.2},
      {id: 'sendo', name: 'Hệ thống sendo', fee: 2.2},
      {id: 'lazada', name: 'Hệ thống lazada', fee: 2.2},
      {id: 'Affiliate_Accesstrade', name: 'Affiliate Accesstrade', fee: 2.2},
      {id: 'ctv', name: 'Cộng tác viên', fee: 2.2},
      
    ];
  }
  public static get keyMaketing(): string {
    return 'mkt-department';
  }

  public static get keySale(): string {
    return 'sales-department';
  }

  public static get keySystem(): string {
    return 'admin';
  }

  public static get feedbackStatus(): any {
    return [
      {id: 10, text: 'Mới tạo'},
      {id: 20, text: 'Đang xử lý'},
      {id: 30, text: 'Đã xử lý'},
      {id: 40, text: 'Đã hoàn thành'},
    ];
  }

  public static get feedbackType(): any {
    return [
      {id: 10, text: 'Tư vấn sản phẩm'},
      {id: 20, text: 'Thông tin đơn hàng'},
    ];
  }

  public static get answerType(): any {
    return [
      {id: 10, text: 'Gọi điện'},
      {id: 20, text: 'Gửi email'},
      {id: 30, text: 'Gửi tin nhắn'},
    ];
  }

  public static get adsFlatform(): any {
    return [
      {id: 'facebook', name: 'Facebook', color: '#598bff'},
      {id: 'google', name: 'Google search', color: '#FF0000'},
    ];
  }

  public static get adsMetric(): any {
    return [
      {id: 'cost', name: 'Chi phí'},
      {id: 'impr', name: 'Số lượt hiển thị'},
      {id: 'clicks', name: 'Số hành động'},
      {id: 'conversions', name: 'Số lượt chuyển đổi'},
      {id: 'total_lead', name: 'Số lead'},
      {id: 'total_order', name: 'Số đơn hàng'},
      {id: 'total_quantity', name: 'Số sản phẩm'},
    ];
  }
  public static get priorityProduct(): any {
    return [
      {id: 10, text: 'Cần gấp'},
      {id: 20, text: 'Cần gọi'},
      {id: 30, text: 'Bình thường'},
    ];
  }

  public static get typeDiscounts(): any {
    return [
      {id: '0606', text: 'Tặng kèm sản phẩm'},
      {id: '0601', text: 'Tặng kèm sản phẩm'},
      {id: '0501', text: 'giảm phí vận chuyển'},
      {id: '0505', text: 'Giảm giá giỏ hàng'},
      {id: '0506', text: 'Giảm giá STMDT'}];
  }

  public static get opportunitySourceType(): any {
    return [
      {id: 1, name: 'Hotline', code: 'hotline'},
      {id: 2, name: 'Facebook', code: 'facebook'},
      {id: 3, name: 'Landing page', code: 'ldp'},
      {id: 4, name: 'TMDT', code: 'tmdt'},
      {id: 0, name: 'Khác', code: 'other'},
    ];
  }

  public static get typeOpportunity(): any {
    return [
      {id: 1, name: 'Ticket'},
      {id: 4, name: 'Reopen'},
      {id: 5, name: 'Upsale'},
    ];
  }

  public static get perPages(): any {
    return [10, 20, 50, 100, 500];
  }
  public static get ProcessStatusV2(): any {
    return [
      {id: 20, name: 'Chưa xử lý'},
      {id: 101, name: 'Gọi lại sau'},
      {id: 102, name: 'Chờ tạo đơn'},
      {id: 104, name: 'Đóng - Ra đơn'},
      {id: 12, name: 'Đóng - Không mua'},
      {id: 99, name: 'Đóng - Trùng'},
      {id: 103, name: 'Đóng - Huỷ, Spam'},
    ]
  }
  public static get ResultCallRequiedUpdatePendingToDate(): any {
    return [
      {code: 20, name: 'KH phân vân'},
      {code: 30, name: 'SDT Bận/K nghe máy'},
      {code: 31, name: 'KH Hẹn gọi lại'},
      {code: 40, name: 'KH Chốt'}
    ]
  }
  // phân quyền bus loc dữ liệu
  public static BusSaleMember = "member"
  public static BusSaleLeader = "leader"
  public static BusSaleManager = "manager"
  public static BusSaleAdmin = "admin"


}

export interface TreeNode<T> {
  data?: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

export interface FSEntry {
  id: number;
  customerName?: string;
  stauts?: string;
  empEssign?: string;
  modifieldOn?: string;
  pendingToDate?: string;
  expToDate?: string;
}

