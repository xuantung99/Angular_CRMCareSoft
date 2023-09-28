import {ApiService} from './api.service';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {GroupSaleModel} from '../../model/groupSale.model';

@Injectable({providedIn: 'root'})
export class GroupSaleService {
  private groupSaleUrl = '/api/customer_support/FCGroupSale';

  constructor(private api: ApiService) {
  }

  public getAllGroupSales() {
    const response = new Subject<GroupSaleModel[]>();
    this.api.get(this.groupSaleUrl + '/all?page=1&take=1000').subscribe((res: any) => {
      if (res.statusCode === 200 && res.data !== null) {
        response.next(res.data);
      }
    });
    return response.asObservable();
  }

  public createGroupSale(model: GroupSaleModel) {
    return new Promise((resolve, reject) => {
      this.api.post(this.groupSaleUrl + '/CreateGroupSale', null, model).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });

  }

  public updateGroupSale(id: number, model: GroupSaleModel) {
    return new Promise((resolve, reject) => {
      this.api.put(this.groupSaleUrl + '/UpdateGroupSale', {id: id}, model).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  public deleteGroupSale(id: number = 0) {
    return new Promise((resolve, reject) => {
      this.api.delete(this.groupSaleUrl, {id: id}).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });

  }

}
