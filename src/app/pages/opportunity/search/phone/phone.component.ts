import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {CustomerService} from '../../../../@core/services/customer.service';
import {OpportunityService} from '../../../../@core/services/opportunity.service';
import {AppConstants} from '../../../../@core/utils/app.constants';
import {OrderService} from '../../../../@core/services/order.service';
import {PreviousRouteService} from '../../../../@core/services/previousRouteService';
import {filter} from 'rxjs/operators';

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
  dataProduct: Array<any> = [];
  errorLog: string = '';
  previousUrl: string;

  constructor(
    public route: ActivatedRoute,
    private customerService: CustomerService,
    private opportunityService: OpportunityService,
    private previousRouteService: PreviousRouteService,
    private router: Router,
    private orderService: OrderService,) {
    this.route.queryParams.subscribe(params => {
      this.phoneNumber = params['phone'];
    });
  }

  ngOnInit(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.previousUrl = event.url;
      });
    this.getInfoByPhone();
  }

  getInfoByPhone() {
    if (this.validatePhoneNumber(this.phoneNumber)) {
      this.customerService.searchUsers(this.phoneNumber).subscribe(data => {
        // Check if phone number exist
        if (data === null) {
          this.errorLog = 'Dữ liệu số điện thoại không tồn tại!';
        } else {
          this.customer = data[0];
          this.checkPoint('', this.customer.customerId);
          this.getListOpp(this.customer.phone);
          this.orderService.getOrderInfosByCustomer(this.customer.customerId).subscribe(data => {
            this.dataOrder = data;
          });
          this.orderService.getOrderItemsByCustomer(this.customer.customerId, 0, 50).subscribe(dataProductData => {
            this.dataProduct = dataProductData;
          });
        }
      });
    }
  }

  showPhone(telephone): string {
    return 'xxx' + telephone.slice(-5);
  }

  checkPoint(phone: string = '', customerId: number = 0) {
    if ((phone !== null && phone !== undefined && phone.length >= 10) || (customerId !== null && customerId > 0)) {
      this.point = 0;
    }
  }

  getListOpp(phone): void {
    this.opportunityService.getOpportuntiesByPhone(phone.slice(-9), 1, 50, -1).then((data: any) => {
      // console.log(data);
      this.dataOpp = data;
    });
  }

  showItemName(items, id) {
    const item = items.find(x => x.id === id);
    if (item === undefined) {
      return '';
    } else return item.name;
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
        return false;
      } else return true;
    } else {
      this.errorLog = 'Bạn chưa điền số điện thoại!';
      return false;
    }
  }

  updatePhone() {
    this.errorLog = '';
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        phone: this.phoneNumber,
      },
    });
    this.getInfoByPhone();
  }
}
