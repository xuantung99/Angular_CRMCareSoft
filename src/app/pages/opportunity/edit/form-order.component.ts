import {ProductService} from '../../../@core/services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NbTabComponent, NbTabsetComponent, NbThemeService, NbWindowRef, NbWindowService} from '@nebular/theme';
import {NotiService} from '../../../@core/services/noti.service';
import {NbAuthJWTToken, NbAuthService} from '@nebular/auth';
import {PromotionComponent} from '../promotion/promotion.component';
import {AppConstants} from '../../../@core/utils/app.constants';
import {OpportunityService} from '../../../@core/services/opportunity.service';
import {OpportunitySourceService} from '../../../@core/services/opportunitySource.service';
import {OpportunityStatusService} from '../../../@core/services/opportunityStatus.service';
import {CustomerService} from '../../../@core/services/customer.service';
import {LocationService} from '../../../@core/services/location.service';
import {KeywordService} from '../../../@core/services/keyword.service';
import {OrderService} from '../../../@core/services/order.service';
import {OtherService} from '../../../@core/services/other.service';
import {InventoryService} from '../../../@core/services/inventory.service';
import {OpportunityModel} from '../../../model/opportunity.model';
import {PromotionService} from '../../../@core/services/promotion.service';
import {OpportunitySourceModel} from '../../../model/opportunitySource.model';
import {OpportunityStatusModel} from '../../../model/opportunityStatus.model';
import {OpportunityLogService} from '../../../@core/services/opportunityLog.service';
import {OpportunityLogModel} from '../../../model/opportunityLog.model';
import {Component, EventEmitter, Inject, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {debounceTime, distinctUntilChanged, switchMap, takeWhile, tap} from 'rxjs/operators';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-opportunity-edit',
  styleUrls: ['./form-order.component.scss'],
  templateUrl: './form-order.component.html',
})
export class FormOrderComponent implements OnInit, OnDestroy {
  wRef: NbWindowRef;
  peopleInput$ = new EventEmitter<string>();
  keywordInput$ = new EventEmitter<string>();
  @ViewChild('tabDetail', {static: true}) tabDetail: NbTabsetComponent;
  @ViewChild('tabOrder', {static: true}) tabOrder: NbTabComponent;
  @Input('oppId') oppIdInput: string;
  // variable
  statusCards: string;
  popup: boolean = false;
  paidStatus: boolean = false;
  shipSubDistrictCode: string;
  point: number = 0;
  totalPoint: number = 0;
  coefficientPoint: number = 10000;
  conditionPoint: number = AppConstants.conditionPoint;
  provinceCode: string;
  provinceName: string;
  districtCode: string;
  districtName: string;
  subDistrictCode: string;
  subDistrictName: string;
  shipAddressLine1: string;
  shippingAddressId: number = 0;
  shipminetPhone: string;
  shipminetFullname: string;
  shipminetEmail: string;
  customerNote: string;
  customerFullname: string;
  customerEmail: string;
  customerPhone: string;
  totalAmount: number = 0;
  totaDiscount: number = 0;
  promotionId: number = 0;
  discountCode: '';
  discountCodeE: string = 'Bạn hãy nhập mã khuyến mại';
  promotionCode: string = '';
  checkCreateOrder: number = 1;
  description: string = '';
  useOfDay: number = 0;
  peopleLoading: boolean = false;
  keywordLoading: boolean = false;
  oppProvinceName: string = '';
  oppDistrictName: string = '';
  oppSubDistrictName: string = '';
  totalDiscounts: number = 0;
  createdSource: string = 'backend';
  typeShip: number = 1;
  Comment: string = '';
  loading: boolean = false;
  private alive: boolean = true;
  applyWithCombo: boolean = false;
  HasPromotion: number = 0;
  commonStatusCardsSet: CardSettings[] = [];
  listOpps: OpportunityModel[] = [];
  listPromotions = [];
  itemsPoint = [{id: 0, name: 'không sử dụng điểm'}];
  shipMents: Array<any> = [];
  dataShipments: Array<any> = [];
  products: Array<any> = [];
  dataP: Array<any> = [];
  dataPC: Array<any> = [];
  dataCombo: Array<any> = [];
  dataProduct: Array<any> = [];
  promotions: any = [];
  discountProduct: Array<any> = [];
  resultCalls = AppConstants.resultCalls;
  keywords: Array<any> = [];
  oppOrders: Array<any> = [];
  oppProducts: Array<any> = [];
  dataOrder: Array<any> = [];
  dataLogs: OpportunityLogModel[] = [];
  dataLogDetails: OpportunityLogModel[] = [];
  dataLogOpp: OpportunityLogModel[] = [];
  oppSource: OpportunitySourceModel[] = [];
  listOrderStatus: any = AppConstants.orderStatus;
  listProcessStatus: any = AppConstants.processStatus;
  listSource: any = AppConstants.createdSourceOrder;
  oppStatus: Array<any> = [];
  shippingTypes: any = [
    {value: 1, name: 'Tính phí vận chuyển'},
    {value: 0, name: 'Nhận hàng tại kho không tính phí'},
    {value: -1, name: 'Ship không tính phí'},
  ];
  works: any = [];
  tags: any = [];
  dataSourceContent: Array<any> = [];
  promotionSelected: any = [];
  // object
  formError: any = {};
  promotion: any = {};
  opp: OpportunityModel = new OpportunityModel();
  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
    dark: CardSettings[];
  } = {
    default: this.commonStatusCardsSet,
    cosmic: this.commonStatusCardsSet,
    corporate: this.commonStatusCardsSet,
    dark: this.commonStatusCardsSet,
  };
  user: any;
  inventories: any;
  productInfo: any = null;
  provinces: any;
  districts: any;
  subDistricts: any;
  productId: any;
  product: any;
  searchProductId: any;
  contentProductId: any;
  shipment: any;
  shipmentVendor: any;
  shipmentList: any;
  customer: any = null;
  dataCustomer: any;
  dataKeywords: any;
  orderInfo: any;
  IdChecked: boolean = false;
  errorLog: string = '';

  constructor(
    private route: ActivatedRoute,
    private themeService: NbThemeService,
    private windowService: NbWindowService,
    private opportunityService: OpportunityService,
    private opportunityLogService: OpportunityLogService,
    private opportunitySourceService: OpportunitySourceService,
    private opportunityStatusService: OpportunityStatusService,
    private productService: ProductService,
    private customerService: CustomerService,
    private locationService: LocationService,
    private keywordService: KeywordService,
    private orderService: OrderService,
    private otherService: OtherService,
    private promotionService: PromotionService,
    private inventoryService: InventoryService,
    private router: Router,
    private authService: NbAuthService,
    @Inject(ActivatedRoute) private routeA: ActivatedRoute,
    private noti: NotiService) {
    this.route.queryParams.subscribe(params => {
      this.oppIdInput = params['ticket_id'];
      this.customerPhone = params['customer_phone'];
      this.customerFullname = params['customer_name'];
    });
    this.themeService.getJsTheme().pipe(takeWhile(() => this.alive)).subscribe(theme => {
      this.statusCards = this.statusCardsByThemes[theme.name];
    });
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.user = token.getPayload();
      }
    });
    this.locationService.getAllProvince().then(data => this.provinces = data);
  }

  ngOnInit(): void {
    if (this.validatePhoneNumber(this.customerPhone)) {
      this.orderService.checkOrderCareSoftById(this.oppIdInput.toString()).subscribe(data => {
        console.log(data);
        if (data !== 0) this.errorLog = 'Đơn hàng đã được tạo trên ticket!';
        else this.getOrderDetail();
      });
    }
  }

  getOrderDetail() {
    this.errorLog = 'No error';
    this.formError.noCustomer = false;
    this.loadPeople();
    this.loadKeyword();
    this.otherService.getAllShipmentVendor().then((data: any) => {
      this.shipmentList = data;
      this.shipmentVendor = data.find(x => x.shipmentVendorId === 5);
    });
    this.productService.getAllProductDetails().then((data: any) => {
      this.dataP = data;
      this.productService.getAllProductInCustomers().then((dataC: any) => {
        this.dataPC = data;
        for (const p of dataC) {
          if (p.type === 2) this.dataPC.push({Id: p.id, type: p.type, Name: p.productName, contents: JSON.parse(p.contents)});
        }
      });
    });
    this.opportunitySourceService.getAll(1000).then((data: OpportunitySourceModel[]) => {
      this.oppSource = data;
    });
    this.opportunityStatusService.getAll(1000).then((data: OpportunityStatusModel[]) => {
      this.oppStatus = data;
    });
    this.inventoryService.getAll().then(data => {
      this.inventories = data;
    });
    if (typeof this.oppIdInput !== 'undefined' && parseInt(this.oppIdInput, 0) > 0) {
      this.opp.id = parseInt(this.oppIdInput, 0);
      this.getOppDetail(this.oppIdInput);
      this.popup = true;
    } else {
      this.routeA.params.subscribe(params => {
        this.opp.id = params['ticket_id'] === undefined ? 0 : Number(params['ticket_id']);
        if (this.opp.id > 0) {
          this.getOppDetail(this.opp.id);
        }}
      )}
    // console.log(this.oppIdInput, this.opp.id);
    this.promotionService.CheckApplyWithCombo().then((data: any) => {
      this.applyWithCombo = data;
    });
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
    }, () => {
      this.dataCustomer = [];
      this.peopleLoading = false;
    });
  }

  loadKeyword() {
    this.keywordInput$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap(() => this.keywordLoading = true),
      switchMap(term => this.keywordService.seachKeyword(term, this.keywords)),
    ).subscribe(items => {
      this.dataKeywords = items;
      this.keywordLoading = false;
    }, () => {
      this.dataKeywords = [];
      this.keywordLoading = false;
    });
  }

  getOppDetail(oppId): void {
    // console.log(oppId);
    this.opportunityService.getOpportuntyCareSoftById(oppId).subscribe(
      data => {
        // console.log(data);
        this.IdChecked = true;
        this.opp = data;
        this.opp.source = Number(this.opp.source);
        this.opp.status = Number(this.opp.status);
        this.dataLogs = this.opp.logs;
        this.oppOrders = this.opp.orders;
        this.oppProducts = this.opp.items;
        this.tags = this.opp.tags;
        this.works = this.opp.works;
        this.opp.provinceCode = Number(this.opp.provinceCode);
        this.opp.districtCode = Number(this.opp.districtCode);
        this.opp.subDistrictCode = Number(this.opp.subDistrictCode);
        if (this.opp.phone !== '') {
          this.getCustomerInfo(this.opp.phone.slice(-9));
          this.getListOpp(this.opp.phone.slice(-9));
        } else if (this.opp.email !== '') {
          this.getCustomerInfo(this.opp.email);
        }
        if (this.oppProducts.length > 0) {
          this.products = [];
          for (const p of this.oppProducts) {
            const pDetail = this.dataP.find(x => x.Id === p.productId);
            if (pDetail) {
              this.selectProduct(pDetail, false);
              p.itemId = p.productId;
              p.itemSku = pDetail.ProductSkus[0].Sku;
              p.salePrice = pDetail.ProductSkus[0].SalePrice;
              p.originalPrice = pDetail.ProductSkus[0].SalePrice;
              p.itemName = pDetail.Name;
              p.weight = pDetail.ProductSkus[0].WeightGram;
              this.contentProductId = p.productId;
              this.searchProductId = p.productId;
              this.searchDataPromotion(pDetail);
              this.searchDataContent();
            } else {
              this.productService.getProductDetailById(p.productId).subscribe(
                dat => {
                  this.selectProduct(dat, false);
                  p.itemId = p.productId;
                  p.itemSku = dat.ProductSkus[0].Sku;
                  p.salePrice = dat.ProductSkus[0].SalePrice;
                  p.originalPrice = dat.ProductSkus[0].SalePrice;
                  p.itemName = dat.Name;
                  p.weight = dat.ProductSkus[0].WeightGram;
                  this.contentProductId = p.productId;
                  this.searchProductId = p.productId;
                  this.searchDataPromotion(dat);
                  this.searchDataContent();
                });
            }
          }
        }

        if (this.oppOrders.length > 0) {
          for (const order of this.oppOrders) {
            order.ItemLines = JSON.parse(order.items);
            order.OrderDiscounts = JSON.parse(order.discounts);
          }
        }
        if (this.dataLogs.length > 0) {
          for (const log of this.dataLogs) {
            log.oldStatusName = this.listProcessStatus.find(x => x.id === log.oldStatus)?.name;
            log.newCallStatusName = this.resultCalls.find(x => x.code === log.newCallStatus)?.name;
          }
        }
        this.dataLogDetails = this.dataLogs.filter(x => x.contactNumber > 0);
        this.getLocation();

        if (this.opp.referenceOppId !== null) {
          this.getOppInfo(this.opp.referenceOppId);
        }

        if (this.opp.orderCode !== null) {
          this.getOrderInfo(this.opp.orderCode);
        }
      });
  }

  getCustomerInfo(keyword) {
    this.customerService.getCustomerBySearchKey(keyword).then((data) => {
      this.selectCustomer(data);
    }).catch(ex => {
      this.formError.noCustomer = true;
      this.customerFullname = this.opp.fullName;
      this.customerPhone = this.opp.phone;
      this.customerEmail = this.opp.email;
      this.createLocation();
    });
  }

  getListOpp(phone) {
    this.opportunityService.getOpportuntiesByPhone(phone, 1, 50, -1).then((data: any) => {
      this.listOpps = data;
    });
  }

  getLocation(): void {
    if (this.opp.provinceCode !== null && this.opp.provinceCode !== undefined && this.opp.provinceCode > 0) {
      const pv = this.provinces?.find(x => x.provinceId === this.opp.provinceCode);
      if (pv) {
        this.oppProvinceName = pv.provinceName + ' - ';
      }
      this.locationService.getDistrictByProvinceId(this.opp.provinceCode).then(data => {
        this.districts = data;
        const dt = this.districts.find(x => x.districtId === this.opp.districtCode);
        if (dt) {
          this.oppDistrictName = dt.districtName + ' - ';
        }
      });
    }

    if (this.opp.districtCode !== null && this.opp.districtCode !== undefined && this.opp.districtCode > 0) {
      this.locationService.getSubDistrictByDistrictId(this.opp.districtCode).then(data => {
        this.subDistricts = data;
        const st = this.subDistricts.find(x => x.wardId === this.opp.subDistrictCode);
        if (st) {
          this.oppSubDistrictName = st.wardName;
        }
      });
    }
  }

  getOppInfo(oppId) {
    this.opportunityService.getOpportuntyById(oppId).subscribe(data => {
      if (data !== null && data !== undefined) {
        this.getOppLog(data.id);
        if (data.referenceOppId !== null && data.referenceOppId !== data.id) {
          this.getOppInfo(data.referenceOppId);
        }
      }
    });
  }

  getOppLog(oppId) {
    this.opportunityLogService.getLogByOppId(oppId).then((data: any) => {
      for (const lg of data) {
        for (const log of this.dataLogs) {
          lg.oldStatusName = this.listProcessStatus.find(x => x.id === lg.oldStatus)?.name;
          lg.newStatusName = this.resultCalls.find(x => x.code === lg.newStatus)?.name;
        }
        this.dataLogOpp.push(lg);
      }
    });
  }

  getDayofUse() {
    if (this.products.length > 0 || this.dataCombo.length > 0) {
      const dataP = [];
      const productIds = [];
      for (const product of this.products) {
        if (productIds.find(x => x === product.itemId) === undefined) {
          dataP.push(product);
          productIds.push(product.itemId);
        }
      }

      for (const dcb of this.dataCombo) {
        for (const product of dcb.promotionItems) {
          if (productIds.find(x => x === product.itemId) === undefined) {
            dataP.push(product);
            productIds.push(product.itemId);
          }
        }
      }
      if (productIds.length > 0) {
        this.productService.getProductCourse(productIds).then((data: any) => {
          if (data.length > 0) {
            for (const product of dataP) {
              for (const dat of data) {
                if (product.itemId === dat.productId) {
                  product.dayOfUse = dat.dayOfUse;
                }
              }
            }
            this.calcUseOfDay(dataP);
          }
        });
      }
    }
  }

  calcUseOfDay(dataP) {
    if (dataP.length > 0) {
      const itemMin = dataP.reduce((prv, curr) => {
        return (prv.dayOfUse * prv.quantity) > (curr.dayOfUse * curr.quantity) ? curr : prv;
      });
      this.useOfDay = itemMin.dayOfUse * itemMin.quantity;
    } else {
      this.useOfDay = 0;
    }
  }

  addShipment() {
    this.shippingAddressId = null;
    this.shipminetPhone = '';
    this.shipminetEmail = '';
    this.shipminetFullname = '';
    this.shipAddressLine1 = '';
    this.provinceCode = null;
    this.districtCode = null;
    this.subDistrictCode = null;
  }

  resetOrder() {
    this.products = [];
    this.shipment = null;
    this.discountProduct = [];
    this.promotion = [];
    this.totalAmount = 0;
    this.totaDiscount = 0;
    this.dataShipments = [];
    this.customerFullname = '';
    this.customerEmail = '';
    this.customerPhone = '';
    this.addShipment();
  }

  createCustomer() {
    if (this.customer !== null && this.customer !== undefined) {
      if (this.shipment === null || this.shipment === undefined) {
        this.getShipingFee(1);
      } else {
        this.createOrderNew();
      }
    } else {
      let check = true;
      const dataC: any = {};
      this.formError = {};
      if (this.customerFullname === '' || this.customerFullname === null) {
        check = false;
        this.formError.fullName = true;
      }
      if (this.customerPhone === '' || this.customerPhone === null) {
        check = false;
        this.formError.phone = true;
      }
      if (check) {
        dataC.fullName = this.customerFullname;
        dataC.email = this.customerEmail;
        dataC.phone = this.customerPhone;
        this.customerService.createCustomer(dataC).then(data => {
          this.customer = data;
          if (this.shipment === null || this.shipment === undefined) {
            this.getShipingFee(1);
          } else {
            this.createOrderNew();
          }
        }).catch(ex => {
          this.checkCreateOrder = 1;
          this.noti.error(ex);
        });
      }
    }
  }

  changeProvince(event, districtCode: string = '', check = 0, ship: any = {}): void {
    if (event) {
      this.provinceName = event.provinceName;
      this.locationService.getDistrictByProvinceId(this.provinceCode).then(data => {
        this.districts = data;
        if (districtCode !== '') {
          this.districtCode = districtCode;
        } else {
          this.districtCode = null;
          this.subDistrictCode = null;
        }
        if (check === 1) {
          const dt = this.districts.find(x => x.districtId === this.districtCode);
          this.changeDistrict(dt, ship.subDistrictId, 1);
        }
      });
    }
  }

  changeDistrict(event, subDistrictCode: string = '', check = 0): void {
    if (event) {
      this.districtName = event.districtName;
      this.locationService.getSubDistrictByDistrictId(this.districtCode).then(data => {
        this.subDistricts = data;
        if (subDistrictCode !== '') {
          this.subDistrictCode = subDistrictCode;
        } else {
          this.subDistrictCode = null;
        }
        if (check === 1) {
          const sdt = this.subDistricts.find(x => x.wardId === this.subDistrictCode);
          this.changeSubDistrict(sdt);
        }
      });
    }
  }

  changeSubDistrict(event) {
    if (event) {
      this.subDistrictName = event.wardName;
    }
  }

  getShipingFee(check = 0) {
    let val: boolean = true;
    if (this.provinceCode === undefined || this.provinceCode === null) {
      this.formError.provinceCode = true;
      val = false;
    }
    if (this.districtCode === undefined || this.districtCode === null) {
      this.formError.districtCode = true;
      val = false;
    }
    if (this.products.length < 1 && this.dataCombo.length < 1) {
      this.noti.error('Chưa có sản phẩm');
      val = false;
    }
    if (val) {
      if (Number(this.typeShip) > 0) {
        this.loading = true;
        const dataR: any = {};
        dataR.shipProvinceCode = this.provinceCode;
        dataR.shipProvinceName = this.provinceName;
        dataR.shipDistrictCode = this.districtCode;
        dataR.shipDistrictName = this.districtName;
        dataR.shipSubDistrictCode = this.subDistrictCode;
        dataR.shipSubDistrictName = this.subDistrictName;
        dataR.lineItems = this.createLineItem();
        this.otherService.calcShipmentFee(dataR).then(data => {
          this.shipment = data;
          if (check === 1) {
            this.createOrderNew();
          }
          this.loading = false;
        }).catch(ex => {
          this.noti.error(ex);
          this.checkCreateOrder = 1;
          this.loading = false;
        });
      } else {
        this.shipment = {
          fee: 0,
          originMethodCode: 'VTK',
          paymentMethod: 'COD',
          shipmentMethodCode: 'PHS',
          shipmentMethodId: 1,
          shipmentMethodName: 'Giao hàng tiêu chuẩn',
          shipmentVendorCode: '5nhatnhat',
          shipmentVendorId: 5,
          shipmentVendorName: '5nhatnhat',
        };
      }
    }
  }

  checkDataOrder() {
    let check = true;
    this.formError = {};
    if (this.customerFullname === null || this.customerFullname === undefined) {
      this.formError.customerFullname = true;
      check = false;
    }
    if (this.customerPhone === null || this.customerPhone === undefined) {
      this.formError.customerPhone = true;
      check = false;
    }
    if (this.useOfDay === null || this.useOfDay === undefined || this.useOfDay === 0) {
      this.formError.useOfDay = true;
      check = false;
    }
    if (this.shipminetFullname === '' || this.shipminetFullname === null || this.shipminetFullname === undefined) {
      this.formError.shipminetFullname = true;
      check = false;
    }
    if (this.shipminetPhone === '' || this.shipminetPhone === undefined) {
      this.formError.shipminetPhone = true;
      check = false;
    }
    if (this.provinceCode === null || this.provinceCode === undefined) {
      this.formError.provinceCode = true;
      check = false;
    }
    if (this.districtCode === null || this.districtCode === undefined) {
      this.formError.districtCode = true;
      check = false;
    }
    if (this.subDistrictCode === null || this.subDistrictCode === undefined) {
      this.formError.subDistrictCode = true;
      check = false;
    }
    if (this.shipAddressLine1 === '' || this.shipAddressLine1 === null || this.shipAddressLine1 === undefined) {
      this.formError.shipAddressLine1 = true;
      check = false;
    }
    if (this.products.length > 0 || this.dataCombo.length > 0) {
      if (this.products.length > 0) {
        for (const pr of this.products) {
          if (pr.quantity <= 0) {
            this.formError.order_product = true;
            check = false;
          }
        }
      }
    } else {
      this.formError.order_product = true;
      check = false;
    }
    if (check) {
      this.createCustomer();
    } else {
      this.checkCreateOrder = 1;
      this.noti.error('Bạn hãy cập nhật thông tin đơn hàng');
    }
  }

  // end
  getPromotion() {
    if (this.products.length > 0 || this.dataCombo.length > 0) {
      this.loading = true;
      const dataPrm = this.createDataPromotion(false);
      this.promotionService.checkOut(dataPrm).then(data => {
        this.promotions = data;
        let check = false;
        for (const prm of this.promotions) {
          if (this.promotionId === prm.id) {
            this.promotion = prm;
            check = true;
          }
        }
        if (check === false) {
          this.promotionId = this.promotions[0].id;
          this.promotion = this.promotions[0];
        }
        this.showPromotion();
        this.loading = false;
      }).catch(ex => {
        this.promotionId = 0;
        this.promotion = {};
        this.noti.info('Không có khuyến mại!');
        this.loading = false;
        this.showPromotion();
      });
    }
  }

  selectShipment(ship) {
    if (ship !== null) {
      this.shipminetPhone = ship.phone;
      this.shippingAddressId = ship.shippingAddressId;
      this.shipminetFullname = ship.fullName;
      this.provinceCode = ship.provinceId;
      this.shipAddressLine1 = ship.address;
      const pv = this.provinces.find(x => x.provinceId === this.provinceCode);
      this.changeProvince(pv, ship.districtId, 1, ship);
    }
  }

  createLocation() {
    const ship: any = {};
    ship.shippingAddressId = 0;
    ship.phone = this.opp.phone;
    ship.fullName = this.opp.fullName;
    ship.provinceId = this.opp.provinceCode;
    ship.districtId = this.opp.districtCode;
    ship.subDistrictId = this.opp.subDistrictCode;
    ship.address = this.opp.address;
    this.provinceCode = this.opp.provinceCode;
    this.districtCode = this.opp.districtCode;
    this.shipSubDistrictCode = this.opp.subDistrictCode;
    this.selectShipment(ship);
  }

  selectCustomer(item) {
    if (item !== null) {
      this.formError.noCustomer = false;
      this.customer = item;
      this.dataOrder = [];
      this.dataShipments = [];
      this.shippingAddressId = 0;
      this.shipMents = [];
      this.customerFullname = this.customer.fullName;
      this.customerEmail = this.customer.email;
      this.customerPhone = this.customer.phone;
      if (this.customer.shippingAddress !== null && this.customer.shippingAddress.length > 0) {
        this.shipMents = this.customer.shippingAddress;
        if (this.opp.provinceCode || this.opp.districtCode || this.opp.subDistrictCode) {
          this.createLocation();
        } else {
          this.selectShipment(this.shipMents[0]);
        }
      } else {
        this.shipminetFullname = this.customer.fullName;
        this.shipminetPhone = this.customer.phone;
      }
      this.orderService.getOrderInfosByCustomer(this.customer.customerId).subscribe(data => {
        this.dataOrder = data;
      });
      this.orderService.getOrderItemsByCustomer(this.customer.customerId, 0, 15).subscribe(data => {
        this.dataProduct = data;
      });
    } else {
      this.customerFullname = this.opp.fullName;
      this.customerEmail = this.opp.email;
      this.customerPhone = this.opp.phone;
      this.shipminetFullname = this.opp.fullName;
      this.shipminetPhone = this.opp.phone;
    }
  }

  selectProduct(item, isOrder = true) {
    this.product = item;
    // console.log(this.product);
    if (isOrder === false) {
      this.addProductToOrder();
    }
  }

  addComboProductToOrder() {
    let total = 0;
    for (const product of this.products) {
      total += product.quantity * product.salePrice;
    }
    for (const dcb of this.dataCombo) {
      for (const product of dcb.promotionItems) {
        total += product.quantity * product.salePrice;
      }
    }
    const dataPro = [];
    for (const pro of this.product.contents) {
      const p = this.dataP.find(x => x.Id === pro.id);
      dataPro.push({
        itemId: pro.id,
        itemSku: p.ProductSkus[0].Sku,
        salePrice: pro.salePrice,
        originalPrice: pro.originalPrice,
        customerPrice: pro.customerPrice,
        itemName: pro.productName,
        weight: p.ProductSkus[0].WeightGram,
        quantity: pro.quantity,
        free: pro.free,
        notes: '',
      });
      if (pro.free !== true) {
        total += pro.quantity * pro.salePrice;
      }
    }
    this.dataCombo.push({
      promotionId: this.product.Id,
      promotionName: this.product.Name,
      promotionItemsInit: dataPro,
      promotionItems: dataPro,
      quantity: 1,
      promotionOriginId: 0,
    });
    // nếu là true thì gọi function check khuyến mãi cho combo
    if (this.applyWithCombo) {
      // Chỉ đẩy sản phẩm chính lên check
      this.getPromotionByProduct(dataPro[0].itemId, parseInt(dataPro[0].quantity, 10));
    }
    // kiểm tra combo có phải là cấu hình cho chương trình khuyến mãi không
    this.promotionService.CheckPromotionCombo(this.product.Id).then((data: any) => {
      if ((data.promotionId ?? 0) !== 0) {
        this.HasPromotion = 1;
        // this.dataCombo[0].promotionOriginId = data.promotionId;
        // this.dataCombo[0].promotionOriginName = data.promotionName;
        let indexCombo = this.dataCombo.findIndex(x => x.promotionId == this.product.Id);
        this.dataCombo[indexCombo].promotionOriginId = data.promotionId;
        this.dataCombo[indexCombo].promotionOriginName = data.promotionName;
      }
    });
    this.totalAmount = total;
    this.productId = null;
    this.getDayofUse();
  }

  addProductToOrder() {
    if (this.product.type === 2) {
      this.addComboProductToOrder();
    } else {
      let total = 0;
      for (const product of this.products) {
        total += product.quantity * product.salePrice;
      }
      for (const dcb of this.dataCombo) {
        for (const product of dcb.promotionItems) {
          total += product.quantity * product.salePrice;
        }
      }
      total += this.product.ProductSkus[0].SalePrice;
      this.products.push({
        itemId: this.product.Id,
        itemSku: this.product.ProductSkus[0].Sku,
        salePrice: this.product.ProductSkus[0].SalePrice,
        originalPrice: this.product.ProductSkus[0].SalePrice,
        customerPrice: this.product.ProductSkus[0].SalePrice,
        itemName: this.product.Name,
        weight: this.product.ProductSkus[0].WeightGram,
        quantity: 1,
        check: 0,
        notes: '',
      });
      this.getPromotionByProduct(this.product.Id, 1, this.products.length);
      this.totalAmount = total;
      this.productId = null;
      this.getDayofUse();
    }
  }

  changeQuantity(quantity, index, isCombo) {
    let total = 0;
    for (const product of this.products) {
      total += product.quantity * product.salePrice;
    }
    for (const dcb of this.dataCombo) {
      for (const product of dcb.promotionItems) {
        total += product.quantity * product.salePrice;
      }
    }
    this.totalAmount = total;
    // vì combo có thể coi là một sản phẩm nên nếu khồng cài đặt khuyến mãi cho combo , check cũng không có
    if (!isCombo)
      this.getPromotionByProduct(this.products[index - 1].itemId, quantity, index);
    this.getDayofUse();
  }

  deleteItem(index, type = 0): void {
    if (type === 0) {
      this.products.splice(index, 1);
    } else {
      this.dataCombo.splice(index, 1);
    }
    let total = 0;
    for (const product of this.products) {
      total += product.quantity * product.salePrice;
    }
    for (const dcb of this.dataCombo) {
      for (const product of dcb.promotionItems) {
        total += product.quantity * product.salePrice;
      }
    }
    this.totalAmount = total;
    this.getDayofUse();
  }

  getPromotionByProduct(productId, quantity?, index?) {
    const promotionModel = [];
    promotionModel.push(
      {
        productId: productId,
        quantity: quantity !== null ? parseInt(quantity, 10) : 1,
      },
    );
    this.promotionService.getByMultipleProductsV2(promotionModel).subscribe((data: any) => {
      if (data.length > 0) {
        this.products[index - 1].promotion = data;
      }
      let total = 0;
      for (const product of this.products) {
        total += product.quantity * product.salePrice;
      }
      for (const dcb of this.dataCombo) {
        for (const product of dcb.promotionItems) {
          total += Number(product.quantity) * Number(product.salePrice);
        }
      }
      this.totalAmount = total;
    });
  }

  showPromotion() {
    this.totaDiscount = 0;
    this.discountProduct = [];
    if (this.promotionSelected.length > 0) {
      this.promotionSelected.forEach(element => {
        if (element.promotionType === 1) {
          if (element.typeId !== 3) {
            let tP = 0;
            for (const pro of element.promotionReward) {
              const rw = JSON.parse(pro.rewards);
              if (rw.Type === 1) {
                if (this.totalAmount >= Number(rw.StartPrice)) {
                  tP = rw.Discount;
                }
              } else {
                if (this.totalAmount >= Number(rw.StartPrice)) {
                  const t = (this.totalAmount / 100) * rw.Discount;
                  tP = (rw.Max !== undefined && rw.Max > 0 && t > rw.Max) ? rw.Max : t;
                }
              }
            }
            if (this.shipment !== null && element.typeId === 1) {
              tP = (Number(this.shipment.fee) >= tP) ? tP : Number(this.shipment.fee);
            }
            this.totaDiscount += Number(tP);
          } else {
            let pr = 0;
            let quantity = 0;
            for (const prw of element.promotionReward) {
              const rw = JSON.parse(prw.rewards);
              if (this.totalAmount >= Number(rw.StartPrice)) {
                pr = rw.ProductId;
                quantity = rw.Quantity;
              }
            }
            if (pr > 0) {
              const pDetail = this.dataP.find(x => x.Id === pr);
              if (pDetail) {
                this.discountProduct.push({
                  itemId: pDetail.Id,
                  itemName: pDetail.Name,
                  salePrice: 0,
                  itemSku: pDetail.ProductSkus[0].Sku,
                  originalPrice: pDetail.ProductSkus[0].SalePrice,
                  weight: pDetail.ProductSkus[0].WeightGram,
                  quantity: quantity,
                  promotionId: element.id,
                });
              }
            }
          }
        }
      });
    }
  }

  createLineItem() {
    // Check = 1 la giam gia san pham
    // Check = 3 la tang san pham
    // Tạo dữ liệu có thông tin khuyến mãi đi kèm item
    const dataL: any = [];
    if (this.products.length > 0) {
      this.products.forEach(pro => {
        if (pro.check === 3) {
          // có khuyến mãi tặng kèm
          const conditionQuantity = pro.promotion.productConditionQuantity;
          // tạo data kèm promotion
          const proApply = {...pro};
          proApply.quantity = conditionQuantity;
          proApply.promotionId = pro.promotion.promotionId;
          proApply.isParent = 1;
          dataL.push(proApply);
          const proPromotionItem = {
            itemId: pro.promotion.rewardProductId,
            itemSku: pro.promotion.sku,
            salePrice: 0,
            customerPrice: pro.promotion.salePrice,
            originalPrice: pro.promotion.SalePrice,
            itemName: pro.promotion.productName,
            weight: pro.promotion.weight,
            quantity: pro.promotion.rewardQuantity,
            notes: '',
            promotionId: pro.promotion.promotionId,
            isParent: 0,
          };
          dataL.push(proPromotionItem);
          // item không được áp dụng
          const proNotApply = {...pro};
          proNotApply.quantity = parseInt(proNotApply.quantity, 10) - conditionQuantity;
          if (proNotApply.quantity > 0)
            dataL.push(proNotApply);
        } else if (pro.check === 1) {
          const proApply = {...pro};
          proApply.promotionId = pro.promotion.promotionId;
          proApply.isParent = 1;
          dataL.push(proApply);
        } else
          dataL.push(pro);
      });
    }
    // nếu vừa là combo vừa là khuyến mãi thì vẫn thêm sản phẩm khuyến mãi ở đây
    if (this.dataCombo.length > 0) {
      for (const dcb of this.dataCombo) {
        if ((dcb.promotionOriginId ?? 0) !== 0) {
          for (const pro of dcb.promotionItems) {
            if (pro.free !== true) {
              pro.promotionId = dcb.promotionOriginId;
              pro.isParent = 1;
              dataL.push(pro);
            } else {
              pro.promotionId = dcb.promotionOriginId;
              pro.isParent = 0;
              dataL.push(pro);
            }
          }
        } else {
          for (const pro of dcb.promotionItems) {
            if (pro.free !== true) {
              dataL.push(pro);
            }
          }
        }
      }
    }
    // khuyến mãi tặng sản phẩm trên tổng đơn hàng
    // console.log('discountProduct', this.discountProduct);
    if (this.discountProduct.length > 0) {
      for (const pro of this.discountProduct) {
        pro.promotionId = pro.promotionId;
        pro.isParent = 0;
        dataL.push(pro);
      }
    }
    return dataL;
  }

  changePromotion() {
    // lấy giá trị đã chọn để hiện thị
    let promotionServiceId = 0;
    let promotionDiscountId = 0;
    let promotionGiveId = 0;
    if (this.promotionSelected.length > 0) {
      this.promotionSelected.forEach(element => {
        if (element.typeId === 1)
          promotionServiceId = element.id;
        if (element.typeId === 2)
          promotionDiscountId = element.id;
        if (element.typeId === 3)
          promotionGiveId = element.id;
      });
    }
    this.wRef = this.windowService.open(
      PromotionComponent,
      {
        title: 'Chọn chương trình khuyến mại',
        context: {
          promotionServiceId: promotionServiceId,
          promotionDiscountId: promotionDiscountId,
          promotionGiveId: promotionGiveId,
          data: this.promotions,
        },
      },
    );
    this.wRef.onClose.subscribe((res) => {
      this.promotionSelected = [];
      const conf: any = this.wRef.config.context;
      this.promotionId = conf.promotionId;
      for (const prm of this.promotions) {
        // Được chọn nhiều loại khuyến mãi
        if (conf.promotionServiceId === prm.id)
          this.promotionSelected.push(prm);
        if (conf.promotionDiscountId === prm.id)
          this.promotionSelected.push(prm);
        if (conf.promotionGiveId === prm.id)
          this.promotionSelected.push(prm);
        if (this.promotionId === prm.id) {
          this.promotion = prm;
        }
      }
      this.showPromotion();
    });
  }

  createOrder() {
    this.checkCreateOrder = 0;
    this.checkDataOrder();
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  createOrderNew() {
    if (this.products.length > 0 || this.dataCombo.length > 0) {
      if (this.shippingAddressId <= 0) {
        this.createShipment();
      }
      const now = new Date();
      const dataOrder: any = {};
      if (this.opp.id !== 0) {
        dataOrder.opportunityId = this.opp.id;
      }
      const code = now.toLocaleDateString('en-GB').toString().split('/');
      code[2] = code[2].substr(-2, 2);
      const codeO = code[2] + code[1] + code[0] + '-1' + now.getTime().toString().substr(-4, 4);
      dataOrder.orderCode = codeO + this.getRandomInt(100, 999);
      dataOrder.ReferenceCustomerId = this.customer.customerId;
      dataOrder.shippingCustomerFullname = this.shipminetFullname;
      dataOrder.shippingProvinceCode = this.provinceCode;
      dataOrder.shippingProvinceName = this.provinceName;
      dataOrder.shippingDistrictCode = this.districtCode;
      dataOrder.shippingDistrictName = this.districtName;
      dataOrder.shippingSubDistrictCode = this.subDistrictCode;
      dataOrder.shippingSubDistrictName = this.subDistrictName;
      dataOrder.shippingAddressLine = this.shipAddressLine1;
      dataOrder.shippingPhone = this.shipminetPhone;
      dataOrder.shippingCustomerEmail = this.customer.email;
      dataOrder.customerNote = this.customerNote;
      dataOrder.customerName = this.customerFullname;
      dataOrder.customerPhone = this.customerPhone;
      dataOrder.paymentMethod = 'COD';
      dataOrder.paymentDate = '';
      dataOrder.paymentTransaction = '';
      dataOrder.paymentBankCode = '';
      dataOrder.shippingMethodId = this.shipment.shipmentMethodId;
      dataOrder.shippingMethodName = this.shipment.shipmentMethodName;
      dataOrder.shipmentMethodCode = this.shipment.shipmentMethodCode;
      dataOrder.shipmentVendorId = this.shipmentVendor.shipmentVendorId;
      dataOrder.shipmentVendorCode = this.shipmentVendor.shipmentVendorCode;
      dataOrder.shipmentVendorName = this.shipmentVendor.shipmentVendorName;
      dataOrder.ShippingFee = this.shipment.fee;
      const service = [{
        serviceId: 0,
        serviceCode: '01',
        serviceName: 'Miễn phí vận chuyển',
        price: this.shipment.fee,
        notes: 'Phí vận chuyển',
      }];
      dataOrder.PointLoyalty = this.totalPoint;
      dataOrder.DeductionLoyalty = this.totalPoint * this.coefficientPoint;
      dataOrder.OrderAmount = this.totalAmount;
      dataOrder.OrderValue = this.totalAmount + this.shipment.fee - this.totaDiscount - dataOrder.DeductionLoyalty;
      dataOrder.lineItems = this.createLineItem();
      dataOrder.lineServices = service;
      dataOrder.LineDiscounts = this.createItemDiscount(this.shipment);
      dataOrder.createdBy = this.user.email;
      dataOrder.dayOfUse = this.useOfDay;
      dataOrder.createdSource = this.createdSource;
      const checkLineCombo = this.HasPromotion === 0 ||
        (
          this.HasPromotion === 1
          && (dataOrder.LineDiscounts.length === 0 || (dataOrder.LineDiscounts.findIndex(x => x.ComboId != null) === -1))
          && this.dataCombo.length > 0
        );
      // console.log('dataOrder.LineDiscounts', dataOrder.LineDiscounts);
      // console.log('dataOrder.LineDiscounts.findIndex', dataOrder.LineDiscounts.findIndex(x => x.ComboId != null));
      // console.log('checkLineCombo', checkLineCombo);
      dataOrder.LinePromotionInfors = checkLineCombo ? this.dataCombo : '';
      dataOrder.Comment = this.Comment;
      dataOrder.HasPromotion = this.HasPromotion;
      if (this.paidStatus) {
        dataOrder.paymentStatus = 'waiting_payment_confirmation';
        dataOrder.PaymentMethod = 'BankTransfer';
      } else {
        dataOrder.paymentStatus = 'paid';
      }
      if (this.dataCombo.length > 0) {
        dataOrder.hasCombo = 1;
      } else {
        dataOrder.hasCombo = 0;
      }
      this.loading = true;
      this.orderService.createOrder(dataOrder).then((data) => {
        this.applyPromotion(dataOrder.orderCode, dataOrder.LineDiscounts);
        const opportunityLogModel: any = {
          description: 'Đã tạo đơn :' + dataOrder.orderCode,
          status: this.opp.status,
          opportunityId: this.opp.id, oldStatus: this.opp.processStatus,
          // new opp log -NNEC-319
          oldSubProcess: this.opp.subProcessStatus,
          newSubProcess: this.opp.subProcessStatus,
          oldCallStatus: this.opp.status,
          newCallStatus: 40, // KH chốt
          oldPendingTime: this.opp.pendingToDate,
          newPendingTime: this.opp.pendingToDate,
          oldUserId: this.opp.userId,
          newUserId: this.user.id,
          logType: AppConstants.LogTypeOrderResolved,
          teamId: this.opp.teamId,
          divisionId: this.opp.divisionId,
          // Duy NNEC-426
          oldProcessStatus: this.opp.processStatus,
          newProcessStatus: AppConstants.ticketStatusBought,
          OppType: this.opp.type,
        };
        this.opportunityLogService.createLog(opportunityLogModel).catch(() => {
          this.noti.error('Phiếu ' + this.opp.id + ' lỗi lưu lịch sử !');
          this.noti.success(AppConstants.editSuccessMessage);
        });
        this.router.navigate(['/order/view/' + dataOrder.orderCode]).then(() => this.noti.success('Tạo đơn hàng thành công'));
        this.loading = false;
      }).catch(ex => {
        this.checkCreateOrder = 1;
        this.noti.error('Lỗi tạo đơn hàng');
        this.loading = false;
      });
    }
  }

  changeShipment(event) {
    // this.shipment.shipmentVendorId = selectShip['shipmentVendorId'];
  }

  createShipment() {
    const dataS: any = {};
    dataS.fullName = this.shipminetFullname;
    dataS.provinceId = this.provinceCode;
    dataS.provinceName = this.provinceName;
    dataS.districtId = this.districtCode;
    dataS.districtName = this.districtName;
    dataS.subDistrictId = this.subDistrictCode;
    dataS.subDistrictName = this.subDistrictName;
    dataS.phone = this.shipminetPhone;
    dataS.customerId = this.customer.customerId;
    dataS.address = this.shipAddressLine1;
    dataS.isDefault = 1;
    this.customerService.createShippingAddress(dataS).catch(ex => {
      this.noti.error('Có lỗi xảy ra');
    });
  }

  // HuyPX : truyền thêm rule xuống để check item nào được áp dụng
  createItemDiscount(shipment) {
    const dataL: any = [];
    if (this.products.length > 0) {
      for (const pro of this.products) {
        if (pro.check === 3) {
          this.HasPromotion = 1;
          dataL.push({
            promotionId: pro.promotion.promotionId,
            ServiceId: pro.promotion.productId,
            DiscountName: pro.promotion.promotionName,
            Discount: pro.promotion.salePrice,
            DiscountAmount: pro.promotion.salePrice * pro.promotion.rewardQuantity,
            SKU: pro.promotion.sku,
            ProductName: pro.promotion.productName,
            Quantity: pro.promotion.rewardQuantity,
            DiscountCode: '0606',
            Notes: '',
          });
        } else if (pro.check === 1) {
          this.HasPromotion = 1;
          dataL.push({
            promotionId: pro.promotion.promotionId,
            ServiceId: pro.itemId,
            DiscountName: pro.promotion.promotionName,
            Discount: pro.promotion.rewardDiscount,
            DiscountAmount: pro.promotion.rewardDiscount * pro.promotion.rewardQuantity,
            SKU: pro.itemSku,
            ProductName: pro.itemName,
            Quantity: pro.promotion.rewardQuantity,
            DiscountCode: '0601',
            Notes: '',
          });
        }
      }
    }
    if (this.promotionSelected.length > 0) {
      this.promotionSelected.forEach(element => {
        if (element.promotionType === 1) {
          if (element.typeId !== 3) {
            let tP = 0;
            for (const pro of element.promotionReward) {
              const rw = JSON.parse(pro.rewards);
              if (rw.Type === 1) {
                if (this.totalAmount >= Number(rw.StartPrice)) {
                  tP = rw.Discount;
                }
              } else {
                if (this.totalAmount >= Number(rw.StartPrice)) {
                  const t = (this.totalAmount / 100) * rw.Discount;
                  tP = (rw.Max !== undefined && rw.Max > 0 && t > rw.Max) ? rw.Max : t;
                }
              }
            }
            if (element.typeId === 1) {
              tP = (Number(shipment.fee) >= tP) ? tP : Number(shipment.fee);
            }
            let dName = element.name;
            if (element.coupon_code !== undefined) {
              dName = element.name + '(' + element.coupon_code + ')';
            }
            dataL.push({
              promotionId: element.id,
              ServiceId: element.id,
              DiscountName: dName,
              Discount: tP,
              DiscountAmount: tP,
              SKU: '',
              ProductName: '',
              Quantity: '',
              DiscountCode: (element.typeId === 1) ? '0501' : '0505',
              Notes: '',
            });
          } else {
            if (this.discountProduct.length > 0) {
              // tặng hàng cho giỏ hàng
              this.HasPromotion = 1;
              for (const pro of this.discountProduct) {
                dataL.push({
                  promotionId: element.id,
                  ServiceId: pro.itemId,
                  DiscountName: element.name,
                  Discount: pro.originalPrice,
                  DiscountAmount: pro.originalPrice * pro.quantity,
                  SKU: pro.itemSku,
                  ProductName: pro.itemName,
                  Quantity: pro.quantity,
                  DiscountCode: '0606',
                  Notes: '',
                });
              }
            }
          }
        }
      });
    }
    // HuyPX : nếu là combo khuyến mãi thì tạo item trong này
    if (this.HasPromotion === 1 && this.dataCombo.length > 0) {
      const comboPromotion = this.dataCombo.filter(x => (x.promotionOriginId ?? 0) !== 0);
      comboPromotion.forEach(item => {
        const productPromotion = item.promotionItems.filter(x => x.free === true);
        if (productPromotion.length > 0)
          dataL.push({
            promotionId: item.promotionOriginId,
            ServiceId: productPromotion[0].itemId,
            DiscountName: item.promotionOriginName,
            Discount: productPromotion[0].originalPrice,
            DiscountAmount: productPromotion[0].originalPrice * parseInt(productPromotion[0].quantity, 10),
            SKU: productPromotion[0].itemSku,
            ProductName: productPromotion[0].itemName,
            Quantity: parseInt(productPromotion[0].quantity, 10),
            DiscountCode: '0606',
            Notes: 'sản phẩm tách từ combo',
            ComboId: item.promotionId, // id combo
          });
      });
    }
    return dataL;
  }

  searchDataContent() {
    const sp = this.contentProductId !== null ? [this.contentProductId] : [];
    this.otherService.getKeyProd({
      products: sp,
      keywords: this.keywords.map(x => x.keyword).join(','),
    }).then((data: any[]) => {
      this.dataSourceContent = data;
    }).catch(x => this.dataSourceContent = []);
  }

  searchDataPromotion(item) {
    this.productInfo = item;
    this.getListPromotions(this.productInfo.Id);
  }

  getListPromotions(productId) {
    this.promotionService.getAllByProductId(productId).subscribe(data => {
      this.listPromotions = data;
      for (const promo of this.listPromotions) {
        for (const pro of promo.promotionReward) {
          pro.rewards = JSON.parse(pro.rewards);
        }
      }
    });
  }

  adsDiscountCode() {
    if (this.discountCode === '' || this.discountCode === undefined) {
      this.formError.discountCode = true;
      this.discountCodeE = 'Bạn hãy nhập mã khuyến mại';
    } else {
      this.loading = true;
      if (this.products.length > 0) {
        this.promotionCode = this.discountCode;
        const dataP: object = this.createDataPromotion(true);
        this.promotionService.checkOut(dataP).then(data => {
          this.promotions = data;
          this.promotionId = this.promotions[0].id;
          this.promotion = this.promotions[0];
          this.discountCodeE = '';
          this.showPromotion();
          this.loading = false;
          this.formError.discountCode = false;
        }).catch(ex => {
          this.promotionId = 0;
          this.promotion = {};
          this.formError.discountCode = true;
          this.discountCodeE = 'Mã khuyến mại đã hết hiệu lực';
          this.loading = false;
          this.showPromotion();
        });
      } else {
        this.formError.discountCode = true;
        this.discountCodeE = 'Bạn hãy chọn sản phẩm cần mua';
      }
    }
  }

  createDataPromotion(couponOnly = false): object {
    const dataPrm: any = {};
    if (this.products.length > 0 || this.dataCombo.length > 0) {
      if (this.promotionCode !== '' && this.promotionCode !== undefined) {
        dataPrm.coupon = this.promotionCode;
      } else {
        dataPrm.coupon = '';
      }
      if (this.customer !== null) {
        dataPrm.customerId = this.customer.customerId;
      } else {
        dataPrm.customerId = 0;
      }
      dataPrm.products = [];
      dataPrm.promotionType = 1;
      dataPrm.couponOnly = couponOnly;
      dataPrm.location = this.provinceCode;
      let amount = 0;
      for (const pr of this.products) {
        amount = amount + (pr.salePrice * pr.quantity);
        dataPrm.products.push({productId: pr.itemId, quantity: pr.quantity});
      }
      if (this.dataCombo.length > 0) {
        this.dataCombo.forEach(dcb => {
          for (const pr of dcb.promotionItems) {
            amount = amount + (pr.salePrice * pr.quantity);
            dataPrm.products.push({productId: pr.itemId, quantity: pr.quantity});
          }
        });
      }
      dataPrm.totalAmount = amount;
    }
    return dataPrm;
  }

  applyPromotion(orderCode, itemDiscount) {
    if (itemDiscount !== null) {
      let dataLog: any;
      for (const itemD of itemDiscount) {
        dataLog = {
          PromotionId: itemD.promotionId,
          Coupon: itemD.DiscountName,
          CustomerId: this.customer.customerId,
          Phone: this.customer.phone,
          Email: this.customer.email,
          OrderCode: orderCode,
          Amount: itemD.DiscountAmount,
        };
        this.promotionService.useCoupon(dataLog).catch(ex => {
          this.noti.error(ex);
        });
      }
    }
  }

  getOrderInfo(orderCode) {
    this.orderService.getByOrderCode(orderCode).then((data: any) => {
      this.orderInfo = data;
      this.orderInfo.orderStatus = this.listOrderStatus.find(x => x.id === this.orderInfo.orderStatus).name;
      if (this.orderInfo.lineDiscounts !== null && this.orderInfo.lineDiscounts !== undefined) {
        if (this.orderInfo.lineDiscounts.length > 0) {
          for (const dis of this.orderInfo.lineDiscounts) {
            if (dis.discountCode !== '0601' && dis.discountCode !== '0606') {
              this.totalDiscounts += dis.discountAmount;
            }
          }
        }
      }
    });
  }

  onChangeFee(event) {
    this.getShipingFee();
  }

  addPhone() {
    this.shipminetPhone = this.customerPhone;
    if (this.customerPhone.length >= 10) {
    }
  }

  changeQuantityCombo(index) {
    this.dataCombo[index].promotionItems = [];
    this.dataCombo[index].promotionItemsInit.forEach(element => {
      const a = {...element};
      a.quantity = parseInt(element.quantity, 10) * this.dataCombo[index].quantity;
      this.dataCombo[index].promotionItems.push(a);
      this.changeQuantity(a.quantity, index, true);
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }

  updatePromotion(product: any, promotion: any) {
    if (promotion === 0) {
      product.saleprice = product.originalPrice;
    } else {
      product.saleprice = product.originalPrice - promotion.rewardDiscount;
    }
  }

  validatePhoneNumber(phoneNumber) {
    const regex: RegExp = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    if (regex.test(phoneNumber) === false) {
      this.errorLog = 'Cập nhật lại số điện thoại khách hàng';
      return false;
    }
    else return true;
  }

  updatePhone() {
    this.errorLog = '';
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        ticket_id: this.oppIdInput,
        customer_phone: this.customerPhone,
        customer_name: this.customerFullname
      },
    });
    this.validatePhoneNumber(this.customerPhone);
  }
}
