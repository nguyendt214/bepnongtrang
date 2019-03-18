import { environment } from './../../environments/environment';
import { IUser } from './model/user';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';

const API_URL = environment.mu_api;
@Injectable({
  providedIn: 'root'
})
export class MainService {
  users: Array<IUser>;

  constructor(private httpClient: HttpClient) { }
  getInfo(): Observable<Array<any>> {
    const url = API_URL + 'getInfo';
    return this.httpClient
      .get<Array<any>>(url)
      .pipe(
        tap(
          list => {
            return list;
          }
        )
      );
  }

  getThucDonHomNay(): Observable<Array<any>> {
    const url = API_URL + 'getThucDonHomNay';
    return this.httpClient
      .get<Array<any>>(url);
  }

  taoThucDon(thucDon: any) {
    const url = API_URL + 'taoThucDon';
    const request = this.httpClient.post(url, thucDon);
    return request.pipe(
      tap(
        () => { },
        () => catchError(this.handleError)
      )
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
