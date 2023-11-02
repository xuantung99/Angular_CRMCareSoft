import {ApiService} from './api.service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OpportunityLogModel} from '../../model/opportunityLog.model';

@Injectable({providedIn: 'root'})
export class OpportunityLogService {
  private opportunityLogUrl = '/api/customer_support/FCOpportunityLog';
  private apiGetLogByOppId = '/api/customer_support/FCOpportunityLog/byOppId';

  constructor(private api: ApiService, private http: HttpClient) {
  }

  public createLog(model: OpportunityLogModel = new OpportunityLogModel()) {
    return new Promise((resolve, reject) => {
      this.api.post(this.opportunityLogUrl, null, model).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  getLogByOppId(oppId) {
    return new Promise((resolve, reject) => {
      this.api.get(this.apiGetLogByOppId, { id: oppId }).subscribe((res: any) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }
}
