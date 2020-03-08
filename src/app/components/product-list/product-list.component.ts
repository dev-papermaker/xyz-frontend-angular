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


}
