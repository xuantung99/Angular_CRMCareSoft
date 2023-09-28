import {ApiService} from './api.service';
import {Injectable} from '@angular/core';
import {ProcessStatusModel} from '../../model/processStatus.model';
import {APIResponse} from '../../model/response.model';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class ProcessStatusService {
  private processStatusUrl = '/api/customer_support/v2/OpportunityProcessStatus';

  constructor(private api: ApiService, private http: HttpClient) {
  }

  public getAll(pageSize: number = 100, page: number = 1, take: number = 1000) {

    return new Promise((resolve, reject) => {
      this.api.get(this.processStatusUrl + '/all', {
        PageSize: pageSize,
        Page: page,
        Take: take,
      }).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  public getById(id: number = 0) {
    return new Promise((resolve, reject) => {
      this.api.get(this.processStatusUrl + '/' + id).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  public getByCode(code: number = 0) {
    return new Promise((resolve, reject) => {
      this.api.get(this.processStatusUrl + '/bycode', {code: code}).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }



  public createProcessStatus(model: ProcessStatusModel = new ProcessStatusModel()) {
    return new Promise((resolve, reject) => {
      this.http.post(this.processStatusUrl, model, {}).subscribe((items: APIResponse) => {
        if (items.statusCode === 200 && items.data !== null) {
          resolve(items.data);
        } else {
          reject(items.statusCode);
        }
      }, error => {
        reject(error.errorMessage);
      });
    });
  }

  public updateProcessStatus(id: number = 0, model: ProcessStatusModel = new ProcessStatusModel()) {
    return new Promise((resolve, reject) => {
      this.api.put(this.processStatusUrl + '/' + id, null, model).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }
}
