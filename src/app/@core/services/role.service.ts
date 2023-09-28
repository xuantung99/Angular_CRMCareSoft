import {ApiService} from './api.service';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {RoleModel} from '../../model/roleModel.model';

@Injectable({providedIn: 'root'})
export class RoleService {
  private getAllRolesUrl = '/api/customer_support/Role/all?page=1&take=1000';
  private rolesUrl = '/api/customer_support/Role';

  constructor(private api: ApiService) {
  }

  getAllRoles() {
    const response = new Subject<RoleModel[]>();
    this.api.get(this.getAllRolesUrl).subscribe(
      (res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          response.next(res.data);
        }
      },
    );
    return response.asObservable();
  }

  public deleteRole(id: number) {
    return new Promise((resolve, reject) => {
      this.api.delete(this.rolesUrl, {id: id}).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  public createRole(model: RoleModel) {
    return new Promise((resolve, reject) => {
      this.api.post(this.rolesUrl, null, model).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });

  }

  public updateRole(id: number, model: RoleModel) {
    return new Promise((resolve, reject) => {
      this.api.put(this.rolesUrl, {id: id}, model).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });

  }
}

