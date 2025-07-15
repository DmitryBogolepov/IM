import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CartType} from "../../../types/cart.type";
import {DefaultResponseType} from "../../../types/default-response.type";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // private count: number = 0;
  // count$: Subject<number> = new Subject<number>();
  //
  // constructor(private http: HttpClient) {
  // }
  //
  //
  // getCart(): Observable<CartType | DefaultResponseType> {
  //   return this.http.get<CartType | DefaultResponseType>(environment.api + "cart", {withCredentials: true});
  // }
  //
  // setCount(count: number) {
  //   this.count = count;
  //   this.count$.next(this.count);
  // }
  //
  // getCartCount(): Observable<{
  //   count: number
  // } | DefaultResponseType> {
  //   return this.http.get<{
  //     count: number
  //   } | DefaultResponseType>(environment.api + "cart/count", {withCredentials: true})
  //     .pipe(tap(data => {
  //       if (!data.hasOwnProperty('error')) {
  //         this.setCount((data as { count: number }).count)
  //       }
  //     }));
  // }
  //
  // updateCart(productId: string, quantity: number): Observable<CartType | DefaultResponseType> {
  //   return this.http.post<CartType | DefaultResponseType>(environment.api + "cart", {
  //     productId, quantity
  //   }, {withCredentials: true})
  //     .pipe(tap(data => {
  //       if (!data.hasOwnProperty('error')) {
  //         let count = 0;
  //         (data as CartType).items.forEach(item => {
  //           count += item.quantity;
  //         });
  //         this.setCount(count)
  //       }
  //     }));
  // }

  private countSubject = new BehaviorSubject<number>(0);
  count$ = this.countSubject.asObservable();

  constructor(private http: HttpClient) {}

  getCart(): Observable<CartType | DefaultResponseType> {
    return this.http.get<CartType | DefaultResponseType>(environment.api + "cart", {withCredentials: true});
  }

  setCount(count: number): void {
    this.countSubject.next(count);
  }

  clearCart(): void {
    this.countSubject.next(0);
  }

  getCartCount(): Observable<{ count: number } | DefaultResponseType> {
    return this.http.get<{ count: number } | DefaultResponseType>(environment.api + "cart/count", {withCredentials: true})
      .pipe(
        tap(data => {
          if (!('error' in data)) {
            this.setCount((data as { count: number }).count);
          }
        })
      );
  }

  updateCart(productId: string, quantity: number): Observable<CartType | DefaultResponseType> {
    return this.http.post<CartType | DefaultResponseType>(environment.api + "cart", {
      productId, quantity
    }, {withCredentials: true})
      .pipe(
        tap(data => {
          if (!('error' in data)) {
            let count = 0;
            (data as CartType).items.forEach(item => {
              count += item.quantity;
            });
            this.setCount(count);
          }
        })
      );
  }
}
