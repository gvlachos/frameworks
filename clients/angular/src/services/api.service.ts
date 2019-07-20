import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Card } from '../app/card/card';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
const apiUrl = '/deck';

export interface SearchTerm {
  type: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getCards(searchTerm: SearchTerm = null, page = 1, limit = 5): Observable<Card[]> {
    const pageParam = `_page=${page}`;
    const limitParam = `_limit=${limit}`;
    let queryParams = '';

    if (searchTerm && searchTerm.type) {
      queryParams += `type=${searchTerm.type}`;
    }

    if (searchTerm && searchTerm.name) {
      if (queryParams.length > 0) {
        queryParams += '&';
      }
      queryParams += `name_like=${searchTerm.name}`;
    }

    if (queryParams.length > 0) {
      queryParams += '&';
    }

    const url = `${apiUrl}?${queryParams}${pageParam}&${limitParam}`;
    // console.log(url);
    return this.http.get<Card[]>(url).pipe(
      // tap(cards => console.log(`fetched cards ${cards.length}`)),
      catchError(this.handleError('getCards', [])),
    );
  }
}
