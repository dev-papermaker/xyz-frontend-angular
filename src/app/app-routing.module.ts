import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from './components/product-list/product-list.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ViewProductComponent } from './components/view-product/view-product.component';

const routes: Routes = [
    {
        path: 'product-list', component: ProductListComponent
    },
    {
      path: 'edit-product', component: EditProductComponent
    },
    {
      path: 'view-product', component: ViewProductComponent
    },
    {
      path: '**', redirectTo: 'product-list'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
