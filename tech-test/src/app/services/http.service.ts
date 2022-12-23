import { Injectable  } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';

export class HttpService {

  constructor(protected readonly http: HttpClient ) { }

  protected GET<T, B = void>(url: string, params = {}): Observable<T | B> {
    return this.http.get<T | B>(`${ environment.apiUrl }/${url}`, { params });
  }

  protected POST<T, B = void>(url: string, body: T = {} as T, params = {}): Observable<T | B> {
    return this.http.post<T | B>(`${ environment.apiUrl }/${url}`, body, { params });
  }

  protected PUT<T, B = void>(url: string, body: Partial<T>, params = {} ): Observable<T | B> {
    return this.http.put<T | B>(`${ environment.apiUrl }/${url}`, body, { params });
  }

  protected PATCH<T, B = T>(url: string, body: Partial<T>, params = {} ): Observable<T | B> {
    return this.http.patch<T | B>(`${ environment.apiUrl }/${url}`, body, { params });
  }

  protected DELETE<T, B = void>(url: string, params = {}): Observable<T | B | void> {
    return this.http.delete<T | void>(`${ environment.apiUrl }/${url}`, { params });
  }
}
