import {ApiService} from './api.service';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {CustomerModel} from '../../model/customer.model';

@Injectable({providedIn: 'root'})
export class CustomerService {
  private getByKeyUrl = '/api/customer/FCCustomer/SearchCustomer';
  private apiCreate = '/api/customer/AdminCustomer/CreateCustomer';
  private apiSearch = '/api/customer/FCCustomer/SearchCustomer';
  private apiCreateShippingAddress = '/api/customer/AdminCustomer/CreateShippingAddressByCustomer';
  private apiCheckPointByPhone = 'api/customer/FCPoints/GetInforPointsByCustomer';


  constructor(private api: ApiService) {
  }

  public getCustomerBySearchKey(searchKey: string = '') {
    return new Promise((resolve, reject) => {
      this.api.get(this.getByKeyUrl, {searchKey: searchKey}).subscribe((res: any) => {
        if (res.responseCode === '00' && res.data !== null && res.data.length > 0) {
          resolve(res.data[0]);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  public createCustomer(model: CustomerModel) {
    return new Promise((resolve, reject) => {
      this.api.post(this.apiCreate, null, model).subscribe((res: any) => {
        if ((res.responseCode === '00' || res.responseCode === '02') && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  public createShippingAddress(model: any = {}) {
    return new Promise((resolve, reject) => {
      this.api.post(this.apiCreateShippingAddress, null, model).subscribe((res: any) => {
        if (res.responseCode === '00' && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  public searchUsers(term: string): Observable<any[]> {
    if (term !== null) {
      return this.api.get(this.apiSearch, {searchKey: term.slice(-9)}).pipe(
        catchError(() => of(({data: []}))),
        map(rsp => rsp.data),
      );
    } else {
      return of([]);
    }
  }

  public checkPointByPhone(phone: string = '', customerId: number = 0) {
    return new Promise((resolve, reject) => {
      const dataR: any = {};
      if (phone !== null && phone !== '') {
        dataR.customerPhone = phone;
      }

      if (customerId !== null && customerId > 0) {
        dataR.customerId = customerId;
      }

      this.api.get(this.apiCheckPointByPhone, dataR).subscribe((res: any) => {
        if (res.responseCode === '00' && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }
}
