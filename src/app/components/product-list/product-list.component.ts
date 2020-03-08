import { Component, OnInit, ViewChild  } from '@angular/core';

import { Router, ActivatedRoute, NavigationEnd, NavigationExtras } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @ViewChild('autoShownModal', { static: false }) autoShownModal: ModalDirective;
  public products:any
  public exchangeRates: any
  public isModalShown: Boolean = false
  public base: any;
  constructor(
    public router: Router,
    public route: ActivatedRoute
    ) {
      this.base = ''
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
    this.products = JSON.parse(localStorage.getItem('products'))
    this.exchangeRates = JSON.parse(localStorage.getItem('exchangeRates'))
    this.route.queryParams.subscribe(params => {
      if (params.base) {
        this.base = params.base
        this.switchBase(params.base)
      }else {
        this.base = 'AUD'
      }
    })
    
    if (!this.products || !this.exchangeRates) {
      this.isModalShown = true
      let timer = setInterval(() => {
        this.products = JSON.parse(localStorage.getItem('products'))
        this.exchangeRates = JSON.parse(localStorage.getItem('exchangeRates'))
        if (this.products && this.exchangeRates) {
          clearInterval(timer)
          timer = null
          this.isModalShown = false
          this.switchBase(this.base)
        }
      }, 1000)
    }else {
      this.switchBase(this.base)
    }
  }
  ngAfterViewInit() {
    
  }
}
