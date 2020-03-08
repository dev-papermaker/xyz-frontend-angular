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

  
}
