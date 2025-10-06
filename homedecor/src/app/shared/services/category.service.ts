import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {CategoryType} from "../../../types/category.type";
import {environment} from "../../../environments/environment";
import {CategoryTypeType} from "../../../types/categorytype.type";
import {CategoryWithType} from "../../../types/category-with-type";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient ) { }

  getCategories(): Observable<CategoryType[]> {
    return this.http.get<CategoryType[]>(environment.api + "categories");
  }

  getCategoriesWithTypes(): Observable<CategoryWithType[]> {
    return this.http.get<CategoryTypeType[]>(environment.api + "types")
    .pipe(
      map((items:CategoryTypeType[]) =>  {
        const array:CategoryWithType[] = [];

        items.forEach((item:CategoryTypeType)=> {

          const foundItem = array.find(arrayItem => arrayItem.url === item.category.url);

          if (foundItem) {
            foundItem.types.push({
              id:item.id,
              name:item.name,
              url:item.url,
            })
          } else {
            array.push( {
              id:item.category.id,
              name:item.category.name,
              url:item.category.url,
              types: [
                {
                  id:item.id,
                  name:item.name,
                  url:item.url,
                }]
            })
          }
        })




        return array;
      })
    );
  }
}
