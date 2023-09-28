import {ApiService} from './api.service';
import {Injectable} from '@angular/core';
import {OpportunityStatusModel} from '../../model/opportunityStatus.model';

@Injectable({providedIn: 'root'})
export class OpportunityStatusService {
  private getAllUrl = '/api/customer_support/OpportunityStatus/all';
  private oppStatusUrl = '/api/customer_support/OpportunityStatus';

  constructor(private api: ApiService) {
  }

  public getAll(take: number = 1000) {
    return new Promise((resolve, reject) => {
      const oppStatus = localStorage.getItem('data_opp_status');
      if (oppStatus === null) {
        this.api.get(this.getAllUrl, {take: take}).subscribe((res: any) => {
          if (res.statusCode === 200 && res.data !== null) {
            localStorage.setItem('data_opp_status', JSON.stringify(res.data));
            resolve(res.data);
          } else {
            reject(res.message);
          }
        });
      } else {
        resolve(JSON.parse(oppStatus));
      }
    });
  }

  public deleteOppStatus(id: number = 0) {
    return new Promise((resolve, reject) => {
      this.api.delete(this.oppStatusUrl, {id: id}).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });

  }

  public updateOppStatus(id: number, model: OpportunityStatusModel) {
    return new Promise((resolve, reject) => {
      this.api.put(this.oppStatusUrl, {id: id}, model).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });

  }

  public createOppStatus(model: OpportunityStatusModel) {
    return new Promise((resolve, reject) => {
      this.api.post(this.oppStatusUrl, null, model).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }
}
