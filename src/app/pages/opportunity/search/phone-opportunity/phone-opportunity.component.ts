// Phone number: 0999012347

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CustomerService} from '../../../../@core/services/customer.service';
import {OpportunityService} from '../../../../@core/services/opportunity.service';
import {AppConstants} from '../../../../@core/utils/app.constants';
import {OrderService} from '../../../../@core/services/order.service';

@Component({
  selector: 'ngx-phone-opportunity',
  templateUrl: './phone-opportunity.component.html',
  styleUrls: ['./phone-opportunity.component.scss'],
})

export class PhoneOpportunityComponent implements OnInit {
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

  constructor(
    public route: ActivatedRoute,
    private customerService: CustomerService,
    private opportunityService: OpportunityService,
    private orderService: OrderService) {
  }

  showPhone(telephone): string {
    return 'xxx' + telephone.slice(-5);
  }

  checkPoint(phone: string = '', customerId: number = 0) {
    if ((phone !== null && phone !== undefined && phone.length >= 10) || (customerId !== null && customerId > 0)) {
      this.customerService.checkPointByPhone(phone, customerId).then((data: any) => {
        this.point = data.point;
        this.pointFuture = data.pointFuture;
      }).catch(ex => {
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

  ngOnInit(): void {
    this.phoneNumber = this.route.snapshot.paramMap.get('phone');
    if (typeof this.phoneNumber === 'string')
    this.customerService.searchUsers(this.phoneNumber).subscribe(data => {
      if (data.length !== 0) {
        this.customer = data[0];
        this.checkPoint('', this.customer.customerId);
        this.getListOpp(this.customer.phone);
        this.orderService.getOrderInfosByCustomer(this.customer.customerId).subscribe(
          (dataOrderData) => {
            this.dataOrder = dataOrderData;
          });
        this.orderService.getOrderItemsByCustomer(this.customer.customerId, 0, 50).subscribe((dataProductData) => {
          this.dataProduct = dataProductData;
        });
      }
      },
    );
  }
}
