import {ApiService} from './api.service';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class RequestCancelOrderService {
  private apiGetAllByEmp = '/api/customer_support/v2/RequestCancelOrder/GetAllByEmp';
  private apiCreate = '/api/customer_support/v2/RequestCancelOrder/Create';


  constructor(private api: ApiService) {
  }

  public getAllByEmp(data = {}) {
    return new Promise((resolve, reject) => {
      this.api.get(this.apiGetAllByEmp, data).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  public createRequest(model: any = {}) {
    return new Promise((resolve, reject) => {
      this.api.post(this.apiCreate, null, model).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }
}
