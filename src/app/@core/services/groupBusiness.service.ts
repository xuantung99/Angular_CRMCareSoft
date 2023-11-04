import {ApiService} from './api.service';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import { GroupBusinessModel } from '../../model/groupBusiness.model';

@Injectable({providedIn: 'root'})
export class GroupBusinessService {
  private groupBusinessUrl = '/api/customer_support/GroupBusiness';

  constructor(private api: ApiService) {}

  public getAllGroupBusniess(qParams: string = '?groupId=-1') {
    const response = new Subject<GroupBusinessModel[]>();
    this.api.get(this.groupBusinessUrl + '/all'+ `${qParams}`).subscribe((res: any) => {
      if (res.statusCode === 200 && res.data !== null) {
        response.next(res.data);
      }});
    return response.asObservable();
  }

  public createGroupBusiness(model: GroupBusinessModel) {
    return new Promise((resolve, reject) => {
      this.api.post(this.groupBusinessUrl + '/CreateGroupBusiness', null, model).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }
  public updateGrouBusiness(id: number, model: GroupBusinessModel) {
    return new Promise((resolve, reject) => {
      this.api.put(this.groupBusinessUrl + '/UpdateGroupBusiness', {groupId: id}, model).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  public deleteGroupBusiness(id: number = 0) {
    return new Promise((resolve, reject) => {
      this.api.delete(this.groupBusinessUrl, {groupId: id}).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });

  }

}
