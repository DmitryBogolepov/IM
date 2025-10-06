import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {ProductType} from "../../../types/product.type";
import {ActiveParamsType} from "../../../types/activeParams.type";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) {

  }

  getBestProducts(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(environment.api + "products/best");
  }

  getProducts(params: ActiveParamsType): Observable<{ totalCount: number; pages: number; items: ProductType[] }> {
    let httpParams = new HttpParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach(v => httpParams = httpParams.append(key, v));
        } else {
          httpParams = httpParams.set(key, value.toString());
        }
      }
    });
    return this.http.get<{ totalCount: number; pages: number; items: ProductType[] }>(
      environment.api + 'products',
      { params: httpParams }
    );
  }
  searchProducts(query:string): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(environment.api + "products/search?query=" + query);
  }
  getProduct(url:string): Observable<ProductType> {
    return this.http.get<ProductType>(environment.api + "products/" + url);
  }


}
