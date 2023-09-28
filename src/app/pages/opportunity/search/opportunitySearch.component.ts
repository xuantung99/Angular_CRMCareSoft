import {Component, EventEmitter, Inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NbThemeService, NbWindowRef, NbWindowService} from '@nebular/theme';
import {debounceTime, distinctUntilChanged, switchMap, takeWhile, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../../../@core/services/api.service';
import {NotiService} from '../../../@core/services/noti.service';
import {PermissionService} from '../../../@core/services/permission.service';
import {NbAuthJWTToken, NbAuthService} from '@nebular/auth';
import {AppConstants} from '../../../@core/utils/app.constants';
import {CardSettingModel} from '../../../model/cardSetting.model';
import {OpportunityService} from '../../../@core/services/opportunity.service';
import {OrderService} from '../../../@core/services/order.service';
import {CustomerService} from '../../../@core/services/customer.service';

interface KeywordInfo {
  id: number;
  keyword: string;
}

@Component({
  selector: 'ngx-opportunity-search',
  styleUrls: ['./opportunitySearch.component.scss'],
  templateUrl: './opportunitySearch.component.html',
})

export class OpportunitySearchComponent implements OnInit, OnDestroy {
  commonStatusCardsSet: CardSettingModel[] = [];
  statusCards: string;
  user: any;
  wRef: NbWindowRef;
  dataProduct = [];
  oppProducts = [];
  dataOpp = [];
  dataOrder: any[] = [];
  dataShipments = [];
  oppSource = [];
  oppStatus = [];
  point = 0;
  pointFuture = 0;

  customer: any = null;
  dataCustomer: any;
  peopleLoading = false;
  peopleInput$ = new EventEmitter<string>();
  listOrderStatus: any = AppConstants.orderStatus;
  contactStatus: any = AppConstants.contactStatus;
  sourceDetails: any = AppConstants.oppSource;
  processStatus: any = AppConstants.processStatus;
  oppType: any = AppConstants.typeOpportunity;
  keywords: KeywordInfo[] = [];
  tags: any = [];
  statusCardsByThemes: {
    default: CardSettingModel[];
    cosmic: CardSettingModel[];
    corporate: CardSettingModel[];
    dark: CardSettingModel[];
  } = {
    default: this.commonStatusCardsSet,
    cosmic: this.commonStatusCardsSet,
    corporate: this.commonStatusCardsSet,
    dark: this.commonStatusCardsSet,
  };
  private alive = true;

  constructor(private themeService: NbThemeService
    , private api: ApiService
    , private permission: PermissionService
    , private windowService: NbWindowService
    , private orderService: OrderService
    , private customerService: CustomerService
    , private opportunityService: OpportunityService
    , private router: Router
    , private authService: NbAuthService
    , @Inject(ActivatedRoute) private routeA: ActivatedRoute
    , private http: HttpClient
    , private noti: NotiService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
      });

    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.user = token.getPayload();
        }
      });
  }

  ngOnInit(): void {
    this.loadPeople();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  loadPeople() {
    this.peopleInput$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap(() => this.peopleLoading = true),
      switchMap(term => this.customerService.searchUsers(term)),
    ).subscribe(items => {
      this.dataCustomer = items;
      this.peopleLoading = false;
    }, (err) => {
      this.dataCustomer = [];
      this.peopleLoading = false;
    });
  }

  addTagFn(name) {
    return {customerId: 0, phone: name, fullName: ''};
  }

  selectCustomer(item) {
    this.dataOrder = [];
    this.customer = item;
    if (this.customer !== null) {
      if (this.customer.customerId > 0) {
        if (this.customer.shippingAddress !== null) {
          for (const sm of this.customer.shippingAddress) {
            this.dataShipments.push({
              id: sm.shippingAddressId,
              name: sm.address + ' - ' + sm.subDistrictName + ' - ' + sm.districtName + ' - ' + sm.provinceName,
            });
          }
        }
      }
      this.orderService.getOrderInfosByCustomer(this.customer.customerId).subscribe(
        (data) => {
          this.dataOrder = data;
        },
      );
      this.orderService.getOrderItemsByCustomer(this.customer.customerId, 0, 50).subscribe((data) => {
          this.dataProduct = data;
        },
      );

      this.checkPoint('', this.customer.customerId);
    }

    this.getListOpp(this.customer.phone);
  }

  getListOpp(phone) {
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

  editTicket(ticketDetail) {
    this.router.navigate(['/opportunity/edit/' + ticketDetail.id]);
  }

  showOrderStatus(status) {
    const item = this.listOrderStatus.find(x => x.id === status);
    if (item === undefined) {
      return '';
    } else {
      return item.name;
    }
  }

  showPhone(telephone) {
    return 'xxx' + telephone.slice(-5);
  }

  checkPoint(phone: string = '', customerId: number = 0) {
    // if ((phone !== null && phone !== undefined && phone.length >= 10) || (customerId !== null && customerId > 0)) {
    //   this.customerService.checkPointByPhone(phone, customerId).then((data: any) => {
    //     this.point = data.point;
    //     this.pointFuture = data.pointFuture;
    //   }).catch(ex => {
    //     this.point = 0;
    //   });
    // }
  }

  showPoint() {}
}
