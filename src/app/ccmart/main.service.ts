import { environment } from './../../environments/environment';
import { IUser } from './model/user';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { IProduct } from './model/product';
import 'rxjs/add/observable/of';

const API_URL = environment.mu_api;
@Injectable({
  providedIn: 'root'
})
export class MainService {
  users: Array<IUser>;
  products: Array<IProduct>;
  constructor(private httpClient: HttpClient) { }
  getProducts(): Observable<Array<IProduct>> {
    if (this.products) {
      return Observable.of(this.products);
    }
    const url = API_URL + 'getProducts';
    return this.httpClient
    .get<Array<IProduct>>(url)
    .pipe(
      tap(
        list => {
          this.products = list;
          return this.products;
        },
        () => catchError(this.handleError)
      )
    );
  }
  getUsers(): Observable<Array<IUser>> {
    if (this.users) {
      return Observable.of(this.users);
    }
    const url = API_URL + 'getUsers';
    return this.httpClient
    .get<Array<IUser>>(url)
    .pipe(
      tap(
        list => {
          this.users = list;
          return this.users;
        },
        () => catchError(this.handleError)
      )
    );
  }
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
