import {Component, Input, OnInit} from '@angular/core';
import {CategoryWithType} from "../../../../types/category-with-type";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Input() categories:CategoryWithType[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
