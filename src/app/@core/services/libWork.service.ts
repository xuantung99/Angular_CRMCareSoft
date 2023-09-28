import {ApiService} from './api.service';
import {Injectable} from '@angular/core';
import {LibWorkModel} from '../../model/libWork.model';
import {Observable, of, Subject} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class LibWorkService {
  private libWorkUrl = '/api/customer_support/LibWork';

  constructor(private api: ApiService) {
  }

  public seachWork(term: string): Observable<any[]> {
    if (term !== null) {
      return this.api.get(this.libWorkUrl + '/all', {name: term}).pipe(
        catchError(() => of(({data: []}))),
        map(rsp => rsp.data),
      );
    } else {
      return of([]);
    }
  }

  public getAll(page: number = 1, take: number = 1000, name: string = '') {
    const response = new Subject<LibWorkModel[]>();
    const oppWork = localStorage.getItem('data_opp_work');
    if (oppWork === null) {
      this.api.get(this.libWorkUrl + '/all', {page: page, take: take}).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          localStorage.setItem('data_opp_work', JSON.stringify(res.data));
          response.next(res.data);
        }
      });
    } else {
      response.next(JSON.parse(oppWork));
    }

    return response.asObservable();
  }

  public deleteLibWork(id: number = 0) {
    return new Promise((resolve, reject) => {
      this.api.delete(this.libWorkUrl, {id: id}).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });

  }

  public updateLibWork(id: number, model: LibWorkModel) {
    return new Promise((resolve, reject) => {
      this.api.put(this.libWorkUrl, {id: id}, model).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });

  }

  public createLibWork(model: LibWorkModel) {
    return new Promise((resolve, reject) => {
      this.api.post(this.libWorkUrl, null, model).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });

  }
}
