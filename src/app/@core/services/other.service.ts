import {ApiService} from './api.service';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class OtherService {
  private shipFeeUrl = '/api/shipment/AdminShip/CalculateShipFee';
  private shipmentFeeUrl = '/api/shipment/FcShipment/CalculatorShipmentFee';
  private getAllShipmentVendorUrl = '/api/shipment/AdminShipmentVendor/GetShipmentVendors';
  private getKeyProdUrl = '/api/customer_support/FCKeyProdContent/byApproved';
  private getListPaymentTransUrl = '/api/finance/v2/AdminBankTransferTransaction/ListAllBankTransferTransaction';
  private mapPaymentTransUrl = '/api/finance/v2/AdminBankTransferTransaction/UpdateReferenceCodeForBankTransfer';

  constructor(private api: ApiService) {
  }

  public getKeyProd(model: any = {}) {
    return new Promise((resolve, reject) => {
      this.api.post(this.getKeyProdUrl, null, model)
        .subscribe(
          (res: any) => {
            if (res.statusCode === 200 && res.data !== null) {
              resolve(res.data);
            } else {
              reject(res.message);
            }
          });
    });
  }

  public getAllShipmentVendor() {
    return new Promise((resolve, reject) => {
      this.api.get(this.getAllShipmentVendorUrl)
        .subscribe(
          (res: any) => {
            if (res !== null) {
              resolve(res);
            } else {
              reject(res.statusCode);
            }
          });
    });
  }

  public mapPaymentTrans(model: any = {}) {
    return new Promise((resolve, reject) => {
      this.api.post(this.mapPaymentTransUrl, null, model).subscribe((res: any) => {
        if (res !== null) {
          resolve(res);
        } else {
          reject(res);
        }
      });
    });
  }

  public getListPaymentTrans(requestParam) {
    return new Promise((resolve, reject) => {
      this.api.get(this.getListPaymentTransUrl, requestParam)
        .subscribe(
          (res: any) => {
            if (res.data !== null) {
              resolve(res);
            } else {
              reject(res.statusCode);
            }
          });
    });
  }

  public calcShipingFee(model: any = {}) {
    return new Promise((resolve, reject) => {
      this.api.post(this.shipFeeUrl, null, model)
        .subscribe(
          (res: any) => {
            if (res.responseCode === '00' && res.data !== null) {
              resolve(res.data);
            } else {
              reject(res.message);
            }
          });
    });
  }

  public calcShipmentFee(model: any = {}) {
    return new Promise((resolve, reject) => {
      this.api.post(this.shipmentFeeUrl, null, model)
        .subscribe(
          (res: any) => {
            if (res.statusCode === 200 && res.data !== null) {
              resolve(res.data[0]);
            } else {
              reject(res.message);
            }
          });
    });
  }
}
