import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {TopBarComponent} from './top-bar/top-bar.component';
import {LoginFormComponent} from './login-form/login-form.component';
import {RouterModule} from '@angular/router';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {DishesComponent} from './dishes/dishes.component';
import {HttpClientModule} from '@angular/common/http';
import {SummaryComponent} from './summary/summary.component';
import {SummaryService} from './summary/summary.service';
import {ListdishesComponent} from './template/listdishes/listdishes.component';
import {DetailsComponent} from './template/listdishes/details/details.component';
import {ListordersComponent} from './template/listorders/listorders.component';
import {OrderComponent} from './template/listorders/order/order.component';
import {AddressDetailsComponent} from './template/listorders/address-details/address-details.component';
import {TemplateComponent} from './template/template.component';
import { AddDishComponent } from './template/listdishes/add-dish/add-dish.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    LoginFormComponent,
    ShoppingCartComponent,
    DishesComponent,
    SummaryComponent,
    ListdishesComponent,
    DetailsComponent,
    ListordersComponent,
    OrderComponent,
    AddressDetailsComponent,
    TemplateComponent,
    AddDishComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    RouterModule.forRoot([
      {
        path: 'login',
        component: LoginFormComponent
      },
      {
        path: 'shopping-cart',
        component: ShoppingCartComponent
      },
      {
        path: 'dish/pizza',
        component: DishesComponent
      },
      {
        path: 'dish/pasta',
        component: DishesComponent
      },
      {
        path: 'dish/drink',
        component: DishesComponent
      }
    ]),
    FormsModule
  ],
  providers: [SummaryService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
