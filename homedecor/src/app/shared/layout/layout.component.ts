import { Component, OnInit } from '@angular/core';
import {CategoryType} from "../../../types/category.type";
import {CategoryService} from "../services/category.service";
import {CategoryWithType} from "../../../types/category-with-type";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  categories:CategoryWithType[] = [];
  constructor(private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategoriesWithTypes().subscribe((categories:CategoryWithType[]) => {
      this.categories = categories.map(item => {
        return Object.assign({typesUrl:item.types.map(item => item.url)},item);
      });
    });
  }

}
