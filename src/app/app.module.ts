import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ProductListComponent } from './components/product-list/product-list.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ViewProductComponent } from './components/view-product/view-product.component';


let initData = () => {
  return () => {
    let readProductsData = () => {
        let url = "assets/json/products.json";
        let request = new XMLHttpRequest();
        request.open("get", url);
        request.send(null);
        request.onload = function () {
            if (request.status == 200) {
                let json = JSON.parse(request.responseText);
                localStorage.setItem('products', JSON.stringify(json))
            }
        }
    }
    let readExchangeRateData = () => {
      let url = "assets/json/exchange_rates.json";
      let request = new XMLHttpRequest();
      request.open("get", url);
      request.send(null);
      request.onload = function () {
          if (request.status == 200) {
              let json = JSON.parse(request.responseText);
              localStorage.setItem('exchangeRates', JSON.stringify(json))
          }
      }
    }
    let products:any = localStorage.getItem('products'),
            exchangeRates:any = localStorage.getItem('exchangeRates')
        if (!products) {
            readProductsData()
        }
        if (!exchangeRates) {
          readExchangeRateData()
        }
  }
}

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    EditProductComponent,
    ViewProductComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    {provide:APP_INITIALIZER,useFactory:initData, multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
