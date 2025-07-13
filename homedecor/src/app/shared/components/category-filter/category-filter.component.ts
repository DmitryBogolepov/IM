import {Component, Input, OnInit} from '@angular/core';
import {CategoryWithType} from "../../../../types/category-with-type";
import {ActivatedRoute, Router} from "@angular/router";
import {ActiveParamsType} from "../../../../types/activeParams.type";
import {ActiveParamsUtil} from "../../utils/active-params.util";

@Component({
  selector: 'category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss']
})
export class CategoryFilterComponent implements OnInit {
  @Input() categoryWithTypes?: CategoryWithType;
  @Input() type: string | null = null;
  open = false;
  activeParams: ActiveParamsType = {types: []};
  to: number | null = null;
  from: number | null = null;

  get title(): string {
    if (this.categoryWithTypes) {
      return this.categoryWithTypes.name;
    } else if (this.type) {
      if (this.type === 'height') {
        return 'Высота';
      } else if (this.type === 'diameter') {
        return 'Диаметр';
      }
    }
    return '';
  }

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {


      this.activeParams =ActiveParamsUtil.processParams(params);

      if (this.type) {
        if (this.type === 'height') {
          this.open = !!(this.activeParams.heightFrom || this.activeParams.heightTo);
          if (this.activeParams.heightFrom) {
            this.from = +this.activeParams.heightFrom;
          }
          if (this.activeParams.heightTo) {
            this.to = +this.activeParams.heightTo;
          }
        }
        if (this.type === 'diameter') {
          this.open = !!(this.activeParams.diameterFrom || this.activeParams.diameterTo);
          if (this.activeParams.diameterFrom) {
            this.from = +this.activeParams.diameterFrom;
          }
          if (this.activeParams.diameterTo) {
            this.to = +this.activeParams.diameterTo;
          }
        }
      } else {
        if (params['types']) {
          this.activeParams.types = Array.isArray(params['types']) ? params['types'] : [params['types']];
        }

        if (this.categoryWithTypes && this.categoryWithTypes.types && this.categoryWithTypes.types.length > 0
          && this.categoryWithTypes.types.some(type => this.activeParams.types.find(item => type.url === item))) {
          this.open = true;
        }
      }
    });
  }

  toggle() {
    this.open = !this.open;
  }

  updateFilterParam(url: string, checked: boolean) {
    if (this.activeParams.types && this.activeParams.types.length > 0) {
      const existingTypeInParams = this.activeParams.types.find(item => item === url);
      if (existingTypeInParams && !checked) {
        this.activeParams.types = this.activeParams.types.filter(item => item !== url);
      } else if (!existingTypeInParams && checked) {
        // this.activeParams.types.push(url);
        this.activeParams.types = [...this.activeParams.types, url]
      }
    } else if (checked) {
      this.activeParams.types = [url];
    }

    this.activeParams.page = 1;
    this.router.navigate(['/catalog'], {
      queryParams: this.activeParams
    })
  }

  updateFilterParamFromTo(param: string, value: string) {
    if (param === "heightTo" || param === "heightFrom" || param === "diameterTo" || param === "diameterFrom") {
      if (this.activeParams[param] && !value) {
        delete this.activeParams[param];
      } else {
        this.activeParams[param] = value;
      }
      this.activeParams.page = 1;
      this.router.navigate(['/catalog'], {
        queryParams: this.activeParams
      })

    }
  }

}
