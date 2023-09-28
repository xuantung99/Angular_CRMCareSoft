import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ApiService} from './api.service';

@Injectable({providedIn: 'root'})
export class QuestionTagService {
  private questionTagUrl = '/api/customer_support/QuestionTags';

  constructor(private api: ApiService) {
  }

  public seachTag(term: string): Observable<any[]> {
    if (term !== null) {
      return this.api.get(this.questionTagUrl + '/all', {filter: term}).pipe(
        catchError(() => of(({data: []}))),
        map(rsp => rsp.data),
      );
    } else {
      return of([]);
    }
  }
}
