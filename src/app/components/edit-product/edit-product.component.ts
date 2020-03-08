import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  public products: any;
  public exchangeRates: any;
  public currentProduct: any;
  public otherProducts: any;
  public relatedArr: any;
  public currentBase: any
  constructor(public route: ActivatedRoute,
    public router: Router) { 
    this.products = JSON.parse(localStorage.getItem('products'))
    this.exchangeRates = JSON.parse(localStorage.getItem('exchangeRates'))
    this.currentProduct = {}
    this.otherProducts = []
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

  handleBoxChange(event, id) {
    if (event.target.checked) {
      if (this.relatedArr.indexOf(id) < 0) {
        this.relatedArr.push(id)
      }
    }else {
      this.relatedArr.splice(this.relatedArr.indexOf(id), 1)
    }
  }

  getCurrentProduct(id) {
    this.products.forEach(item => {
      if (item.id == id) {
        this.currentProduct = item
        this.relatedArr = this.currentProduct.relatedProducts
      }else {
        this.otherProducts.push(item)
      }
    })
  }

  handleSave() {
    this.currentProduct.relatedProducts = this.relatedArr
    let arr = JSON.parse(JSON.stringify(this.otherProducts))
    arr.push(this.currentProduct)
    localStorage.setItem('products', JSON.stringify(arr))
    alert('修改成功')
  }

  goBack() {
    let queryParams: NavigationExtras = {
      queryParams: {
        base: this.currentBase
      }
    }
    this.router.navigate(['product-list'], queryParams)
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.currentBase = params.base
      this.switchBase(params.base)
      this.getCurrentProduct(params.id)
    })
  }

}
