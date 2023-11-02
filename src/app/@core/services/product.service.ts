import {ApiService} from './api.service';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {ProductDetailModel} from '../../model/productDetail.model';
import {ServerDataSource} from 'ng2-smart-table';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class ProductService {
  private getAllProductDetailsUrl = '/api/product/FcProduct/GetAllProductDetails';
  private getProductDetailByIdUrl = '/api/product/fcproduct/GetProductDetail';
  private getAllUrl = '/api/customer_support/FCProduct/All';
  private getProductCourseUrl = 'api/customer_support/v2/FCProductCourse/GetDefault';
  private apiUpdatePriority = '/api/customer_support/FCProduct/UpdatePriority';
  private apiGetAllProductCourse = '/api/customer_support/v2/ProductCourse/GetAllProductCourse';
  private apiProductCourse = '/api/customer_support/v2/ProductCourse';
  private apiProduct = '/api/customer_support/FCProduct';
  private apiSyncProduct = '/api/customer_support/FCProduct/SyncProduct';
  private getListProductByMarketingUrl = '/api/customer_support/v2/Opportunity/GetListProductByMarketing';

  constructor(private api: ApiService, private http: HttpClient) {
  }

  public getAllProductDetails() {
    return new Promise((resolve, reject) => {
      const products = localStorage.getItem('data_products');
      if (products === null) {
        this.api.get(this.getAllProductDetailsUrl).subscribe((res: any) => {
          if (res.statusCode === 200 && res.data !== null) {
            localStorage.setItem('data_products', JSON.stringify(res.data));
            resolve(res.data);
          } else {
            reject([]);
          }
        });
      } else {
        resolve(JSON.parse(products));
      }
    });
  }
  public getListProductByMarketing() {
    return new Promise((resolve, reject) => {
      this.api.get(this.getListProductByMarketingUrl).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject([]);
        }
      });
    });
  }

  public syncProduct() {
    return new Promise((resolve, reject) => {
      this.api.get(this.apiSyncProduct).subscribe((res: any) => {
        resolve([]);
      });
    });
  }

  public getAllProductInCustomers() {
    return new Promise((resolve, reject) => {
      this.api.get(this.apiProduct, {type: 2, page: 1, take: 1000}).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject([]);
        }
      });
    });
  }

  public getProductDetailById(productId) {
    const response = new Subject<ProductDetailModel>();
    this.api.get(this.getProductDetailByIdUrl, {productid: productId}).subscribe((res: any) => {
      if (res.statusCode === 200 && res.data !== null) {
        response.next(res.data);
      }
    });
    return response.asObservable();
  }

  public getProductCourse(productIds: number[]) {
    return new Promise((resolve, reject) => {
      this.api.get(this.getProductCourseUrl , {
        productIds: productIds,
      }).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  public getAllProducts(type = 1): any {
    return new ServerDataSource(this.http, {
      endPoint: this.getAllUrl + '?type=' + type,
      dataKey: 'data',
      pagerLimitKey: 'take',
      pagerPageKey: 'page',
      totalKey: 'total',
    });
  }

  public updateProduct(id: number = 0, data: any) {
    return new Promise((resolve, reject) => {
      if (id === 0) {
        this.api.post(this.apiProduct, null, data).subscribe((res: any) => {
          if (res.statusCode === 200 && res.data !== null) {
            resolve(res.data);
          } else {
            reject(res.statusCode);
          }
        });
      } else {
        this.api.put(this.apiProduct, {id: id}, data).subscribe((res: any) => {
          if (res.statusCode === 200 && res.data !== null) {
            resolve(res.data);
          } else {
            reject(res.statusCode);
          }
        });
      }
    });
  }

  public updatePriority(id: number = 0, data: any) {
    return new Promise((resolve, reject) => {
      this.api.put(this.apiUpdatePriority, {id: id}, data).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  public insertProductCourse(data: any) {
    return new Promise((resolve, reject) => {
      this.api.post(this.apiProductCourse, null, data).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  public getAllProductCourse(productId: number = 0) {
    return new Promise((resolve, reject) => {
      this.api.get(this.apiGetAllProductCourse, {productId: productId}).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }
}
