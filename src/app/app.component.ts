import { Component } from '@angular/core';

import { Router, NavigationExtras } from '@angular/router';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class AppComponent {
    public title = 'xyz-frontend-angular';
    public currentbase: any = 'AUD';

    switchBase(base) {
      this.currentbase = base
      let queryParams: NavigationExtras = {
        queryParams: {
          base: base
        }
      }
      this.router.navigate(['product-list'], queryParams)
    }

    goToIndex() {
      this.currentbase = 'AUD'
      this.router.navigate(['product-list'])
    }

    constructor(public router: Router) {
    }

    ngOnInit(): void {
    }
}
