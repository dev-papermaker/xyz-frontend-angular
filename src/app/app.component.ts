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

    
    constructor(public router: Router) {
    }

    ngOnInit(): void {
    }
}
