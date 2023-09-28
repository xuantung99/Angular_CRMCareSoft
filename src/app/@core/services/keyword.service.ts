import {ApiService} from './api.service';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class KeywordService {
  private keywordUrl = '/api/customer_support/FCKeyword';

  constructor(private api: ApiService) {
  }

  public seachKeyword(term: string, keywords: any = []): Observable<any[]> {
    if (term !== null) {
      return this.api.get(this.keywordUrl + '/SimpleSearch', {
        keyword_like: term,
        skip: keywords.map(x => x.id).join(','),
      }).pipe(
        catchError(() => of(({data: []}))),
        map(rsp => rsp.data),
      );
    } else {
      return of([]);
    }
  }
}
