import {ApiService} from './api.service';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class PromotionService {
  private useCouponUrl = '/api/Promotion/FcCoupon/UseCoupon';
  private checkOutUrl = '/api/Promotion/Promotion/byCheckout';
  private getByMultipleProductsUrl = '/api/Promotion/Promotion/byMultipleProducts';
  private getByMultipleProductsUrlV2 = '/api/Promotion/Promotion/getProductPromotions';
  private getAllByProductIdUrl = '/api/Promotion/Promotion/all';
  private getByIdUrl = '/api/Promotion/Promotion/byId';
  private getByProductIdUrl = '/api/Promotion/Promotion/promoByProduct';
  private CheckApplyWithComboUrl = '/api/Promotion/Promotion/CheckApplyWithCombo';
  private CheckPromotionComboUrl = '/api/Promotion/Promotion/CheckComboPromotionByComboId';

  constructor(private api: ApiService) {
  }

  public useCoupon(model: any = {}) {
    return new Promise((resolve, reject) => {
      this.api.post(this.useCouponUrl, null, model).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data[0]);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  public getByProductId(id: number = 0) {
    return new Promise((resolve, reject) => {
      this.api.get(this.getByProductIdUrl, {productId: id}).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }
  public getById(id: number = 0) {
    return new Promise((resolve, reject) => {
      this.api.get(this.getByIdUrl, {id: id}).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  public checkOut(model: any = {}) {
    return new Promise((resolve, reject) => {
      this.api.post(this.checkOutUrl, null, model).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  public getByMultipleProducts(ids: number[] = []) {
    const response = new Subject<any[]>();
    this.api.post(this.getByMultipleProductsUrl, null, ids)
      .subscribe(
        (res: any) => {
          if (res.statusCode === 200 && res.data !== null) {
            response.next(res.data);
          }
        });
    return response.asObservable();
  }
  public getByMultipleProductsV2(promotionModel = []) {
    const response = new Subject<any[]>();
    this.api.post(this.getByMultipleProductsUrlV2, null, promotionModel)
      .subscribe(
        (res: any) => {
          if (res.statusCode === 200 && res.data !== null) {
            response.next(res.data);
          }
        });
    return response.asObservable();
  }

  public getAllByProductId(id: number = 0) {
    const response = new Subject<any[]>();
    this.api.get(this.getAllByProductIdUrl, {products: id})
      .subscribe(
        (res: any) => {
          if (res.statusCode === 200 && res.data !== null) {
            response.next(res.data);
          }
        });
    return response.asObservable();
  }

  public CheckApplyWithCombo() {
    return new Promise((resolve, reject) => {
      this.api.get(this.CheckApplyWithComboUrl).subscribe((res: any) => {
        if (res.statusCode === 200) {
          resolve(res.data.applyWithCombo);
        } else {
          reject(false);
        }
      });
    });
  }
  public CheckPromotionCombo(id:number) {
    return new Promise((resolve, reject) => {
      this.api.get(this.CheckPromotionComboUrl, {id: id}).subscribe((res: any) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(false);
        }
      });
    });
  }
}
