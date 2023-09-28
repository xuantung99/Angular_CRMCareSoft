import {ApiService} from './api.service';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class LeadService {
  private leadUrl = '/api/customer_support/';

  constructor(private api: ApiService) {
  }

  public getAll() {
    return new Promise((resolve, reject) => {
      this.api.get(this.leadUrl + '/all').subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }
}
