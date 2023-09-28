import {ApiService} from './api.service';
import {Injectable} from '@angular/core';
import {CategoryModel} from '../../model/category.model';
import {formatDate} from '@angular/common';

@Injectable({providedIn: 'root'})
export class QuestionService {
  private apiAllCategories = '/api/customer_support/Question/categories/all';
  private apiSyncFromCmsUrl = '/api/customer_support/Question/sync-from-cms';
  private apiTotalCategories = '/api/customer_support/Question/categories/count';
  private apiTotalTags = '/api/customer_support/QuestionTags/count';
  public apiGetAll = '/api/customer_support/Question/all';
  public apiDelete = '/api/customer_support/Question';
  private apiGetById = '/api/customer_support/Question/byId';
  private apiAnswer = '/api/customer_support/FCAnswer';
  private apiGetAnswerNoti = '/api/customer_support/FCAnswer/noti';

  constructor(private api: ApiService) {
  }

  public syncFromCms(type: string) {
    return new Promise((resolve, reject) => {
      this.api.get(this.apiSyncFromCmsUrl + '/?type=' + type).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  public getTotalCategories(startDate: Date = null, endDate: Date = null, register: boolean = true, skip: number = 0, take: number = 15) {
    return new Promise((resolve, reject) => {
      const querySearch: any = {skip: skip, take: take, register: register};
      if (startDate !== null && startDate !== undefined) {
        querySearch.startDate = formatDate(startDate, 'yyyy-MM-dd', 'en-US');
      }

      if (endDate !== null  && endDate !== undefined) {
        querySearch.endDate = formatDate(endDate, 'yyyy-MM-dd', 'en-US');
      }

      this.api.get(this.apiTotalCategories, querySearch).subscribe((res: any) => {
          if (res.statusCode === 200) {
            resolve(res.data);
          } else {
            resolve([]);
          }
        },
      );
    });
  }

  public getAllCategories() {
    return new Promise((resolve, reject) => {
      this.api.get(this.apiAllCategories).subscribe((res: any) => {
          if (res.statusCode === 200) {
            resolve(res.data);
          } else {
            resolve([]);
          }
        },
      );
    });
  }

  public getTotalTags(startDate: Date = null, endDate: Date = null, register: boolean = true, skip: number = 0, take: number = 15) {
    return new Promise((resolve, reject) => {
      const querySearch: any = {skip: skip, take: take, register: register};
      if (startDate !== null && startDate !== undefined) {
        querySearch.startDate = formatDate(startDate, 'yyyy-MM-dd', 'en-US');
      }

      if (endDate !== null  && endDate !== undefined) {
        querySearch.endDate = formatDate(endDate, 'yyyy-MM-dd', 'en-US');
      }

      this.api.get(this.apiTotalTags, querySearch).subscribe((res: any) => {
          if (res.statusCode === 200) {
            resolve(res.data);
          } else {
            resolve([]);
          }
        },
      );
    });
  }

  public deleteById(questionId: number) {
    return new Promise((resolve, reject) => {
      this.api.delete(this.apiDelete, {id: questionId}).subscribe((res: any) => {
        if (res.statusCode === 200) {
          resolve(true);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  public getById(questionId: number) {
    return new Promise((resolve, reject) => {
      this.api.get(this.apiGetById, {id: questionId}).subscribe((res: any) => {
          if (res.statusCode === 200) {
            resolve(res.data);
          } else {
            resolve([]);
          }
        },
      );
    });
  }

  public updateAnswer(answerId: number, data) {
    return new Promise((resolve, reject) => {
      this.api.put(this.apiAnswer, {id: answerId}, data).subscribe((res) => {
        if (res.statusCode === 200) {
          resolve(true);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  public insertAnswer(data) {
    return new Promise((resolve, reject) => {
      this.api.post(this.apiAnswer, null, data).subscribe((res) => {
        if (res.statusCode === 200) {
          resolve(true);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  public getAnswerNoti(answerId: number) {
    return new Promise((resolve, reject) => {
      this.api.get(this.apiGetAnswerNoti, {id: answerId}).subscribe((res: any) => {
          if (res.statusCode === 200) {
            resolve(res.data);
          } else {
            resolve([]);
          }
        },
      );
    });
  }
}
