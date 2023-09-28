import {ApiService} from './api.service';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class OrderService {
  private getOrderInfosByCustomerUrl = '/api/order/FCOrder/GetOrderInfosByCustomer';
  private getOrderItemsByCustomerUrl = '/api/order/FCOrder/GetOrderItemsByCustomer';
  private createOrderUrl = '/api/customer_support/order';
  private apiByOrderCode = '/api/customer_support/Order/byOrderCode';
  private apiPassOrder = '/api/customer_support/v2/Order/PassOrder';
  private apiCancelSalesOrder = '/api/customer_support/v2/Order/CancelSaleOrder';
  private apiUploadImgOrder = '/api/customer_support/v2/Order/UploadImgOrder';
  private getInformationShipmentOrderUrl = '/api/shipment/AdminHookLogs/GetAllHookLogsByOrderCode';
  private apiGetOrdersByEmployeeIntoDate = '/api/order/AdminOrderReport/GetOrdersByEmployeeIntoDate';
  private apiGetTotalRevenues = '/api/order/AdminOrderReport/GetTotalRevenues';
  private apiSearchOrders = '/api/order/AdminOrder/SearchOrders';
  private apiGetAllTotalRevenueByDay = '/api/order/AdminSaleManage/GetAllTotalRevenueByDay';
  private apiGetOrdersHasCombo = '/api/order/AdminSaleManage/GetOrdersHasCombo';
  private apipassOrderQuotation = '/api/customer_support/v2/Order/PassOrderQuotation';
  private apiGetAllTotalSalesOrderByDay = '/api/order/AdminSaleManage/GetAllTotalSalesOrderByDay';

  constructor(private api: ApiService) {
  }

  public getOrderInfosByCustomer(customerId: number = 0) {
    const response = new Subject<any[]>();
    this.api.get(this.getOrderInfosByCustomerUrl, {customerId: customerId}).subscribe((res: any) => {
      if (res.statusCode === 200 && res.data !== null) {
        response.next(res.data);
      }
    });
    return response.asObservable();
  }

  public getOrderItemsByCustomer(customerId: number = 0, start: number, take: number) {
    const response = new Subject<any[]>();
    this.api.get(this.getOrderItemsByCustomerUrl, {customerId: customerId, start: start, take: take})
      .subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          response.next(res.data);
        }
      });
    return response.asObservable();
  }

  public createOrder(model: any = {}) {
    return new Promise((resolve, reject) => {
      this.api.post(this.createOrderUrl, null, model).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  public getByOrderCode(orderCode) {
    return new Promise((resolve, reject) => {
      this.api.get(this.apiByOrderCode, {orderCode: orderCode}).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });

  }

  public getInformationShipmentOrder(orderCode) {
    return new Promise((resolve, reject) => {
      this.api.get(this.getInformationShipmentOrderUrl, {orderCode: orderCode}).subscribe((data) => {
        if (data !== null) {
          resolve(data);
        }
      });
    });
  }
  public passOrder(model: any = {}) {
    return new Promise((resolve, reject) => {
      this.api.post(this.apiPassOrder, null, model).subscribe((res: any) => {
        if (res === true) {
          resolve(res);
        } else {
          reject(res);
        }
      });
    });
  }
  public cancelSalesOrder(model: any = {}) {
    return new Promise((resolve, reject) => {
      this.api.post(this.apiCancelSalesOrder, null, model).subscribe((res: any) => {
        if (res === true) {
          resolve(res);
        } else {
          reject(res);
        }
      });
    });
  }
  public UploadImgOrder(model: any = {}) {
    return new Promise((resolve, reject) => {
      this.api.post(this.apiUploadImgOrder, null, model).subscribe((res: any) => {
        if (res === true) {
          resolve(res);
        } else {
          reject(res);
        }
      });
    });
  }

  public getOrdersByEmployeeIntoDate(requestData) {
    return new Promise((resolve, reject) => {
      this.api.get(this.apiGetOrdersByEmployeeIntoDate, requestData).subscribe((data) => {
        if (data !== null) {
          resolve(data);
        }
      });
    });
  }



  public getTotalRevenues(requestData) {
    return new Promise((resolve, reject) => {
      this.api.get(this.apiGetTotalRevenues, requestData).subscribe((data) => {
        if (data !== null) {
          resolve(data);
        }
      });
    });
  }

  public searchOrders(requestData) {
    return new Promise((resolve, reject) => {
      this.api.get(this.apiSearchOrders, requestData).subscribe((res) => {
        if (res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  public getAllTotalRevenueByDay(requestData) {
    return new Promise((resolve, reject) => {
      this.api.get(this.apiGetAllTotalRevenueByDay, requestData).subscribe((res) => {
        if (res.data !== null) {
          resolve(res);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  public getAllTotalSalesOrderByDay(requestData) {
    return new Promise((resolve, reject) => {
      this.api.get(this.apiGetAllTotalSalesOrderByDay, requestData).subscribe((res) => {
        if (res.data !== null) {
          resolve(res);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  public getOrdersHasCombo(requestData) {
    return new Promise((resolve, reject) => {
      this.api.get(this.apiGetOrdersHasCombo, requestData).subscribe((res) => {
        if (res.data !== null) {
          resolve(res);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }
  public passOrderQuotation(model: any = {}) {
    return new Promise((resolve, reject) => {
      this.api.post(this.apipassOrderQuotation, null, model).subscribe((res: any) => {
        if (res === true) {
          resolve(res);
        } else {
          reject(res);
        }
      });
    });
  }
}
