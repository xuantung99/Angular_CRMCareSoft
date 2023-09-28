import {ApiService} from './api.service';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {MenuModel} from '../../model/menu.model';

@Injectable({providedIn: 'root'})
export class MenuService {
  private menuUrl = '/api/customer_support/FCMenu';
  private updateRoleMenusdUrl = '/api/customer_support/menurole/UpdateRoleMenus';

  constructor(private api: ApiService) {
  }

  public getAllMenus() {
    const response = new Subject<MenuModel[]>();
    this.api.get(this.menuUrl + '/all').subscribe((res: any) => {
      if (res.statusCode === 200 && res.data !== null) {
        response.next(res.data);
      }
    });
    return response.asObservable();
  }

  public deleteMenu(id: number = 0) {
    const response = new Subject<boolean>();
    this.api.delete(this.menuUrl, {id: id}).subscribe((res: any) => {
      if (res.statusCode === 200) {
        response.next(true);
      } else {
        response.next(false);
      }
    });
    return response.asObservable();
  }

  public createMenu(model: MenuModel) {
    const response = new Subject<boolean>();
    this.api.post(this.menuUrl, null, model).subscribe((res: any) => {
      if (res.statusCode === 200 && res.data !== null) {
        response.next(res.data);
      }
    });
    return response.asObservable();
  }

  public updateMenu(id: number = 0, model: MenuModel) {
    const response = new Subject<boolean>();
    this.api.put(this.menuUrl, {id: id}, model).subscribe((res: any) => {
      if (res.statusCode === 200 && res.data !== null) {
        response.next(res.data);
      }
    });
    return response.asObservable();
  }

  public getAllMenuByRole(roleId: number = 0) {
    const response = new Subject<MenuModel[]>();
    this.api.get(this.menuUrl + '/byRole', {roleId: roleId}).subscribe((res: any) => {
      if (res.statusCode === 200 && res.data !== null) {
        response.next(res.data);
      }
    });
    return response.asObservable();
  }

  updateRoleMenus(id: number = 0, menus: any) {
    return new Promise((resolve, reject) => {
      this.api.put(this.updateRoleMenusdUrl, null, {roleId: id, menuIds: menus}).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });

  }

}
