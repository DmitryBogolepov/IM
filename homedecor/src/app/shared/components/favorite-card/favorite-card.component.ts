import {Component, Input, OnInit} from '@angular/core';
import {DefaultResponseType} from "../../../../types/default-response.type";
import {CartType} from "../../../../types/cart.type";
import {FavoriteType} from "../../../../types/favorite.type";
import {CartService} from "../../services/cart.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'favorite-card',
  templateUrl: './favorite-card.component.html',
  styleUrls: ['./favorite-card.component.scss']
})
export class FavoriteCardComponent implements OnInit {
  @Input() product!:FavoriteType;
  @Input() countInCart:number | undefined = 0;
  count:number = 1;

  serverStaticPath = environment.serverStaticPath;
  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    if (this.countInCart && this.countInCart > 1) {
      this.count = this.countInCart;
    }



  }


  addToCart() {
    this.cartService.updateCart(this.product.id, this.count)
      .subscribe((data:CartType | DefaultResponseType)=> {
        if ((data as DefaultResponseType).error !== undefined) {
          throw new Error((data as DefaultResponseType).message)
        }
        this.countInCart = this.count;
      });
  }

  // removeFromCart() {
  //   this.cartService.updateCart(this.product.id, 0)
  //     .subscribe((data:CartType | DefaultResponseType)=> {
  //       if ((data as DefaultResponseType).error !== undefined) {
  //         throw new Error((data as DefaultResponseType).message)
  //       }
  //       this.countInCart = 0;
  //       this.count = 1;
  //     });
  // }

  updateCount(value:number) {
    this.count = value;
    if (this.countInCart) {
      this.cartService.updateCart(this.product.id, this.count)
        .subscribe((data:CartType | DefaultResponseType)=> {
          if ((data as DefaultResponseType).error !== undefined) {
            throw new Error((data as DefaultResponseType).message)
          }
          this.countInCart = this.count;
        });
    }
  }
}
