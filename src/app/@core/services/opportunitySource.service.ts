import {ApiService} from './api.service';
import {Injectable} from '@angular/core';
import {OpportunitySourceModel} from '../../model/opportunitySource.model';

@Injectable({providedIn: 'root'})
export class OpportunitySourceService {
  public getAllUrl = '/api/customer_support/OpportunitySource/all';
  private oppSourceUrl = '/api/customer_support/OpportunitySource';

  constructor(private api: ApiService) {
  }

  public getAll(take: number = 1000) {
    return new Promise((resolve, reject) => {
      this.api.get(this.getAllUrl, {take: take}).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.message);
        }
      });
    });
  }

  public deleteOppSource(id: number = 0) {
    return new Promise((resolve, reject) => {
      this.api.delete(this.oppSourceUrl, {id: id}).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  public updateOppSource(id: number = 0, model: OpportunitySourceModel) {
    return new Promise((resolve, reject) => {
      this.api.put(this.oppSourceUrl, {id: id}, model).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  public createOppSource(model: OpportunitySourceModel) {
    return new Promise((resolve, reject) => {
      this.api.post(this.oppSourceUrl, null, model).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }
}
