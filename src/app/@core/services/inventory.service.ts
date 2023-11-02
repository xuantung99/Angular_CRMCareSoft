import {ApiService} from './api.service';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class InventoryService {
  private getAllUrl = '/api/inventory/FCadmininventory/getAllInventory';

  constructor(private api: ApiService) {
  }

  public getAll() {
    return new Promise((resolve, reject) => {
      this.api.get(this.getAllUrl).subscribe((res: any) => {
        if (res !== null) {
          resolve(res);
        } else {
          reject([]);
        }
      });
    });
  }
}
