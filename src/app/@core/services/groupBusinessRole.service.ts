import {ApiService} from './api.service';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import { GroupBusinessModel } from '../../model/groupBusiness.model';
import { GroupBusinessRoleModel } from '../../model/groupBusinessRole.model';

@Injectable({providedIn: 'root'})
export class GroupBusinessRoleService {
  private groupBusinessRoleUrl = '/api/customer_support/GroupBusRole';

  constructor(private api: ApiService) {
  }

  public getAllGroupBusniessRole(qParams) {
    const response = new Subject<GroupBusinessRoleModel[]>();
    this.api.get(this.groupBusinessRoleUrl + '/all'+ `${qParams}`).subscribe((res: any) => {
      if (res.statusCode === 200 && res.data !== null) {
        response.next(res.data);
      }
    });
    return response.asObservable();
  }

  public updateGroupBusinessRole(model: GroupBusinessRoleModel) {
    return new Promise((resolve, reject) => {
      this.api.put(this.groupBusinessRoleUrl + '/Update',null, model).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  public deleteGroupBusinessRole(model: GroupBusinessRoleModel) {
    return new Promise((resolve, reject) => {
      this.api.put(this.groupBusinessRoleUrl + '/Update',null, model).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

}
