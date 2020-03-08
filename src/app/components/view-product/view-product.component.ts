import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {
  public products: any;
  public exchangeRates: any;
  public currentProduct: any;
  public relatedProducts: any;
  public base: any;
  constructor(public route: ActivatedRoute, public router: Router) { 
    this.products = JSON.parse(localStorage.getItem('products'))
    this.exchangeRates = JSON.parse(localStorage.getItem('exchangeRates'))
    this.currentProduct = {}
    this.relatedProducts = []
  }

  switchBase(base) {
    for(let i = 0; i < this.products.length; i ++) {
      if (this.products[i].price.base != base) {
        for (let j = 0; j < this.exchangeRates.length; j ++) {
          if (this.products[i].price.base == this.exchangeRates[j].base) {
            this.products[i].price.base = base
            this.products[i].price.amount = Math.floor((this.products[i].price.amount * this.exchangeRates[j].rates[base]) * 100 ) / 100
            break
          }
        }
      }
    }
  }

  getCurrentProduct(id) {
    this.products.forEach(item => {
      if (item.id == id) {
        this.currentProduct = item
      }
    })
    this.products.forEach(value => {
      if ( this.currentProduct.relatedProducts.indexOf(value.id) > -1) {
        this.relatedProducts.push(value)
      }
    })
  }

  handleEdit(item) {
    let queryParams: NavigationExtras = {
      queryParams: {
        id: item.id,
        base: this.base
      }
    }
    this.router.navigate(['edit-product'], queryParams)
  }

  handleView(item) {
    let queryParams: NavigationExtras = {
      queryParams: {
        id: item.id,
        base: this.base
      }
    }
    this.router.navigate(['view-product'], queryParams)
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.base = params.base
      this.switchBase(params.base)
      this.getCurrentProduct(params.id)
    })
  }

}
