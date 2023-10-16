import {Component, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CustomerService} from '../../../../@core/services/customer.service';
import {OpportunityService} from '../../../../@core/services/opportunity.service';
import {AppConstants} from '../../../../@core/utils/app.constants';
import {OrderService} from '../../../../@core/services/order.service';
import {nbAuthCreateToken} from '@nebular/auth';
import {NgIfContext} from '@angular/common';

@Component({
  selector: 'ngx-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss'],
})

export class PhoneComponent implements OnInit {
  phoneNumber: string = '';
  customer: any = null;
  point: number = 0;
  pointFuture: number = 0;
  dataOpp: Array<any> = [];
  oppType: any = AppConstants.typeOpportunity;
  sourceDetails: any = AppConstants.oppSource;
  processStatus: any = AppConstants.processStatus;
  contactStatus: any = AppConstants.contactStatus;
  listOrderStatus: any = AppConstants.orderStatus;
  dataOrder: Array<any> = [];
  dataProduct: Array<any>  = [];
  errorLog: string = '';

  constructor(
    public route: ActivatedRoute,
    private customerService: CustomerService,
    private opportunityService: OpportunityService,
    private orderService: OrderService) {
    this.route.queryParams.subscribe(params => {
      this.phoneNumber = params['phone'];
    });
  }

  ngOnInit(): void {
    console.log('SỐ ĐỆN THOẠI' , this.phoneNumber);
    // Validate phone number
    if (this.validatePhoneNumber(this.phoneNumber))
      this.customerService.searchUsers(this.phoneNumber).subscribe(data => {
        // Check if phone number exist
        if (data === null) {
          this.errorLog = 'Số điện thoại không tồn tại';
          console.log(this.errorLog);
        } else {
          this.customer = data[0];
          this.checkPoint('', this.customer.customerId);
          this.getListOpp(this.customer.phone);
          this.orderService.getOrderInfosByCustomer(this.customer.customerId).subscribe(
            (dataOrderData) => {
              this.dataOrder = dataOrderData;
            });
          this.orderService.getOrderItemsByCustomer(this.customer.customerId, 0, 50).subscribe((dataProductData) => {
            this.dataProduct = dataProductData;
          })
        }})
  }

  showPhone(telephone): string {
    return 'xxx' + telephone.slice(-5);
  }

  checkPoint(phone: string = '', customerId: number = 0) {
    if ((phone !== null && phone !== undefined && phone.length >= 10) || (customerId !== null && customerId > 0)) {
      this.customerService.checkPointByPhone(phone, customerId).then((data: any) => {
        this.point = data.point;
        this.pointFuture = data.pointFuture;
      }).catch(() => {
        this.point = 0;
      });
    }
  }

  getListOpp(phone): void {
    this.opportunityService.getOpportuntiesByPhone(phone.slice(-9), 1, 50, -1).then((data: any) => {
      this.dataOpp = data;
    });
  }

  showItemName(items, id) {
    const item = items.find(x => x.id === id);
    if (item === undefined) {
      return '';
    } else {
      return item.name;
    }
  }

  showPoint() {
  }

  showOrderStatus(status) {
    const item = this.listOrderStatus.find(x => x.id === status);
    if (item === undefined) {
      return '';
    } else {
      return item.name;
    }
  }

  validatePhoneNumber(phoneNumber) {
    const regex: RegExp = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    if (phoneNumber !== '') {
      if (regex.test(phoneNumber) === false) {
        this.errorLog = 'Số điện thoại không đúng định dạng!';
        console.log(this.errorLog);
        return false;
      } else return true;
    } else {
      this.errorLog =  'Bạn chưa điền số điện thoại!';
      console.log(this.errorLog);
      return false;
    }}

  protected readonly Text = Text;
  protected readonly nbAuthCreateToken = nbAuthCreateToken;
  protected readonly TemplateRef = TemplateRef;
  protected readonly NgIfContext = NgIfContext;
}
